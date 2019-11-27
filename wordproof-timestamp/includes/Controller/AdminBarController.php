<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\OptionsHelper;

class AdminBarController
{

  public $options;

  public function __construct()
  {
    add_action('admin_bar_menu', [$this, 'render'], 100);
  }

  public function render( \WP_Admin_Bar $bar)
  {
    $balance = OptionsHelper::getBalanceCache();
    $bar->add_menu(array(
      'id' => 'wordproof-balance',
      'title' => '<span class="wordproof-icon" style="background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwcHgiIGhlaWdodD0iNTAwcHgiIHZpZXdCb3g9IjAgMCA1MDAgNTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPgogPHBhdGggaWQ9InBhdGgiIGQ9Ik00MjAuNCAxMTkgTDM1My43IDM5MS4zIDI4Ni42IDM5MS4zIDI0Ny4yIDI0OS43IDMwMC45IDI0OS43IDMxOS43IDMxMy43IDM2MS40IDExOSBaIiBmaWxsPSIjYTBhNWFhIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgogPHBhdGggaWQ9InBhdGgtMSIgZD0iTTIyOC4zIDExOSBMMTc0LjMgMzEzLjcgMTMyLjcgMTE5IDczLjcgMTE5IDE0MC40IDM5MS4zIDIwNy4xIDM5MS4zIDI4MC42IDExOSBaIiBmaWxsPSIjYTBhNWFhIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8L3N2Zz4=&quot;) !important;"></span> '
        . sprintf(__('%s Timestamps left', 'wordproof-timestamp'), $balance),
      'href' => false,
    ));

  }
}
