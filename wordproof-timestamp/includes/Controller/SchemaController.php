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
      case WEB_ARTICLE_TIMESTAMP:
        $object = self::generateSchemaForArticle($meta, $attributes);
        break;
      default:
        $object = self::generateSchemaLegacy($meta);
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
   * More info: https://github.com/wordproof/timestamp-standard/blob/master/WebArticleTimestamp.md
   */
  private static function generateSchemaForArticle($meta, $attributes)
  {
    switch ($meta->version) {
      case 0.1:
        $array = [];
        $array['@context']['@type'] = WEB_ARTICLE_TIMESTAMP;
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
        return json_encode($array, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

      case '0.1.1':
        $array = [];
        $array['@context']['@type'] = WEB_ARTICLE_TIMESTAMP;
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
        return json_encode($array, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
      default:
        return false;
    }
  }

  /**
   * @param $meta
   * @return object
   */
  private static function generateSchemaLegacy($meta)
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