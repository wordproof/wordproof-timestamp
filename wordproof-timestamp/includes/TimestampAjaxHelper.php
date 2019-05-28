<?php

namespace WordProofTimestampFree\includes;



class TimestampAjaxHelper {

  public function __construct()
  {
    add_action('wp_ajax_wordproof_save_meta', array($this, 'saveMeta'));
    add_action('wp_ajax_wordproof_get_hash', array($this, 'getHash'));
  }

  public function saveMeta() {
    check_ajax_referer( 'wordproof', 'security' );

    $postId = intval($_REQUEST['post_id']);
    $args = [];

    TimestampHelper::saveTimestampPostMeta($postId, $args);

    echo json_encode(array(
      'success' => true,
      'data' => array(
        'url' => get_permalink($postId) . '#wordproof'
      ),
    ));
  }

  public function getHash() {
    check_ajax_referer( 'wordproof', 'security' );

    $postId = intval($_REQUEST['post_id']);

    $hash = TimestampHelper::generatePostHash($postId);

    echo json_encode(array(
      'success' => true,
      'data' => array(
        'hash' => $hash
      ),
    ));
    exit;
  }

}
