<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\ChainHelper;
use WordProofTimestamp\includes\MetaBox;
use WordProofTimestamp\includes\NotificationHelper;
use WordProofTimestamp\includes\Page\SettingsPage;

class AdminController
{

  public function __construct()
  {
    if (is_admin()) {

      add_action('admin_enqueue_scripts', array($this, 'loadAdminAssets'));

      new SettingsPage();
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
        'network' => get_option('wordproof_network', false),
        'accountName' => get_option('wordproof_accountname', ''),
        'wordBalance' => get_option('wordproof_balance', 0),
        'pluginDirUrl' => WORDPROOF_URI
      ));

    }
  }
}