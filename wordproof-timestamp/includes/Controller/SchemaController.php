<?php

namespace WordProofTimestampFree\includes\Controller;

use WordProofTimestampFree\includes\PostMetaHelper;

class SchemaController
{
  /**
   * @param $post
   * @return bool|object|string
   */
  public static function getSchema($post)
  {
    if (is_int($post)) {
      $post = get_post($post);
    }

    $meta = PostMetaHelper::getPostMeta($post);
    $type = (isset($meta->type)) ? $meta->type : '';
    $attributes = (isset($meta->attributes)) ? $meta->attributes : [];

    switch ($type) {
      case WEB_ARTICLE_TIMESTAMP:
        $object = self::generateSchemaForArticle($meta, $attributes);
        break;
      default:
        $object = self::generateSchemaLegacy($post, $meta);
        break;
    }

    if (!$object) {
      return false;
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
        return json_encode($array, JSON_UNESCAPED_SLASHES);
      default:
        return false;
    }
  }

  /**
   * @param $post
   * @param $meta
   * @return object
   */
  private static function generateSchemaLegacy($post, $meta)
  {
    $array = [];
    $array['blockchain'] = $meta->wordproof_network;
    $array['transactionId'] = $meta->wordproof_transaction_id;
    $array['hash'] = $meta->wordproof_hash;
    $array['title'] = $post->post_title;
    $array['content'] = $post->post_content;
    $array['date'] = get_the_modified_date('c', $post);
    $array['url'] = $meta->wordproof_link;
    return json_encode($array, JSON_UNESCAPED_SLASHES);
  }
}