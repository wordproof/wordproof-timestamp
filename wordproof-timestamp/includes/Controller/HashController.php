<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\PostHelper;

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
    $object = json_encode($fields, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

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
   * @param $post
   * @return array|null
   */
  private static function getProperties($post)
  {
    switch (self::getType($post)) {
      case ARTICLE_TIMESTAMP:
        $array = [];
        $array['type'] = ARTICLE_TIMESTAMP;
        $array['version'] = CURRENT_TIMESTAMP_STANDARD_VERSION;
        $array['title'] = $post->post_title;
        $array['content'] = PostHelper::getContent($post);
        $array['date'] = get_the_modified_date('c', $post);
        return $array;
      case MEDIA_OBJECT_TIMESTAMP:
        $array = [];
        $array['type'] = MEDIA_OBJECT_TIMESTAMP;
        $array['version'] = CURRENT_TIMESTAMP_STANDARD_VERSION;
        $array['title'] = $post->post_title;
        $array['contentHash'] = hash_file('sha256', get_attached_file($post->ID));
        $array['contentUrl'] = $post->guid;
        $array['encodingFormat'] = $post->post_mime_type;
        $array['date'] = get_the_modified_date('c', $post);
        return $array;
      default:
        return null;
    }
  }

  /**
   * @param $post
   * @return array|mixed|void|null
   */
  private static function getAttributes($post)
  {
    switch (self::getType($post)) {
      case ARTICLE_TIMESTAMP:
        $array = []; //TODO: Get selected attributes
        $array['url'] = DomainHelper::getPermalink($post->ID);
        $array = apply_filters('wordproof_hash_attributes', $array);
        return $array;
      case MEDIA_OBJECT_TIMESTAMP:
        $array = [];
        return $array;
      default:
        return null;
    }
  }

  public static function getType($post)
  {
    $postType = get_post_type($post);
    switch ($postType) {
      case 'page':
      case 'post':
        return ARTICLE_TIMESTAMP;
      case 'attachment':
        return MEDIA_OBJECT_TIMESTAMP;
      default:
        return null;
    }
  }
}
