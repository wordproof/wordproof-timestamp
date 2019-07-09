<?php

namespace WordProofTimestampFree\includes\Controller;

class HashController
{
  /**
   * HashController constructor.
   * @param int|\WP_Post $post
   * @param bool $getRaw
   * @param string $type
   * @param string $version
   */
  public function __construct($post, $getRaw = false)
  {
    if (is_int($post)) {
      $post = get_post($post);
    }

    $standard = $this->getTypeAndVersion($post);
    switch ($standard['type']) {
      case WEB_ARTICLE_TIMESTAMP:
        $object = $this->generateJsonForWebArticleTimestamp($post, $standard['version']);
        break;
      default:
        $object = $this->generateLegacyTimestamp($post);
        break;
    }

    if ($getRaw) {
      return $object;
    }

    return hash('sha256', $object);
  }

  /**
   * @param $post
   * @param $version
   * @return object
   * TODO: Implement attributes
   * More info: https://github.com/wordproof/timestamp-standard/blob/master/WebArticleTimestamp.md
   */
  private function generateJsonForWebArticleTimestamp($post, $version)
  {
    switch ($version) {
      default:
        $object = [];
        $object['type'] = WEB_ARTICLE_TIMESTAMP;
        $object['version'] = $version;
        $object['title'] = $post->post_title;
        $object['content'] = $post->post_content;
        $object['date'] = get_the_modified_date('c', $post);
        return json_encode($object);
    }
  }

  /**
   * @param $post
   * @return object
   */
  private function generateLegacyTimestamp($post)
  {
    $object = [];
    $object['title'] = $post->post_title;
    $object['content'] = $post->post_content;
    $object['date'] = get_the_modified_date('c', $post);
    return json_encode($object);
  }

  private function getTypeAndVersion($post) {
    $meta = get_post_meta($post->ID, 'wordproof_timestamp_data', true);
    if (isset($meta['wordproof_type']) && isset($meta['wordproof_version'])) {
      return ['type' => $meta['wordproof_type'], 'version' => $meta['wordproof_version']];
    } else {
      return ['type' => '', 'version' => ''];
    }
  }
}