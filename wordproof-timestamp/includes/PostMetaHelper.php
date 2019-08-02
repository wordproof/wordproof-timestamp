<?php

namespace WordProofTimestamp\includes;

class PostMetaHelper {

  public static function savePostMeta($postId, $meta, $remote = false) {
    if (current_user_can('manage_options') || $remote) {
      do_action('wordproof_before_saving_timestamp_meta_data', $postId);
      $result = update_post_meta($postId, 'wordproof_timestamp_data', $meta);
      do_action('wordproof_after_saving_timestamp_meta_data', $postId);
      return $result;
    }
    return false;
  }

  /**
   * @param $post
   * @param array $keys
   * @return object
   */
  public static function getPostMeta($post, $keys = []) {

    if (is_int($post)) {
      $post = get_post($post);
    }

    $meta = self::getTimestampPostMeta($post);

    if (!empty($keys)) {
      $values = [];
      foreach ($keys as $key) {
        $values[$key] = (isset($meta[$key])) ? $meta[$key] : '';
      }
      return (object) $values;
    }

    return (object) $meta;
  }

  /**
   * @param $post
   * @return array
   */
  private static function getTimestampPostMeta($post) {
    $meta = get_post_meta($post->ID, 'wordproof_timestamp_data', true);

    //Remap old meta
    if (isset($meta['wordproof_date'])) {
      $meta['blockchain'] = ($meta['wordproof_network']) ? $meta['wordproof_network'] : '';
      $meta['transactionId'] = ($meta['wordproof_transaction_id']) ? $meta['wordproof_transaction_id'] : '';
      $meta['hash'] = ($meta['wordproof_hash']) ? $meta['wordproof_hash'] : '';
      $meta['title'] = ($meta['wordproof_title']) ? $meta['wordproof_title'] : '';
      $meta['content'] = ($meta['wordproof_content']) ? $meta['wordproof_content'] : '';
      $meta['date'] = ($meta['wordproof_date']) ? date('c', strtotime($meta['wordproof_date'])) : '';
      $meta['attributes'] = [];
      $meta['attributes']['url'] = ($meta['wordproof_link']) ? $meta['wordproof_date'] : '';
    }

    // Get old metadata structure (<0.6)
    if (empty($meta)) {
      $wordproof_date = get_post_meta($post->ID, 'wordproof_date', true);

      if (isset($wordproof_date) && !empty($wordproof_date)) {
        $meta = [];
        $meta['date'] = date('c', strtotime($wordproof_date));
        $meta['title'] = get_post_meta($post->ID, 'wordproof_title', true);
        $meta['content'] = get_post_meta($post->ID, 'wordproof_content', true);
        $meta['attributes']['url'] = get_permalink($post->ID);
        $meta['transactionId'] = get_post_meta($post->ID, 'wordproof_transaction_id', true);
        $meta['blockchain'] = get_post_meta($post->ID, 'wordproof_network', true);
        $meta['hash'] = "";
      }
    }

    return (empty($meta)) ? [] : $meta;
  }
}
