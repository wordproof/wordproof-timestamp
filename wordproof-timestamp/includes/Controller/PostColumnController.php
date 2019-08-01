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

    add_action('wp_ajax_wordproof_wsfy_save_post', [$this, 'savePost']);
  }

  public function addColumn($defaults)
  {
    $defaults['wordproof'] = 'WordProof';
    return $defaults;
  }

  function wsfy_ajax_save_post() {
    check_ajax_referer('wsfy', 'security');
    $postId = intval($_REQUEST['post_id']);
    $result = wsfy_save_post($postId, true);
    echo json_encode($result, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);; die();
  }

  public function addColumnContent($column_name)
  {
    global $post;
    if ($column_name == 'wordproof') {

      $meta = PostMetaHelper::getPostMeta($post, ['wordproof_date']); //TODO: Check it
      if (isset($meta->wordproof_date)) {
        if ($meta->wordproof_date === get_the_modified_date('Y-m-d H:i:s', $post->ID)) {
          echo '<a target="_blank" href="' . get_permalink($post->ID) . '#wordproof">Stamped</a>';
        } else {
          echo '<a target="_blank" href="' . get_permalink($post->ID) . '#wordproof">Outdated</a>';
          if ($this->options['active'] === true) {
            echo '<button class="button wordproof-wsfy-save-post" data-post-id="' . $post->ID . '">Timestamp this post</button>';
            echo '<span class="wordproof-wsfy-message-' . $post->ID . '"> </span>';
          }
        }
      } else {
        echo '<span>Post is never stamped</span>';
      }

    }
  }

  public function savePost() {
    check_ajax_referer('wordproof-timestamp', 'security');
    $postId = intval($_REQUEST['post_id']);
    $result = wsfy_save_post($postId, true);
    echo json_encode($result, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);; die();
  }
}