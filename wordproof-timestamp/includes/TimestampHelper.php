<?php

namespace WordProofTimestampFree\includes;

class TimestampHelper {

  private static $postMetaFields = ['wordproof_date', 'wordproof_title', 'wordproof_content', 'wordproof_transaction_id', 'wordproof_block_num', 'wordproof_block_time', 'wordproof_network'];

  public function __construct()
  {
  }

  public static function generatePostHashById($postId) {
    $post = get_post($postId);
    $title = $post->post_title;
    $content = $post->post_content;
    $hash = self::generatePostHash($title, $content);
    return $hash;
  }

  public static function buildPostMetaArray($date, $title, $content, $transactionId, $blockNum, $blockTime, $network, $hash) {
    $meta = self::$postMetaFields;
    $meta['wordproof_date'] = sanitize_text_field($date);
    $meta['wordproof_title'] = sanitize_title($title);
    $meta['wordproof_content'] = sanitize_text_field(htmlentities($content));
    $meta['wordproof_transaction_id'] = sanitize_text_field($transactionId);
    $meta['wordproof_block_num'] = sanitize_text_field($blockNum);
    $meta['wordproof_block_time'] = sanitize_text_field($blockTime);
    $meta['wordproof_network'] = sanitize_text_field($network);
    $meta['wordproof_hash'] = sanitize_text_field($hash);
    return $meta;
  }

  public static function saveTimestampPostMeta($postId, $meta) {
    if (current_user_can('manage_options')) {
      do_action('wordproof_before_saving_timestamp_meta_data', $postId);
      $result = update_post_meta($postId, 'wordproof_timestamp_data', $meta);
      do_action('wordproof_after_saving_timestamp_meta_data', $postId);
      return $result;
    }
    return false;
  }

  public static function getTimestampPostMeta($postId) {
    $meta = get_post_meta($postId, 'wordproof_timestamp_data', true);

    // Get old metadata structure (<0.6)    
    if (empty($meta)) {
      $meta = [];
      $postMeta = get_post_meta($postId);
      $meta['wordproof_date'] = $postMeta['wordproof_date'];
      $meta['wordproof_title'] = $postMeta['wordproof_title'];
      $meta['wordproof_content'] = $postMeta['wordproof_content'];
      $meta['wordproof_transaction_id'] = $postMeta['wordproof_transaction_id'];
      $meta['wordproof_block_num'] = $postMeta['wordproof_block_num'];
      $meta['wordproof_block_time'] = $postMeta['wordproof_block_time'];
      $meta['wordproof_hash'] = "";
    }
    return $meta;
  }

  private static function generatePostHash($title, $content) {
    $encodedContent = json_encode(["title" => $title, "content" => $content]);
    $hash = hash('sha256', $encodedContent);
    return $hash;
  }
}
