<?php

namespace WordProofTimestampFree\includes;

use WordProofTimestampFree\includes\Controller\HashController;

class TimestampAjaxHelper
{
  public function __construct()
  {
    add_action('wp_ajax_wordproof_save_meta', array($this, 'saveMeta'));
    add_action('wp_ajax_wordproof_get_hash_by_id', array($this, 'getHashById'));
    add_action('wp_ajax_wordproof_get_raw_by_id', array($this, 'getRawById'));
    add_action('wp_ajax_wordproof_get_post_by_id', array($this, 'getPostById'));
  }

  public function saveMeta()
  {
    check_ajax_referer('wordproof', 'security');

    $postId = intval($_REQUEST['post_id']);
    $args = [
      'wordproof_date' => !empty($_REQUEST['date']) ? $_REQUEST['date'] : '',
      'wordproof_post_date' => !empty($_REQUEST['post_date']) ? $_REQUEST['post_date'] : '',
      'wordproof_title' => !empty($_REQUEST['title']) ? $_REQUEST['title'] : '',
      'wordproof_content' => !empty($_REQUEST['content']) ? $_REQUEST['content'] : '',
      'wordproof_link' => !empty($_REQUEST['link']) ? $_REQUEST['link'] : '',
      'wordproof_transaction_id' => !empty($_REQUEST['transaction_id']) ? $_REQUEST['transaction_id'] : '',
      'wordproof_block_num' => !empty($_REQUEST['block_num']) ? $_REQUEST['block_num'] : '',
      'wordproof_block_time' => !empty($_REQUEST['block_time']) ? $_REQUEST['block_time'] : '',
      'wordproof_network' => !empty($_REQUEST['network']) ? $_REQUEST['network'] : '',
      'wordproof_hash' => !empty($_REQUEST['hash']) ? $_REQUEST['hash'] : '',
      'type' => WEB_ARTICLE_TIMESTAMP,
      'version' => 0.1,
    ];

    $meta = PostMetaHelper::buildPostMetaArray($args);

    PostMetaHelper::savePostMeta($postId, $meta);

    echo json_encode(array(
      'success' => true,
      'data' => array(
        'url' => get_permalink($postId) . '#wordproof'
      ),
    ));
    exit;
  }

  public function getHashById()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $hash = HashController::getHash($postId, false);
    echo json_encode($hash);
    exit;
  }

  public function getRawById()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $json = HashController::getHash($postId, true);
    echo $json;
    exit;
  }

  public function getPostById()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);

    if (current_user_can('manage_options') && !empty($postId)) {
      $post = get_post($postId);

      if (!empty($post)) {
        $post = (array)$post;
        $post['link'] = get_permalink($postId);
        $post = (object)$post;
      }

      echo json_encode($post);
      exit;
    }
  }
}
