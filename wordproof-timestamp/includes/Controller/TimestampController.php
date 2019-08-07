<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class TimestampController
{
  public function __construct()
  {
    add_action('wp_ajax_wordproof_get_hash_by_id', array($this, 'getHashById'));
    add_action('wp_ajax_wordproof_get_raw_by_id', array($this, 'getRawById'));
    add_action('wp_ajax_wordproof_save_timestamp', array($this, 'saveTimestampAjax'));
  }

  public static function saveTimestamp($postId, $chain, $transactionId, $remote = false, $migration = false) {

    $metaFields = HashController::getFields($postId);

    $meta = $metaFields['properties'];
    $meta['attributes'] = $metaFields['attributes'];

    //TODO: Remove after migrations are done
    if ($migration) {
      /**
       * Temporary solution to fix problems with floats in json_encode
       */
      if (version_compare(phpversion(), '7.1', '>=')) {
        ini_set( 'serialize_precision', -1 );
      }

      $meta['version'] = 0.1;
    }

    $meta['blockchain'] = $chain;
    $meta['transactionId'] = $transactionId;
    $meta['hash'] = HashController::getHash($postId, $migration);

    PostMetaHelper::savePostMeta($postId, $meta, $remote);

    echo json_encode(array(
      'success' => true,
      'data' => array(
        'url' => get_permalink($postId) . '#wordproof'
      ),
    ));
    exit;
  }


  public function saveTimestampAjax() {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $chain = get_option('wordproof_network');
    $transactionId = sanitize_text_field($_REQUEST['transaction_id']);

    self::saveTimestamp($postId, $chain, $transactionId);

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
