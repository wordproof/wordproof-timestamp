<?php

namespace WordProofTimestampFree\includes;

class TimestampHelper {

  private static $postMetaFields = ['wordproof_date', 'wordproof_title', 'wordproof_content', 'wordproof_transaction_id', 'wordproof_block_num', 'wordproof_block_time', 'wordproof_network'];

  /**
   * Function static if callable by premium
   */
  public function __construct()
  {
  }

  private static function generatePostHash($postId) {
    $post = get_post($postId);
    $title = $post->post_title;
    $content = $post->post_content;
    $encodedContent = json_encode(["title" => $title, "content" => $content]);
    $hash = hash('sha256', $encodedContent);
  }

  private static function buildPostMetaArray($date, $title, $content, $transactionId, $blockNum, $blockTime, $hash) {
    $meta = self::$postMetaFields;
    $meta['wordproof_date'] = sanitize_text_field($date);
    $meta['wordproof_title'] = sanitize_title($title);
    $meta['wordproof_content'] = sanitize_text_field(htmlentities($content));
    $meta['wordproof_transaction_id'] = sanitize_text_field($transactionId);
    $meta['wordproof_block_num'] = sanitize_text_field($blockNum);
    $meta['wordproof_block_time'] = sanitize_text_field($blockTime);
    $meta['wordproof_hash'] = sanitize_text_field($hash);
    return $meta;
  }

  public static function saveTimestampPostMeta($postId, $args) {
//    $meta = buildPostMetaArray();
    $meta = [];
    do_action('wordproof_before_saving_timestamp_meta_data', $postId, $meta);

    update_post_meta($postId, 'wordproof_timestamp_data', $meta);

    do_action('wordproof_after_saving_timestamp_meta_data', $postId);
  }

  public static function retrieveTimestampPostMeta($postId) {
    $meta = get_post_meta($postId, 'wordproof_timestamp_data', true);
    return $meta;
  }

}
