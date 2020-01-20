<?php

namespace WordProofTimestamp\includes;

class PostMetaHelper {

  public static function savePostMeta($postId, $meta, $remote = false) {
    if (current_user_can('manage_options') || $remote) {
      do_action('wordproof_before_saving_timestamp_meta_data', $postId);
      $meta['pluginVersion'] = WORDPROOF_VERSION;
      $result = update_post_meta($postId, 'wordproof_timestamp_data', $meta);
      update_post_meta($postId, 'wordproof_last_timestamped_on', time());
      do_action('wordproof_after_saving_timestamp_meta_data', $postId);
      return $result;
    }
    return false;
  }

  /**
   * @param $postId
   * @param array $keys
   * @return object|boolean
   */
  public static function getPostMeta($postId, $keys = []) {

    if (!is_int($postId))
      return false;

    $meta = self::getTimestampPostMeta($postId);

    if (!empty($keys)) {
      $values = [];
      foreach ($keys as $key) {
        $values[$key] = (isset($meta[$key])) ? $meta[$key] : '';
      }
      $values['timestampedOn'] = self::getLastTimestampedOn($postId);
      return (object) $values;
    }

    $meta['timestampedOn'] = self::getLastTimestampedOn($postId);

    return (object) $meta;
  }

  public static function getPostData($post) {

    if (is_int($post))
      $post = get_post($post);

    return [
      'id' => $post->ID,
      'date_modified' => get_the_modified_date('c', $post->ID),
      'status' => $post->post_status,
      'type' => $post->post_type,
      'permalink' => get_permalink($post),
    ];
  }

  /**
   * @param $postId
   * @return array
   */
  private static function getTimestampPostMeta($postId) {
    $meta = get_post_meta($postId, 'wordproof_timestamp_data', true);

    //Remap old meta
    if (isset($meta['wordproof_date'])) {
      $meta['pluginVersion'] = ($meta['pluginVersion']) ? $meta['pluginVersion'] : '';
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
      $wordproof_date = get_post_meta($postId, 'wordproof_date', true);

      if (isset($wordproof_date) && !empty($wordproof_date)) {
        $meta = [];
        $meta['pluginVersion'] = '';
        $meta['blockchain'] = get_post_meta($postId, 'wordproof_network', true);
        $meta['hash'] = "";
        $meta['title'] = get_post_meta($$postId, 'wordproof_title', true);
        $meta['content'] = get_post_meta($postId, 'wordproof_content', true);
        $meta['date'] = date('c', strtotime($wordproof_date));
        $meta['attributes'] = [];
        $meta['attributes']['url'] = DomainHelper::getPermalink($postId);
        $meta['transactionId'] = get_post_meta($postId, 'wordproof_transaction_id', true);
      }
    }

    return (empty($meta)) ? [] : $meta;
  }

  private static function getLastTimestampedOn($postId)
  {
    return get_post_meta($postId, 'wordproof_last_timestamped_on', true);
  }
}
