<?php

namespace WordProofTimestamp\includes\Controller;

class HashController
{

  /**
   * Create the hash for new posts
   * @param $post
   * @param bool $raw
   * @return bool|object|string
   */
  public static function getHash($post, $raw = false)
  {
    if (is_int($post)) {
      $post = get_post($post);
    }

    $fields = self::getFields($post);
    $fields = array_merge($fields['properties'], $fields['attributes']);
    $object = json_encode($fields, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    if ($raw) {
      return $object;
    }

    return hash('sha256', $object);
  }

  public static function getFields($post)
  {
    if (is_int($post)) {
      $post = get_post($post);
    }

    $properties = self::getProperties($post);
    $attributes = self::getAttributes($post);
    return ['properties' => $properties, 'attributes' => $attributes];
  }

  /**
   * WEB_ARTICLE_TIMESTAMP properties, to be expanded in the future
   * @param $post
   * @return array
   */
  private static function getProperties($post)
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
  private static function getAttributes($post)
  {
    $array = [];
    //TODO: Get selected attributes
    $array['url'] = get_permalink($post);
    $array = apply_filters('wordproof_hash_attributes', $array);
    return $array;
  }
}