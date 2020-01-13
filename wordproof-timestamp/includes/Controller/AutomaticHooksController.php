<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\Page\AutoStampPage;
use WordProofTimestamp\includes\PostMetaHelper;

class AutomaticHooksController
{

  protected $responses = [
    'unauthenticated' => 'unauthenticated',
    'origin_not_allowed' => 'origin_not_allowed',
    'valid_endpoint' => 'valid_endpoint',
    'post_modified' => 'post_modified',
    'post_not_modified' => 'post_not_modified',
  ];

  public function __construct()
  {
    add_action('admin_post_nopriv_wordproof_test_callback', [$this, 'processCallback']);
    add_action('admin_post_nopriv_wordproof_callback', [$this, 'processCallback']);
    add_action('admin_post_nopriv_wordproof_wsfy_edit_post', [$this, 'processCallback']);

    add_action(WORDPROOF_WSFY_CRON_HOOK, [AutomaticHelper::class, 'createPost']);

    add_action('wp_ajax_wordproof_get_articles', [$this, 'getArticles']);
    add_action('wp_ajax_nopriv_wordproof_get_articles', [$this, 'getArticles']);

    if (OptionsHelper::isWSFYActive()) {
      $this->setUpdateHooks();

      if (is_admin())
        new AutoStampPage();
    }
  }

  public function setUpdateHooks() {
    $options = OptionsHelper::getWSFY(['site_token']);
    if (isset($options->allowed_post_types)) {
      foreach ($options->allowed_post_types as $postType) {
        add_action('publish_' . $postType, [$this, 'setCron']);
      }
    } else {
      add_action('publish_page', [$this, 'setCron']);
      add_action('publish_post', [$this, 'setCron']);
    }
  }

  function getArticles()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $controller = new AutomaticHelper($postId);
    $result = $controller->getArticles();
    echo json_encode($result); //TODO: maybe add parameters
    die();
  }

  public function setCron($postId)
  {
    if (!wp_next_scheduled(WORDPROOF_WSFY_CRON_HOOK, array($postId))) {
      wp_schedule_single_event(time() + 7, WORDPROOF_WSFY_CRON_HOOK, array($postId));
    }
  }


  /**
   * Callback stuff
   * ___________________
   */
  public function processCallback()
  {
    if (in_array($_SERVER['REMOTE_ADDR'], OptionsHelper::getWSFYAllowedIps())) {
      $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

      switch ($action) {
        case 'wordproof_test_callback':
          $this->handleTestCallback();
          break;
        case 'wordproof_callback':
        default:
          $this->handleModifyPost();
          break;
      }
    } else {
      error_log('WordProof: Update request denied');
      error_log($_SERVER['REMOTE_ADDR']);
      echo json_encode(['success' => false, 'response' => $this->responses['origin_not_allowed'], 'remote_addr' => $_SERVER['REMOTE_ADDR']]);
      die();
    }
  }

  public function handleTestCallback()
  {
    error_log('WordProof: Callback successfully tested');
    echo json_encode(['success' => true, 'response' => $this->responses['valid_endpoint']]);
    die();
  }

  public function handleModifyPost()
  {
    $postId = intval($_REQUEST['uid']);
    $chain = ($_REQUEST['chain']) ? sanitize_text_field($_REQUEST['chain']) : '';
    $balance = ($_REQUEST['balance']) ? intval($_REQUEST['balance']) : false;
    $transactionId = ($_REQUEST['transactionId']) ? sanitize_text_field($_REQUEST['transactionId']) : '';
    $meta = PostMetaHelper::getPostMeta($postId);

    if (!empty($meta)) {
      $meta->blockchain = $chain;
      $meta->transactionId = $transactionId;

      PostMetaHelper::savePostMeta($postId, (array)$meta, true);

      if ($balance)
        OptionsHelper::set('balance', $balance);

      echo json_encode(['success' => true, 'response' => $this->responses['post_modified']]);
      die();
    } else {
      error_log('Post ' . $postId . ' not updated. ');
      echo json_encode(['success' => false, 'response' => $this->responses['post_not_modified']]);
      die();
    }
  }
  /**
   * /__________
   */
}
