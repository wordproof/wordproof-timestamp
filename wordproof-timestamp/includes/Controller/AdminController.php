<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\ChainHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\MetaBox;
use WordProofTimestamp\includes\NotificationHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\Page\GettingStarted;
use WordProofTimestamp\includes\Page\OnboardingWizard;
use WordProofTimestamp\includes\Page\SettingsPage;
use WordProofTimestamp\includes\UpdateHelper;


class AdminController
{

  public function __construct()
  {
    if (is_admin()) {

      new UpdateHelper();

      add_action('admin_post_wordproof_update_setting', [$this, 'updateSetting']);
      add_action('admin_enqueue_scripts', [$this, 'loadAdminAssets']);

      //Admin Pages
      new SettingsPage();
      new OnboardingWizard();
      new GettingStarted();

      new PostColumnController();
      new DashboardWidgetController();
      new MetaBox();
      new NotificationHelper();
      new ChainHelper();
    }
  }

  public function updateSetting() {
    $key = $_REQUEST['key'];
    $value = $_REQUEST['value'];
    if (!empty($key) && !empty($value)) {
      OptionsHelper::set($key, $value);
    }
  }

  public function loadAdminAssets($hookSuffix)
  {
    $allowedPages = ['edit.php', 'post-new.php', 'post.php', 'upload.php',
      'admin_page_wordproof-autostamp',
      'toplevel_page_wordproof-dashboard',
      'wordproof_page_wordproof-general',
      'wordproof_page_wordproof-manual',
      'wordproof_page_wordproof-automatic',
      'wordproof_page_wordproof-support',
    ];

    if (in_array($hookSuffix, $allowedPages)) {
      global $post;
      wp_enqueue_style('wordproof.admin.css', WORDPROOF_URI_CSS . '/admin.css', array(), filemtime(WORDPROOF_DIR_CSS . '/admin.css'));

      wp_enqueue_script('wordproof.admin.js', WORDPROOF_URI_JS . '/admin.js', array(), filemtime(WORDPROOF_DIR_JS . '/admin.js'), true);
      wp_localize_script('wordproof.admin.js', 'wordproofData', array(
        'ajaxURL' => admin_url('admin-ajax.php'),
        'settingsURL' => admin_url('admin.php?page=wordproof'),
        'ajaxSecurity' => wp_create_nonce('wordproof'),
        'postId' => (!empty($post->ID)) ? $post->ID : false,
        'permalink' => (!empty($post->ID)) ? DomainHelper::getPermalink($post->ID) : false,
        'network' => OptionsHelper::getNetwork(),
        'accountName' => OptionsHelper::getAccountName(''),
        'wordBalance' => OptionsHelper::getBalance(0),
        'pluginDirUrl' => WORDPROOF_URI
      ));
    }
  }
}
