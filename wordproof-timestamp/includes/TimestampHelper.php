<?php

namespace WordProofTimestampFree\includes;

class TimestampHelper {

  private static $postMetaFields = ['wordproof_date', 'wordproof_post_date', 'wordproof_title', 'wordproof_content', 'wordproof_transaction_id', 'wordproof_block_num', 'wordproof_block_time', 'wordproof_network', 'wordproof_hash'];

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

  public static function buildPostMetaArray($args) {
    $meta = self::$postMetaFields;
    $meta['wordproof_date'] = (isset($args['date'])) ? sanitize_text_field($args['date']) : '';
    $meta['wordproof_post_date'] = (isset($args['post_date'])) ? sanitize_text_field($args['post_date']) : '';
    $meta['wordproof_title'] = (isset($args['title'])) ? sanitize_title($args['title']) : '';
    $meta['wordproof_content'] = (isset($args['content'])) ? sanitize_text_field(htmlentities($args['content'])) : ''; //TODO: add linebreaks
    $meta['wordproof_transaction_id'] = (isset($args['transactionId'])) ? sanitize_text_field($args['transactionId']) : '';
    $meta['wordproof_block_num'] = (isset($args['blockNum'])) ? sanitize_text_field($args['blockNum']) : '';
    $meta['wordproof_block_time'] = (isset($args['blockTime'])) ? sanitize_text_field($args['blockTime']) : '';
    $meta['wordproof_network'] = (isset($args['network'])) ? sanitize_text_field($args['network']) : '';
    $meta['wordproof_hash'] = (isset($args['hash'])) ? sanitize_text_field($args['hash']) : '';
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
      $post = get_post($postId);
      $postMeta = get_post_meta($postId);
      $meta['wordproof_date'] = $postMeta['wordproof_date'];
      $meta['wordproof_post_date'] = $post->post_date;
      $meta['wordproof_title'] = $postMeta['wordproof_title'];
      $meta['wordproof_content'] = $postMeta['wordproof_content'];
      $meta['wordproof_transaction_id'] = $postMeta['wordproof_transaction_id'];
      $meta['wordproof_block_num'] = $postMeta['wordproof_block_num'];
      $meta['wordproof_block_time'] = $postMeta['wordproof_block_time'];
      $meta['wordproof_network'] = $postMeta['wordproof_network'];
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
