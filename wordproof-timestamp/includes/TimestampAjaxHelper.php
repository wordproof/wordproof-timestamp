<?php

namespace WordProofTimestamp\includes;

use WordProofTimestamp\includes\Controller\HashController;

class TimestampAjaxHelper
{
  public function __construct()
  {
    add_action('wp_ajax_wordproof_save_meta', array($this, 'saveMeta'));
    add_action('wp_ajax_wordproof_get_hash_by_id', array($this, 'getHashById'));
    add_action('wp_ajax_wordproof_get_raw_by_id', array($this, 'getRawById'));
    add_action('wp_ajax_wordproof_save_timestamp', array($this, 'saveTimestamp'));
  }

  public function saveTimestamp() {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $transactionId = sanitize_text_field($_REQUEST['transaction_id']);

    $metaFields = HashController::getFieldsArticle($postId);

    $meta = $metaFields[0];
    $meta['attributes'] = $metaFields[1];

    $meta['blockchain'] = get_option('wordproof_network');
    $meta['transactionId'] = $transactionId;
    $meta['hash'] = HashController::getHash($postId);

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
}
