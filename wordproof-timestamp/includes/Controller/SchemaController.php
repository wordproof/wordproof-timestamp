<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class SchemaController
{
  /**
   * @param $postId
   * @return bool|object|string
   */
  public static function getSchema($postId)
  {
    $meta = PostMetaHelper::getPostMeta($postId);

    if (!isset($meta->blockchain) || empty($meta->blockchain) || !isset($meta->date) || empty($meta->date))
      return '';

    $type = (isset($meta->type)) ? $meta->type : '';
    $attributes = (isset($meta->attributes)) ? $meta->attributes : [];

    switch ($type) {
      case ARTICLE_TIMESTAMP:
        $object = self::articleSchema($meta, $attributes);
        break;
      case MEDIA_OBJECT_TIMESTAMP:
        $object = self::mediaObjectSchema($meta, $attributes);
        break;
      case 'WebArticleTimestamp':
        $object = self::webArticleSchema($meta, $attributes);
        break;
      default:
        $object = self::legacySchema($meta);
        break;
    }

    if (!$object) {
      return '';
    }

    $schema = '<script type="application/ld+json" class="wordproof-schema">';
    $schema .= $object;
    $schema .= "</script>";
    return $schema;
  }

  /**
   * @param $meta
   * @param $attributes
   * @return object|bool
   * More info: https://github.com/wordproof/timestamp-standard/blob/master/ArticleTimestamp.md
   */
  private static function articleSchema($meta, $attributes)
  {
    switch ($meta->version) {
      default:
        $array = [];
        $array['@context']['@type'] = ARTICLE_TIMESTAMP;
        $array['@context']['@version'] = $meta->version;
        $array['blockchain'] = $meta->blockchain;
        $array['transactionId'] = $meta->transactionId;
        $array['hash'] = $meta->hash;
        $array['title'] = $meta->title;
        $array['content'] = $meta->content;
        $array['date'] = $meta->date;

        foreach ($attributes as $key => $value) {
          $array[$key] = $value;
        }
        return json_encode($array, JSON_UNESCAPED_UNICODE);
    }
  }

  /**
   * @param $meta
   * @param $attributes
   * @return object|bool
   * More info: https://github.com/wordproof/timestamp-standard/blob/master/MediaObjectTimestamp.md
   */
  private static function mediaObjectSchema($meta, $attributes)
  {
    switch ($meta->version) {
      default:
        $array = [];
        $array['@context']['@type'] = MEDIA_OBJECT_TIMESTAMP;
        $array['@context']['@version'] = $meta->version;
        $array['blockchain'] = $meta->blockchain;
        $array['transactionId'] = $meta->transactionId;
        $array['hash'] = $meta->hash;
        $array['title'] = $meta->title;
        $array['contentHash'] = $meta->contentHash;
        $array['contentUrl'] = $meta->contentUrl;
        $array['encodingFormat'] = $meta->encodingFormat;
        $array['date'] = $meta->date;

        foreach ($attributes as $key => $value) {
          $array[$key] = $value;
        }
        return json_encode($array, JSON_UNESCAPED_UNICODE);
    }
  }

  /**
   * @param $meta
   * @param $attributes
   * @return object|bool
   * More info: https://github.com/wordproof/timestamp-standard/blob/master/WebArticleTimestamp.md
   */
  private static function webArticleSchema($meta, $attributes)
  {
    switch ($meta->version) {
      default:
        $array = [];
        $array['@context']['@type'] = 'WebArticleTimestamp';
        $array['@context']['@version'] = $meta->version;
        $array['blockchain'] = $meta->blockchain;
        $array['transactionId'] = $meta->transactionId;
        $array['hash'] = $meta->hash;
        $array['title'] = $meta->title;
        $array['content'] = $meta->content;
        $array['date'] = $meta->date;

        foreach ($attributes as $key => $value) {
          $array[$key] = $value;
        }
        return json_encode($array, JSON_UNESCAPED_UNICODE);
    }
  }

  /**
   * @param $meta
   * @return object
   */
  private static function legacySchema($meta)
  {
    $array = [];
    $array['blockchain'] = $meta->blockchain;
    $array['transactionId'] = $meta->transactionId;
    $array['hash'] = $meta->hash;
    $array['title'] = $meta->title;
    $array['content'] = $meta->content;
    $array['date'] = get_the_modified_date('c', $meta->date);
    $array['url'] = $meta->url;
    return json_encode($array);
  }
}
