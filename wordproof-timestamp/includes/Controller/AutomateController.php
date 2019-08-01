<?php

namespace WordProofTimestamp\includes\Controller;

class AutomateController
{

  public $options;

  public function __construct()
  {
    $this->options = get_option('wordproof_wsfy');

    if ($this->options['active']) {
      add_action('publish_page', [$this, 'setCron']);
      add_action('publish_post', [$this, 'setCron']);
      add_action(WORDPROOF_WSFY_CRON_HOOK, [$this, 'savePost']);
      add_action('wp_enqueue_scripts', [$this, 'enqueueScript']);
    }
    //TODO: maybe remove actions
  }

  public function savePost($postId, $return = false) {
    error_log('Saving post to WSFY servers');

    if (isset($this->options['access_token']) && isset($this->options['site_id'])) {
      $post = get_post($postId);


      if ($post->post_status != "publish") {
        return 'Post needs to be published';
      }

      $body = json_encode([
        'uid' => $post->ID,
        'title' => $post->post_title,
        'content' => $post->post_content,
        'date_created' => get_the_date('c', $post),
        'date_modified' => get_the_modified_date('c', $post),
        'url' => get_permalink($post),
      ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

      $result = wp_remote_post(WORDPROOF_WSFY_API . WORDPROOF_WSFY_ENDPOINT_ARTICLE, [
        'headers' => [
          'Accept' => 'application/json',
          'Content-Type' => 'application/json',
          'Authorization' => 'Bearer ' . $this->options['access_token']
        ],
        'body' => $body
      ]);

      if ($return) {
        return $result;
      }

      isset($result['body']) ? error_log($result['body']) : error_log(print_r($result, true));

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

  public function enqueueScript() {
    if (is_singular()) {
      global $post;

      wp_enqueue_script('wordproof-wsfy', WORDPROOF_URI_JS . '/wsfy.js');
      wp_localize_script('wordproof-wsfy', 'wproof', array(
        'uid' => $post->ID,
        'icon' => WORDPROOF_URI_IMAGES . '/wordproof-icon.png',
        'logo' =>  WORDPROOF_URI_IMAGES . '/wordproof-logo.png',
        'siteId' => (isset($this->options['site_id'])) ? $this->options['site_id'] : '',
        'certificateText' =>  (isset($this->options['certificate_text'])) ? $this->options['certificate_text'] : '',
        'certificateDOMParent' =>  (isset($this->options['certificate_dom_parent'])) ? $this->options['certificate_dom_parent'] : '',
        'noRevisions' =>  (isset($this->options['no_revisions'])) ? true : false,
      ));
    }
  }
}