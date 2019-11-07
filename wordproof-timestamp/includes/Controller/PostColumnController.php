<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class PostColumnController
{

  public $options;

  public function __construct()
  {
    $showColumn = true;
    if (OptionsHelper::getHidePostColumn()) {

      $userMeta = get_userdata(get_current_user_id());
      $roles = $userMeta->roles;

      if (!is_array($roles) || !in_array('administrator', $roles, true)) {
        $showColumn = false;
      }
    }

    if ($showColumn) { //TODO also on CPT's
      add_filter('manage_posts_columns', array($this, 'addColumn'));
      add_action('manage_posts_custom_column', array($this, 'addColumnContent'), 10, 2);
      add_filter('manage_pages_columns', array($this, 'addColumn'));
      add_action('manage_pages_custom_column', array($this, 'addColumnContent'), 10, 2);
    }

    add_action('wp_ajax_wordproof_wsfy_save_post', [$this, 'savePost']);
    add_action('wp_ajax_wordproof_wsfy_retry_callback', [$this, 'retryCallback']);
  }

  function savePost()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $result = AutomateController::savePost($postId);
    echo json_encode($result);
    die();
  }

  function retryCallback()
  {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $result = AutomateController::retryCallback($postId);
    echo json_encode($result);
    die();
  }

  public function addColumn($defaults)
  {
    $defaults['wordproof'] = 'WordProof';
    return $defaults;
  }

  //TODO: Create React component
  public function addColumnContent($column_name)
  {
    global $post;
    if ($column_name == 'wordproof') {

      $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain']);
      if ($post->post_status !== 'publish') {

        echo '<span>🕓 Not published yet</span>';

      } else if (empty($meta->date)) {

        echo '<span>🚨 Not timestamped</span>';
        $this->addTimestampButton($post);

      } else if ($meta->date !== get_the_modified_date('c', $post->ID)) {

        echo '<a target="_blank" rel="noopener noreferrer" href="' . DomainHelper::getPermalink($post->ID) . '#wordproof">🚨 Timestamp is outdated</a>';
        $this->addTimestampButton($post);

      } else if (empty($meta->blockchain)) {

        echo '<span>🕓 Waiting for callback</span>';
        $this->addRequestCallbackButton($post);

      } else {

        echo '<a target="_blank" rel="noopener noreferrer" href="' . DomainHelper::getPermalink($post->ID) . '#wordproof">✅ Certificate</a>';

      }
    }
  }

  public function addTimestampButton($post)
  {
    if (OptionsHelper::isWSFYActive()) {
      echo '<br><button class="button wordproof-wsfy-save-post" data-post-id="' . $post->ID . '">Timestamp this post</button>';
      echo '<span class="wordproof-wsfy-message-' . $post->ID . '"> </span>';
    }
  }

  public function addRequestCallbackButton($post)
  {
    if (OptionsHelper::isWSFYActive()) {
      echo '<br><button class="button wordproof-wsfy-request-callback" data-post-id="' . $post->ID . '">Request new callback</button>';
      echo '<span class="wordproof-wsfy-message-' . $post->ID . '"> </span>';
    }
  }
}
