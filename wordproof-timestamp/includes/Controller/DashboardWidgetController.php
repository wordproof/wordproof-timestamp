<?php

namespace WordProofTimestamp\includes\Controller;

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

  public static function getRecentPosts($postType, $compare = 'NOT EXISTS', $amount = 3, $postsOnly = false)
  {
    $status = ($postType === 'attachment') ? 'inherit' : 'publish';

    $result = [];

    $query = new \WP_Query([
      'post_type' => $postType,
      'posts_per_page' => $amount,
      'post_status' => $status,
      'meta_query' => [
        [
          'key' => 'wordproof_timestamp_data',
          'compare' => $compare
        ]
      ]
    ]);
    $posts = $query->get_posts();

    wp_reset_postdata();

    if ($postsOnly)
      return $posts;

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

    return $result;
  }

  /**
   * @return string
   * TODO: Yup. Refactor this please.
   */
  public static function getUnprotectedWarning()
  {
    $pages = self::getUnprotectedPostsCount('page');
    $posts = self::getUnprotectedPostsCount('post');
    $attachments = self::getUnprotectedPostsCount('attachment');
    if (!self::showWarning($pages) && !self::showWarning($posts) && !self::showWarning($attachments))
      return 'Everything is protected. Congratulations!';

    $end = ' are at risk of copying and miss potential SEO benefits. Timestamp them today.';

    if (boolval($pages) && boolval($posts) && boolval($attachments))
      return $pages . ' pages, ' . $posts . ' posts and ' . $attachments . ' of your attachments' . $end;

    if (boolval($pages) && boolval($posts))
      return $pages . ' pages and ' . $posts . ' of your posts' . $end;

    if (boolval($pages) && boolval($attachments))
      return $pages . ' pages and ' . $posts . ' of your attachments' . $end;

    if (boolval($posts) && boolval($attachments))
      return $posts . ' posts and ' . $attachments . ' of your attachments' . $end;

    if (boolval($pages))
      return self::getOneliner($pages, 'pages') . $end;

    if (boolval($posts))
      return self::getOneliner($pages, 'posts') . $end;

    if (boolval($attachments))
      return self::getOneliner($pages, 'attachments') . $end;
  }


  private static function showWarning($amount)
  {
    return $amount > 0;
  }


  private static function getOneliner($amount, $type)
  {
    return $amount . ' of your ' . $type;
  }

  public static function getTotalUnprotectedCount()
  {
    //TODO: refactor please
    return self::getUnprotectedPostsCount('page') + self::getUnprotectedPostsCount('post') +  self::getUnprotectedPostsCount('attachment');
  }

  public static function getUnprotectedPostsCount($postType)
  {
    //TODO: refactor please
    $postStatus = ($postType === 'attachment') ? 'inherit' : 'publish';
    $total = wp_count_posts($postType)->$postStatus;
    $protected = self::getProtectedPosts($postType, $postStatus);
    return intval($total - $protected);
  }

  private static function getProtectedPosts($postType, $postStatus)
  {
    //TODO: refactor please
    global $wpdb;
    $s = $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM $wpdb->postmeta AS `M` INNER JOIN $wpdb->posts AS `P` ON `M`.`post_id` = `P`.`ID` WHERE `M`.`meta_key` = 'wordproof_timestamp_data' AND `P`.`post_status` = %s AND `P`.`post_type` = %s", $postStatus, $postType));
    return intval($s);
  }

  private static function getUnprotectedPostIds($postType)
  {
    //TODO: refactor please
    $postStatus = ($postType === 'attachment') ? 'inherit' : 'publish';
    global $wpdb;
    $s = $wpdb->get_var($wpdb->prepare("SELECT `ID` FROM $wpdb->posts AS `P` INNER JOIN $wpdb->postmeta AS `M` ON `P`.`ID` = `M`.`post_id` WHERE `M`.`meta_key` = 'wordproof_timestamp_data' AND `P`.`post_status` = %s AND `P`.`post_type` = %s", $postStatus, $postType));
    return intval($s);
  }
}
