<?php

namespace WordProofTimestampFree\includes;

class PostMetaHelper {

  public static function savePostMeta($postId, $meta) {
    if (current_user_can('manage_options')) {
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

    // Get old metadata structure (<0.6)
    if (empty($meta)) {
      $wordproof_date = get_post_meta($post->ID, 'wordproof_date', true);

      if (isset($wordproof_date) && !empty($wordproof_date)) {
        $meta = [];
        $meta['wordproof_date'] = $wordproof_date;
        $meta['wordproof_post_date'] = $post->post_date;
        $meta['wordproof_title'] = get_post_meta($post->ID, 'wordproof_title', true);
        $meta['wordproof_content'] = get_post_meta($post->ID, 'wordproof_content', true);
        $meta['wordproof_link'] = get_permalink($post->ID);
        $meta['wordproof_transaction_id'] = get_post_meta($post->ID, 'wordproof_transaction_id', true);
        $meta['wordproof_block_num'] = get_post_meta($post->ID, 'wordproof_block_num', true);
        $meta['wordproof_block_time'] = get_post_meta($post->ID, 'wordproof_block_time', true);
        $meta['wordproof_network'] = get_post_meta($post->ID, 'wordproof_network', true);
        $meta['wordproof_hash'] = "";
      }
    }

    return $meta;
  }
}
