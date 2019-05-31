<?php

namespace WordProofTimestampFree\includes;

class TimestampHelper {

  private static $postMetaFields = ['wordproof_date', 'wordproof_post_date', 'wordproof_title', 'wordproof_content', 'wordproof_link', 'wordproof_transaction_id', 'wordproof_block_num', 'wordproof_block_time', 'wordproof_network', 'wordproof_hash'];

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
    $meta = [];
    $meta['wordproof_date'] = (isset($args['wordproof_date'])) ? sanitize_text_field($args['wordproof_date']) : '';
    $meta['wordproof_post_date'] = (isset($args['wordproof_post_date'])) ? sanitize_text_field($args['wordproof_post_date']) : '';
    $meta['wordproof_title'] = (isset($args['wordproof_title'])) ? sanitize_text_field($args['wordproof_title']) : '';
    $meta['wordproof_content'] = (isset($args['wordproof_content'])) ? sanitize_text_field(htmlentities($args['wordproof_content'])) : '';
    $meta['wordproof_link'] = (isset($args['wordproof_link'])) ? sanitize_text_field(($args['wordproof_link'])) : '';
    $meta['wordproof_transaction_id'] = (isset($args['wordproof_transaction_id'])) ? sanitize_text_field($args['wordproof_transaction_id']) : '';
    $meta['wordproof_block_num'] = (isset($args['wordproof_block_num'])) ? sanitize_text_field($args['wordproof_block_num']) : '';
    $meta['wordproof_block_time'] = (isset($args['wordproof_block_time'])) ? sanitize_text_field($args['wordproof_block_time']) : '';
    $meta['wordproof_network'] = (isset($args['wordproof_network'])) ? sanitize_text_field($args['wordproof_network']) : '';
    $meta['wordproof_hash'] = (isset($args['wordproof_hash'])) ? sanitize_text_field($args['wordproof_hash']) : '';
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

      if (isset($postMeta['wordproof_date'])) {
        $meta['wordproof_date'] = isset($postMeta['wordproof_date']) ? $postMeta['wordproof_date'] : '';
        $meta['wordproof_post_date'] = $post->post_date;
        $meta['wordproof_title'] = isset($postMeta['wordproof_title']) ? $postMeta['wordproof_title'] : '';
        $meta['wordproof_content'] = isset($postMeta['wordproof_content']) ? self::preparePostContent($postMeta['wordproof_content']) : '';
        $meta['wordproof_link'] = get_permalink($postId);
        $meta['wordproof_transaction_id'] = isset($postMeta['wordproof_transaction_id']) ? $postMeta['wordproof_transaction_id'] : '';
        $meta['wordproof_block_num'] = isset($postMeta['wordproof_block_num']) ? $postMeta['wordproof_block_num'] : '';
        $meta['wordproof_block_time'] = isset($postMeta['wordproof_block_time']) ? $postMeta['wordproof_block_time'] : '';
        $meta['wordproof_network'] = isset($postMeta['wordproof_network']) ? $postMeta['wordproof_network'] : '';
        $meta['wordproof_hash'] = "";
      }
    } else {
      $meta['wordproof_content'] = self::preparePostContent($meta['wordproof_content']);
    }

    return $meta;
  }

  private static function generatePostHash($title, $content) {
    $encodedContent = json_encode(["title" => $title, "content" => $content]);
    $hash = hash('sha256', $encodedContent);
    return $hash;
  }

  private static function preparePostContent($content) {
    //Decode html entities
    $content = html_entity_decode($content);
    //Replace </p> with our var
    $content = str_replace("</p>", "WORDPROOF_CONTENT_REPLACEMENT_MARKER", $content);
    //Remove HTML entities
    $content = preg_replace("/(<([^>]+)>)/i", "", $content);
    //Replace </p> with our var
    $content = str_replace("WORDPROOF_CONTENT_REPLACEMENT_MARKER", "\n\n", $content);
    
    return $content;
  }
}
