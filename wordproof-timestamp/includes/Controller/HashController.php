<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class HashController
{

  /**
   * @param $post
   * @param bool $raw
   * @return bool|object|string
   */
  public static function getHash($post, $raw = false)
  {
    if (is_int($post)) {
      $post = get_post($post);
    }

    $type = false;
    $meta = (array) PostMetaHelper::getPostMeta($post);
    if (!empty($meta)) {
      if (isset($meta['type'])) {
        $type = $meta['type'];
      }
    } else {
      $type = WEB_ARTICLE_TIMESTAMP;
    }

    switch ($type) {
      case WEB_ARTICLE_TIMESTAMP:
        $fields = self::getFieldsArticle($post);
        $fields = array_merge($fields[0], $fields[1]);
        $object = json_encode($fields, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        break;
      default:
        $array = self::getFieldsLegacy($post);
        $object = json_encode($array);
        break;
    }

    if (!$object || $raw) {
      return $object;
    }

    return hash('sha256', $object);
  }

  /**
   * @param $post
   * @return array
   */
  private static function getFieldsLegacy($post)
  {
    $array = [];
    $array['title'] = $post->post_title;
    $array['content'] = $post->post_content;
    $array['date'] = get_the_modified_date('c', $post);
    return $array;
  }

  public static function getFieldsArticle($post)
  {
    if (is_int($post)) {
      $post = get_post($post);
    }

    $properties = self::getPropertiesArticle($post);
    $attributes = self::getAttributesArticle($post);
    return [$properties, $attributes];
  }

  /**
   * WEB_ARTICLE_TIMESTAMP properties, to be expanded in the future
   * @param $post
   * @return array
   */
  private static function getPropertiesArticle($post)
  {
    $array = [];
    $array['type'] = WEB_ARTICLE_TIMESTAMP;
    $array['version'] = CURRENT_WEB_ARTICLE_TIMESTAMP_VERSION;
    $array['title'] = $post->post_title;
    $array['content'] = $post->post_content;
    $array['date'] = get_the_modified_date('c', $post);
    return $array;
  }

  /**
   * WEB_ARTICLE_TIMESTAMP attributes, to be expanded in the future
   * @param $post
   * @return array
   */
  private static function getAttributesArticle($post)
  {
    $array = [];
    //TODO: Get selected attributes
    $array['url'] = get_permalink($post);
    $array = apply_filters('wordproof_hash_attributes', $array);
    return $array;
  }
}