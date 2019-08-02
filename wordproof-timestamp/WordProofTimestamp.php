<?php

namespace WordProofTimestamp;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\ChainHelper;
use WordProofTimestamp\includes\Controller\AutomateController;
use WordProofTimestamp\includes\Controller\PostColumnController;
use WordProofTimestamp\includes\MetaBox;
use WordProofTimestamp\includes\NotificationHelper;
use WordProofTimestamp\includes\Page\SettingsPage;
use WordProofTimestamp\includes\AdminAjaxHelper;
use WordProofTimestamp\includes\Controller\CertificateController;
use WordProofTimestamp\includes\TimestampAjaxHelper;

/**
 * Class WordProofTimestamp
 * @package WordProofTimestamp
 */
class WordProofTimestamp
{

  /** @var null */
  private static $instance = null;

  public function init()
  {
    /**
     * Bootstrap
     */
    if (is_admin()) {
      new SettingsPage();
      new MetaBox();
      new NotificationHelper();
      new ChainHelper();
      new PostColumnController();
    }
    new AnalyticsHelper();
    new AdminAjaxHelper();
    new TimestampAjaxHelper();
    new CertificateController();

    new AutomateController();

    /**
     * Filters and Actions
     */
    add_action('admin_enqueue_scripts', array($this, 'loadAdminAssets'), 999);
  }

  public function loadAdminAssets()
  {
    //TODO: Only on necessary pages
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
      'pluginDirUrl' => plugin_dir_url(__FILE__)
    ));
  }

  /**
   * @return null|WordProof
   */
  public static function getInstance()
  {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }
}