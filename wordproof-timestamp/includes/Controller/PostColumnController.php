<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class PostColumnController
{

  public $options;

  public function __construct()
  {
    $this->options = get_option('wordproof_wsfy');

    add_filter('manage_posts_columns', array($this, 'addColumn'));
    add_action('manage_posts_custom_column', array($this, 'addColumnContent'), 10, 2);
    add_filter('manage_pages_columns', array($this, 'addColumn'));
    add_action('manage_pages_custom_column', array($this, 'addColumnContent'), 10, 2);

    add_action('wp_ajax_wordproof_wsfy_save_post', [$this, 'savePost']);
  }

  function savePost() {
    check_ajax_referer('wordproof', 'security');
    $postId = intval($_REQUEST['post_id']);
    $result = AutomateController::savePost($postId);
    echo json_encode($result);
    die();
  }

  public function addColumn($defaults)
  {
    $defaults['wordproof'] = 'WordProof';
    return $defaults;
  }

  public function addColumnContent($column_name)
  {
    global $post;
    if ($column_name == 'wordproof') {

      $meta = PostMetaHelper::getPostMeta($post, ['date']);
      if (isset($meta->date)) {
        if ($meta->date === get_the_modified_date('c', $post->ID)) {
          echo '<a target="_blank" href="' . get_permalink($post->ID) . '#wordproof">Stamped</a>';
        } else {

          echo '<a target="_blank" href="' . get_permalink($post->ID) . '#wordproof">Outdated</a>';
          if (isset($this->options['active']) && $this->options['active'] === true) {
            echo '<br><button class="button wordproof-wsfy-save-post" data-post-id="' . $post->ID . '">Timestamp this post</button>';
            echo '<span class="wordproof-wsfy-message-' . $post->ID . '"> </span>';
          }
        }
      } else {
        echo '<span>Post is never stamped</span>';
      }

    }
  }
}