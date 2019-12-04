<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class DashboardWidgetController
{

  public $options;

  public function __construct()
  {
    add_action('wp_dashboard_setup', [$this, 'hook']);
  }

  public function hook()
  {
    wp_add_dashboard_widget(
      'wordproof_dashboard_widget',
      'WordProof Timestamp',
      [$this, 'render']
    );

    $this->sortWidgets();
  }

  public function render()
  {
    echo '<div id="wordproof-dashboard-widget"></div>';
  }

  public function sortWidgets()
  {
    global $wp_meta_boxes;

    $currentDashboard = $wp_meta_boxes['dashboard']['normal']['core'];
    $widget = array('wordproof_dashboard_widget' => $currentDashboard['wordproof_dashboard_widget']);
    unset($currentDashboard['wordproof_dashboard_widget']);
    $sortedDashboard = array_merge($widget, $currentDashboard);
    $wp_meta_boxes['dashboard']['normal']['core'] = $sortedDashboard;
  }

  public static function getRecentPosts($postType, $compare = 'NOT EXISTS')
  {
    $status = ($postType === 'attachment') ? 'inherit' : 'publish';

    $result = [];

    $query = new \WP_Query([
      'post_type' => $postType,
      'posts_per_page' => 3,
      'post_status' => $status,
      'meta_query' => [
        [
          'key' => 'wordproof_timestamp_data',
          'compare' => $compare
        ]
      ]
    ]);
    $posts = $query->get_posts();

    foreach ($posts as $post) {
      $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain']);

      $postData = [
        'id' => $post->ID,
        'date_modified' => get_the_modified_date('c', $post->ID),
        'title' => $post->post_title,
        'status' => $post->post_status,
        'type' => $post->post_type,
        'permalink' => get_permalink($post),
      ];

      $result[] = ['post' => $postData, 'meta' => $meta];
    }

    wp_reset_postdata();

    return $result;
  }

  public static function getUnprotectedWarning()
  {
    $pages = self::getUnprotectedPosts('page');
    $posts = self::getUnprotectedPosts('post');
    $attachments = self::getUnprotectedPosts('attachment');
    $string = '';
    $string .= (self::showWarning($pages)) ? $pages . ' pages ' : '';
    $string .= (self::showWarning($posts)) ? ',' : '';
    $string .= (self::showWarning($posts) && !self::showWarning($attachments)) ? ' and ' . $posts . ' of your posts' : '';
    $string .= (self::showWarning($posts) && self::showWarning($attachments)) ? $posts . ' posts ' : '';
    $string .= (self::showWarning($attachments)) ? 'and ' . $attachments . ' of your attachments ' : '';
    $string .= 'are at risk of copying and miss potential SEO benefits. Timestamp them today.';
    return $string;
  }

  private static function showWarning($amount)
  {
    return $amount > 0;
  }

  public static function getUnprotectedCount()
  {
    return self::getUnprotectedPosts('page') + self::getUnprotectedPosts('post') +  self::getUnprotectedPosts('attachment');
  }

  private static function getUnprotectedPosts($postType)
  {
    $postStatus = ($postType === 'attachment') ? 'inherit' : 'publish';
    $total = wp_count_posts($postType)->$postStatus;
    $protected = self::getProtectedPosts($postType, $postStatus);
    return intval($total - $protected);
  }

  private static function getProtectedPosts($postType, $postStatus)
  {
    global $wpdb;
    $s = $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM $wpdb->postmeta AS `M` INNER JOIN $wpdb->posts AS `P` ON `M`.`post_id` = `P`.`ID` WHERE `M`.`meta_key` = 'wordproof_timestamp_data' AND `P`.`post_status` = %s AND `P`.`post_type` = %s", $postStatus, $postType));
    return intval($s);
  }
}
