<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\Page\AutoStampPage;
use WordProofTimestamp\includes\PostMetaHelper;

class AutomateController
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
    //TODO: Create separate callback controller
    add_action('admin_post_nopriv_wordproof_test_callback', [$this, 'processCallback']);
    add_action('admin_post_nopriv_wordproof_callback', [$this, 'processCallback']);
    add_action('admin_post_nopriv_wordproof_wsfy_edit_post', [$this, 'processCallback']);

    if (OptionsHelper::isWSFYActive()) {
      $options = OptionsHelper::getWSFY([], ['site_token']);

      if (isset($options->allowed_post_types)) {

        foreach ($options->allowed_post_types as $postType) {
          add_action('publish_' . $postType, [$this, 'setCron']);
        }

      } else {
        add_action('publish_page', [$this, 'setCron']);
        add_action('publish_post', [$this, 'setCron']);
      }

      add_action(WORDPROOF_WSFY_CRON_HOOK, [$this, 'savePost']);


      if (is_admin()) {
        new AutoStampPage();
      }
    }
  }

  public static function savePost($postId)
  {
    error_log('Saving post to WSFY servers');

    $options = OptionsHelper::getWSFY();

    if (isset($options->site_token) && isset($options->site_id)) {
      $post = get_post($postId);

      if ($post->post_status != 'publish') {
        return ['errors' => ['post_status' => ['Post needs to be published']]];
      }

      $type = HashController::getType($post);
      $body = json_encode(self::getBody($type, $post), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

      $endpoint = str_replace('$siteId', $options->site_id, WORDPROOF_WSFY_ENDPOINT_ITEM);

      $result = self::postToMy($endpoint, $options->site_token, $body);

      $code = wp_remote_retrieve_response_code($result);

      if ($code === 201) {
        TimestampController::saveTimestamp($postId, '', '', true);
      } else {
        return self::returnError($result);
      }
    } else {
      return ['errors' => ['authentication' => ['Please configure your site key']]];
    }
  }

  public static function retryCallback($postId) {
    $options = OptionsHelper::getWSFY();

    if (isset($options->site_token) && isset($options->site_id)) {
      $endpoint = str_replace('$postId', $postId, WORDPROOF_WSFY_ENDPOINT_RETRY_CALLBACK);
      $endpoint = str_replace('$siteId', $options->site_id, $endpoint);
      self::postToMy($endpoint, $options->site_token, []);
    } else {
      return ['errors' => ['authentication' => ['Please configure your site key']]];
    }
  }

  private static function postToMy($endpoint, $token, $body) {
    return $result = wp_remote_post(WORDPROOF_WSFY_API_URI . $endpoint, [
      'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $token
      ],
      'body' => $body
    ]);
  }

  private static function returnError($result) {
    if (isset($result)) {
      if (is_wp_error($result)) {
        return ['errors' => $result->get_error_message()];
      } else if (is_array($result) && isset($result['body'])) {
        return $result['body'];
      } else {
        return $result;
      }
    }
  }

  private static function getBody($type, $post) {
    switch($type) {
      case ARTICLE_TIMESTAMP:
        $fields = HashController::getFields($post);
        return [
          'type' => ARTICLE_TIMESTAMP,
          'version' => $fields['properties']['version'],
          'uid' => $post->ID,
          'title' => $fields['properties']['title'],
          'content' => $fields['properties']['content'],
          'date_created' => get_the_date('c', $post),
          'date_modified' => $fields['properties']['date'],
          'url' => $fields['attributes']['url'],
        ];
      case MEDIA_OBJECT_TIMESTAMP:
        $fields = HashController::getFields($post);
        return [
          'type' => MEDIA_OBJECT_TIMESTAMP,
          'version' => CURRENT_TIMESTAMP_STANDARD_VERSION,
          'uid' => $post->ID,
          'title' => $fields['properties']['title'],
          'content_hash' => $fields['properties']['contentHash'],
          'content_url' => $fields['properties']['contentUrl'],
          'encoding_format' => $fields['properties']['encodingFormat'],
          'date_created' => get_the_date('c', $post),
          'date_modified' => $fields['properties']['date'],
        ];
      default:
        return null;
    }

  }

  public function processCallback()
  {
    if (in_array($_SERVER['REMOTE_ADDR'], WORDPROOF_WSFY_API_IP)) {
      $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

      switch($action) {
        case 'wordproof_test_callback':
          $this->handleCheckCallback();
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

  public function handleCheckCallback() {
    echo json_encode(['success' => true, 'response' => $this->responses['valid_endpoint']]);
    die();
  }

  public function handleModifyPost() {
    $postId = intval($_REQUEST['uid']);
    $chain = ($_REQUEST['chain']) ? sanitize_text_field($_REQUEST['chain']) : '';
    $transactionId = ($_REQUEST['transactionId']) ? sanitize_text_field($_REQUEST['transactionId']) : '';
    $meta = PostMetaHelper::getPostMeta($postId);

    if (!empty($meta)) {
      $meta->blockchain = $chain;
      $meta->transactionId = $transactionId;

      PostMetaHelper::savePostMeta($postId, (array)$meta, true);
      echo json_encode(['success' => true, 'response' => $this->responses['post_modified']]);
      die();
    } else {
      error_log('Post ' . $postId . ' not updated. ');
      echo json_encode(['success' => false, 'response' => $this->responses['post_not_modified']]);
      die();
    }
  }

  public function setCron($postId)
  {
    if (!wp_next_scheduled(WORDPROOF_WSFY_CRON_HOOK, array($postId))) {
      wp_schedule_single_event(time() + 7, WORDPROOF_WSFY_CRON_HOOK, array($postId));
    }
  }
}
