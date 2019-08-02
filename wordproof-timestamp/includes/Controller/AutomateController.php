<?php

namespace WordProofTimestamp\includes\Controller;

class AutomateController
{

  public $options;

  public function __construct()
  {
    $this->options = get_option('wordproof_wsfy');

    if (isset($this->options['active']) && $this->options['active']) {
      add_action('publish_page', [$this, 'setCron']);
      add_action('publish_post', [$this, 'setCron']);
      add_action(WORDPROOF_WSFY_CRON_HOOK, [$this, 'savePost']);
      add_action('wp_enqueue_scripts', [$this, 'enqueueScript']);

      //TODO: Callback from wsfy.wordproof.io,
      //PostMetaHelper can add transaction id and chain
    }
    //TODO: maybe remove actions
  }

  public static function savePost($postId)
  {
    error_log('Saving post to WSFY servers');

    $options = get_option('wordproof_wsfy');
    error_log(print_r($options, true));

    if (isset($options['accessToken']) && isset($options['siteId'])) {
      $post = get_post($postId);

      if ($post->post_status != 'publish') {
        return ['errors' => ['post_status' => ['Post needs to be published']]];
      }

      $body = json_encode([
        'uid' => $post->ID,
        'title' => $post->post_title,
        'content' => $post->post_content,
        'date_created' => get_the_date('c', $post),
        'date_modified' => get_the_modified_date('c', $post),
        'url' => get_permalink($post),
      ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

      error_log($body);

      $result = wp_remote_post(WORDPROOF_WSFY_API . WORDPROOF_WSFY_ENDPOINT_ARTICLE, [
        'headers' => [
          'Accept' => 'application/json',
          'Content-Type' => 'application/json',
          'Authorization' => 'Bearer ' . $options['accessToken']
        ],
        'body' => $body
      ]);

      $code = wp_remote_retrieve_response_code($result);

      if ($code === 201) {
        error_log('Post saved to WSFY Servers. Saving post locally.');
        TimestampController::saveTimestamp($postId, '', '');

        return ['success' => true];
      } else {
        return json_decode($result['body']);
      }
    }
  }

  public function setCron($postId)
  {
    error_log('Logging ' . $postId);
    if (!wp_next_scheduled(WORDPROOF_WSFY_CRON_HOOK, array($postId))) {
      error_log('Setting cron');
      wp_schedule_single_event(time() + 10, WORDPROOF_WSFY_CRON_HOOK, array($postId));
    }
  }

  public function enqueueScript()
  {
    if (is_singular()) {
      global $post;

      //TODO: ADD CERTIFICATE TEXT
      wp_enqueue_script('wordproof-wsfy', WORDPROOF_URI_JS . '/wsfy.js');
      wp_localize_script('wordproof-wsfy', 'wproof', array(
        'uid' => $post->ID,
        'icon' => WORDPROOF_URI_IMAGES . '/wordproof-icon.png',
        'logo' => WORDPROOF_URI_IMAGES . '/wordproof-logo.png',
        'siteId' => (isset($this->options['site_id'])) ? $this->options['site_id'] : '',
        'certificateText' => (isset($this->options['certificate_text'])) ? $this->options['certificate_text'] : '',
        'certificateDOMParent' => (isset($this->options['certificate_dom_parent'])) ? $this->options['certificate_dom_parent'] : '',
        'noRevisions' => (isset($this->options['no_revisions'])) ? true : false,
      ));
    }
  }
}