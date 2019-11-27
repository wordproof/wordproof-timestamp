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
    echo 'hello';
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
}
