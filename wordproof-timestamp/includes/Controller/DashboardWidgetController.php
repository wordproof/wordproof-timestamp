<?php

namespace WordProofTimestamp\includes\Controller;

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

  public function hook() {
    wp_add_dashboard_widget(
      'wordproof_dashboard_widget',
      'WordProof Timestamp',
      [$this, 'render']
    );
    $this->sortWidgets();
  }

  public function render()
  {
    echo $this->getUnprotectedWarning();
  }

  public function sortWidgets()
  {
    global $wp_meta_boxes;

    $currentDashboard = $wp_meta_boxes['dashboard']['normal']['core'];
    $widget = array( 'wordproof_dashboard_widget' => $currentDashboard['wordproof_dashboard_widget'] );
    unset( $currentDashboard['wordproof_dashboard_widget'] );
    $sortedDashboard = array_merge( $widget, $currentDashboard );
    $wp_meta_boxes['dashboard']['normal']['core'] = $sortedDashboard;
  }

  public function getUnprotectedWarning() {
    $pages = $this->getUnprotectedPosts('page');
    $posts = $this->getUnprotectedPosts('post');
    $attachments = $this->getUnprotectedPosts('attachment');
    $string = '';
    $string .= ($this->showWarning($pages)) ? $pages . ' pages ' : '';
    $string .= ($this->showWarning($posts)) ? ',' : '';
    $string .= ($this->showWarning($posts) && !$this->showWarning($attachments)) ? ' and ' . $posts . ' of your posts' : '';
    $string .= ($this->showWarning($posts) && $this->showWarning($attachments)) ? $posts . ' posts ' : '';
    $string .= ($this->showWarning($attachments)) ? 'and ' . $attachments . ' of your attachments ' : '';
    $string .= 'are at risk of copying and miss potential SEO benefits. Timestamp them today.';
    return $string;
  }

  private function showWarning($amount) {
    return $amount > 0;
  }

  public function getUnprotectedPosts($postType) {
    $postStatus = ($postType === 'attachment') ? 'inherit' : 'publish';
    $total = wp_count_posts($postType)->$postStatus;
    $protected = $this->getProtectedPosts($postType, $postStatus);
    return intval($total - $protected);
  }

  public function getProtectedPosts($postType, $postStatus) {
    global $wpdb;
    $s = $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM $wpdb->postmeta AS `M` INNER JOIN $wpdb->posts AS `P` ON `M`.`post_id` = `P`.`ID` WHERE `M`.`meta_key` = 'wordproof_timestamp_data' AND `P`.`post_status` = %s AND `P`.`post_type` = %s", $postStatus, $postType));
    return intval($s);
  }
}
