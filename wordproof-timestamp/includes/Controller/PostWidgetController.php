<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class PostWidgetController
{
  public function __construct()
  {
    if (current_user_can('manage_options')) {
      add_action('add_meta_boxes', [$this, 'hook']);
    }
  }

  public function hook()
  {
    add_meta_box(
      'wordproof-meta-box',
      'WordProof',
      [$this, 'render'],
      null,
      'side',
      'high',
      ''
    );
  }

  public function render()
  {
    echo '<div id="wordproof-post-widget"></div>';
  }

  public static function isTimestamped()
  {
    global $post;
    if (isset($post->ID)) {
      $meta = PostMetaHelper::getPostMeta($post->ID);

      if (!isset($meta->date))
        return 'not timestamped';

      if ($meta->date !== get_the_modified_date('c', $post))
        return 'timestamped, but outdated';

      if (!isset($meta->blockchain) || empty($meta->blockchain))
        return 'awaiting a callback';

      return 'timestamped';
    }

    return 'not timestamped';
  }
}
