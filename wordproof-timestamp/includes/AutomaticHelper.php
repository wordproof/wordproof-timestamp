<?php

namespace WordProofTimestamp\includes;

use WordProofTimestamp\includes\Controller\HashController;
use WordProofTimestamp\includes\Controller\TimestampController;
use WordProofTimestamp\includes\Resource\ItemResource;

class AutomaticHelper
{

  protected $options;
  protected $post;
  protected $canRun;
  protected $body;
  protected $endpoint;
  protected $action;

  /**
   * AutomaticHelper constructor.
   * @param $postId
   */
  public function __construct($postId = false)
  {
    $this->options = OptionsHelper::getWSFY();

    if ($postId)
      $this->post = get_post($postId);

    $this->canRun = ($this->options->site_token && isset($this->options->site_id));
  }


  public function createPost()
  {
    if ($this->canRun) {

      $this->action = 'create_post';

      if ($this->post->post_status !== 'publish' && $this->post->post_status !== 'inherit') {
        return ['errors' => ['post_status' => ['Post needs to be published']]];
      }

      $type = HashController::getType($this->post);
      $this->body = ItemResource::getArray($type, $this->post);

      $this->endpoint = str_replace('$siteId', $this->options->site_id, WORDPROOF_WSFY_ENDPOINT_ITEM);
      return $result = $this->request();
    } else {
      return ['errors' => ['authentication' => ['Please configure your site key']]];
    }
  }

  public function retryCallback()
  {
    if ($this->canRun) {

      $this->action = 'retry_callback';

      $endpoint = str_replace('$postId', $this->post->ID, WORDPROOF_WSFY_ENDPOINT_RETRY_CALLBACK);
      $this->endpoint = str_replace('$siteId', $this->options->site_id, $endpoint);

      if (!empty(OptionsHelper::getCustomDomain()))
        $this->body['overwrite_callback'] = site_url('/') . 'wp-admin/admin-post.php';

      return self::request();

    } else {
      return ['errors' => ['authentication' => ['Please configure your site key']]];
    }
  }

  public function getBalance()
  {
    if ($this->canRun) {

      $this->action = 'get_balance';
      $this->endpoint = 'sites/' . $this->options->site_id . '/balance';
      $this->body = false;
      return self::request('GET');

    } else {
      return ['errors' => ['authentication' => ['Please configure your site key']]];
    }
  }

  private function request($method = 'POST')
  {
    $args = [
      'method' => $method,
      'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $this->options->site_token
      ],
    ];

    if ($this->body) {
      $json = json_encode($this->body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $args = array_merge($args, ['body' => $json]);
    }

    $response = wp_remote_request(WORDPROOF_WSFY_API_URI . $this->endpoint, $args);
    $code = wp_remote_retrieve_response_code($response);

    switch ($code) { //todo
      case 200:
      case 201:
      case 203:
        return $this->handleSuccessResponse($response);
      default:
        return $this->handleFailedResponse($response);

    }
  }

  private function handleSuccessResponse($response)
  {
    $body = json_decode($response['body']);

    switch ($this->action) {
      case 'get_balance':
        $balance = (isset($body->balance)) ? intval($body->balance) : 0;
        OptionsHelper::set('balance', $balance);
        return OptionsHelper::getBalance();
      case 'create_post':

        $balance = OptionsHelper::getBalance();
        if ($balance === 1)
          OptionsHelper::set('balance', 0);

        TimestampController::saveTimestamp($this->post->ID, '', '', true);
        break;
      case 'retry_callback':
        return ['success' => true];
      case 'get_articles':
        break;
      default:
        return false;
    }
  }

  private function handleFailedResponse($response)
  {
    switch ($this->action) {
      case 'create_post':
      case 'retry_callback':
        return $this->returnError($response);
      case 'get_articles':
//        ''
        break;
      case 'get_balance':
      default:
        return ['success' => false, 'message' => 'Something went wrong'];
    }
  }

  private function returnError($result) //todo
  {
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
}
