<?php

namespace WordProofTimestampFree\includes;

use WordProofTimestampFree\includes\Controller\HashController;

class PostMetaHelper {

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

  public static function getPopupMeta($post)
  {
    $meta = self::getTimestampPostMeta($post);

    //Add required fields
    $meta['current_post_modified'] = $post->post_modified;
    $meta['hash_raw'] = new HashController($post, true);

    //Prepare fields
    if (isset($meta['wordproof_content'])) {
      $meta['wordproof_content'] = self::preparePostContent($meta['wordproof_content']);
    }

    return $meta;
  }

  private static function getTimestampPostMeta($post) {
    $meta = get_post_meta($post->ID, 'wordproof_timestamp_data', true);

    // Get old metadata structure (<0.6)
    if (empty($meta)) {
      $meta = [];
      $wordproof_date = get_post_meta($post->ID, 'wordproof_date', true);

      if (isset($wordproof_date) && !empty($wordproof_date)) {
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
