<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\DebugLogHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\Page\AutoStampPage;
use WordProofTimestamp\includes\PostMetaHelper;
use WordProofTimestamp\lib\JWT\JWT;
use WordProofTimestamp\lib\JWT\SignatureInvalidException;

class AutomaticHooksController
{

  protected $response = null;

  protected $responses = [
    'unauthenticated' => 'unauthenticated',
    'origin_not_allowed' => 'origin_not_allowed',
    'no_token_present' => 'no_token_present',
    'token_not_valid' => 'token_not_valid',
    'valid_endpoint' => 'valid_endpoint',
    'post_modified' => 'post_modified',
    'post_not_modified' => 'post_not_modified',
  ];

  public function __construct()
  {
    add_action('admin_post_nopriv_wordproof_test_callback', [$this, 'processCallback']);
    add_action('admin_post_nopriv_wordproof_callback', [$this, 'processCallback']);
    add_action('admin_post_nopriv_wordproof_wsfy_edit_post', [$this, 'processCallback']);
    add_action('admin_post_wordproof_validate_token', [$this, 'validateToken']);

    add_action(WORDPROOF_WSFY_CRON_HOOK, [$this, 'createPost']);

    add_action('wp_ajax_nopriv_wordproof_get_articles', [$this, 'getArticles']);
    add_action('wp_ajax_wordproof_get_articles', [$this, 'getArticles']);
    add_action('wp_ajax_wordproof_get_refreshed_balance', [$this, 'getNewBalance']);
    add_action('wp_ajax_wordproof_get_post_data', [$this, 'getPostData']);

    if (OptionsHelper::isWSFYActive()) {
      $this->setUpdateHooks();

      if (is_admin())
        new AutoStampPage();
    }
  }

  public function createPost($postId)
  {
    $helper = new AutomaticHelper($postId);
    $helper->createPost();
  }

  public function setUpdateHooks()
  {
    $options = OptionsHelper::getWSFY(['site_token']);
    if (isset($options->allowed_post_types)) {
      foreach ($options->allowed_post_types as $postType) {
        add_action('publish_' . $postType, [$this, 'setCron']);
      }
    }
  }

  public function getArticles()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $controller = new AutomaticHelper($postId);
    $result = $controller->getArticles();
    echo json_encode($result, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    die();
  }

  public function getNewBalance()
  {
    check_ajax_referer('wordproof', 'security');
    $controller = new AutomaticHelper();
    $balance = $controller->getBalance();
    echo json_encode(['balance' => $balance]);
    die();
  }

  public function validateToken()
  {
    check_ajax_referer('wordproof', 'security');
    $controller = new AutomaticHelper();
    $body = $controller->validateToken();
    echo json_encode($body);
    die();
  }

  public function getPostData()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $postData = PostMetaHelper::getPostData($postId);
    $meta = PostMetaHelper::getPostMeta($postId, ['date', 'blockchain']);
    echo json_encode(['post' => $postData, 'meta' => $meta]);
    die();
  }

  public function setCron($postId)
  {
    if (!wp_next_scheduled(WORDPROOF_WSFY_CRON_HOOK, [$postId])) {
      wp_schedule_single_event(time() + 7, WORDPROOF_WSFY_CRON_HOOK, [$postId]);
    }
  }


  /**
   * Callback stuff
   * ___________________
   * @param $action
   * @return bool
   */
  private function validCallback($action)
  {

    if ($action === null) {
      echo json_encode(['success' => false, 'message' => 'Please send an action along']);
      die();
    }

    if ($action === 'wordproof_test_callback')
      return true;

    $oauth = OptionsHelper::getOAuth([]);

    if (isset($oauth->access_token)) {

      if (!isset($_REQUEST['token'])) {
        $this->response = $this->responses['no_token_present'];
        return false;
      }

      try {
        if (!empty($oauth->client_secret)) {
          JWT::decode($_REQUEST['token'], $oauth->client_secret, ['HS256']);
        } else if (!empty($oauth->token_id)) {
          JWT::decode($_REQUEST['token'], $oauth->token_id, ['HS256']);
        }
        return true;
      } catch (\Exception $exception) {
        $this->response = $this->responses['token_not_valid'];
        return false;
      }

    } else if (in_array($_SERVER['REMOTE_ADDR'], OptionsHelper::getWSFYAllowedIps())) {
      return true;
    } else {
      $this->response = $this->responses['origin_not_allowed'];
    }

    return false;
  }

  public function processCallback()
  {
    $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

    if ($this->validCallback($action)) {

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
      $response = ['success' => false, 'response' => $this->response, 'remote_addr' => $_SERVER['REMOTE_ADDR'], 'action' => isset($_REQUEST['action']) ? $_REQUEST['action'] : 'none'];
      DebugLogHelper::error('Callback failed. ' . print_r($response, true));
      error_log('WordProof: Update request denied');
      error_log(print_r($response, true));
      echo json_encode($response);
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
    $postId = ($_REQUEST['uid']) ? intval($_REQUEST['uid']) : null;
    $chain = ($_REQUEST['chain']) ? sanitize_text_field($_REQUEST['chain']) : '';
    $balance = ($_REQUEST['balance']) ? intval($_REQUEST['balance']) : false;
    $transactionId = ($_REQUEST['transactionId']) ? sanitize_text_field($_REQUEST['transactionId']) : '';
    $meta = ($postId !== null) ? PostMetaHelper::getPostMeta($postId) : null;

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
