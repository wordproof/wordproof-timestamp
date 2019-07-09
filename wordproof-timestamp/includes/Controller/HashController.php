<?php

namespace WordProofTimestampFree\includes\Controller;

use WordProofTimestampFree\includes\PostMetaHelper;

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

    list($type, $version) = PostMetaHelper::getPostMetaValues($post, ['type', 'version']);
    switch ($type) {
      case WEB_ARTICLE_TIMESTAMP:
        $object = self::generateJsonForWebArticleTimestamp($post, $version);
        break;
      default:
        $object = self::generateLegacyTimestamp($post);
        break;
    }

    if (!$object) {
      return false;
    }

    if ($raw) {
      return $object;
    }

    return hash('sha256', $object);
  }

  /**
   * @param $post
   * @param $version
   * @return object|bool
   * More info: https://github.com/wordproof/timestamp-standard/blob/master/WebArticleTimestamp.md
   */
  private static function generateJsonForWebArticleTimestamp($post, $version)
  {
    switch ($version) {
      case 0.1:
        $array = [];
        $array['type'] = WEB_ARTICLE_TIMESTAMP;
        $array['version'] = $version;
        $array['title'] = $post->post_title;
        $array['content'] = $post->post_content;
        $array['date'] = get_the_modified_date('c', $post);
        return json_encode($array);
      default:
        return false;
    }
  }

  /**
   * @param $post
   * @return object
   */
  private static function generateLegacyTimestamp($post)
  {
    $array = [];
    $array['title'] = $post->post_title;
    $array['content'] = $post->post_content;
    $array['date'] = get_the_modified_date('c', $post);
    return json_encode($array);
  }
}