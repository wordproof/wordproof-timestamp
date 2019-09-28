<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\ChainHelper;
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

      add_action('admin_enqueue_scripts', [$this, 'loadAdminAssets']);

      //Admin Pages
      new SettingsPage();
      new OnboardingWizard();
      new GettingStarted();

      new MetaBox();
      new NotificationHelper();
      new ChainHelper();
      new PostColumnController();


    }
  }

  public function loadAdminAssets($hookSuffix)
  {
    $allowedPages = ['edit.php', 'post-new.php', 'post.php', 'toplevel_page_wordproof', 'admin_page_wordproof-autostamp'];

    if (in_array($hookSuffix, $allowedPages)) {
      global $post;
      wp_enqueue_style('wordproof.admin.css', WORDPROOF_URI_CSS . '/admin.css', array(), filemtime(WORDPROOF_DIR_CSS . '/admin.css'));

      wp_enqueue_script('wordproof.admin.js', WORDPROOF_URI_JS . '/admin.js', array(), filemtime(WORDPROOF_DIR_JS . '/admin.js'), true);
      wp_localize_script('wordproof.admin.js', 'wordproofData', array(
        'ajaxURL' => admin_url('admin-ajax.php'),
        'settingsURL' => admin_url('admin.php?page=wordproof'),
        'ajaxSecurity' => wp_create_nonce('wordproof'),
        'postId' => (!empty($post->ID)) ? $post->ID : false,
        'permalink' => (!empty($post->ID)) ? get_permalink($post) : false,
        'network' => OptionsHelper::getNetwork(),
        'accountName' => OptionsHelper::getAccountName(''),
        'wordBalance' => OptionsHelper::getBalance(0),
        'pluginDirUrl' => WORDPROOF_URI
      ));
    }
  }
}
