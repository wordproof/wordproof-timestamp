<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\ChainHelper;
use WordProofTimestamp\includes\DomainHelper;
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
      new PostWidgetController();
      new AdminBarController();

      new NotificationHelper();
      new ChainHelper();
    }
  }

  public function updateSetting()
  {
    check_ajax_referer('wordproof', 'security');
    $key = $_REQUEST['key'];
    $value = $_REQUEST['value'];
    if (!empty($key) && !empty($value)) {
      OptionsHelper::set($key, $value);
    }
  }

  public function loadAdminAssets($hookSuffix)
  {
    global $post;

    wp_enqueue_style('wordproof.admin.css', WORDPROOF_URI_CSS . '/admin.css', array(), filemtime(WORDPROOF_DIR_CSS . '/admin.css'));
    wp_enqueue_script('wordproof.admin.js', WORDPROOF_URI_JS . '/admin.js', array(), filemtime(WORDPROOF_DIR_JS . '/admin.js'), true);

    wp_enqueue_script('wordproof.adminbar.js', WORDPROOF_URI_JS . '/adminbar.js', array(), filemtime(WORDPROOF_DIR_JS . '/adminbar.js'), true);

    switch ($hookSuffix) {
      case 'index.php':
        wp_localize_script('wordproof.admin.js', 'wordproofDashboard', [
          'timestampCount' => AnalyticsHelper::getTimestampCount(),
          'isActive' => (AnalyticsHelper::walletIsConnected() || OptionsHelper::isWSFYActive()),
          'isWSFYActive' => OptionsHelper::isWSFYActive(),
          'unprotectedAmount' => DashboardWidgetController::getTotalUnprotectedCount(),
          'unprotectedMessage' => DashboardWidgetController::getUnprotectedWarning(),
          'balance' => OptionsHelper::getBalanceCache(),
          'recentUnstampedPosts' => DashboardWidgetController::getRecentPosts('post'),
          'recentUnstampedPages' => DashboardWidgetController::getRecentPosts('page'),
          'recentUnstampeditems' => DashboardWidgetController::getRecentPosts(['post', 'page']),
          'recentStampedItems' => DashboardWidgetController::getRecentPosts(['post', 'page'], 'EXISTS'),
        ]);
        break;
      case 'post-new.php':
      case 'post.php':
        wp_localize_script('wordproof.admin.js', 'wordproofPost', [
          'isActive' => (AnalyticsHelper::walletIsConnected() || OptionsHelper::isWSFYActive()),
          'isWSFYActive' => OptionsHelper::isWSFYActive(),
          'postId' => (!empty($post->ID)) ? $post->ID : false,
          'permalink' => (!empty($post->ID)) ? get_permalink($post->ID) : '',
          'balance' => OptionsHelper::getBalanceCache(),
          'unprotectedAmount' => DashboardWidgetController::getTotalUnprotectedCount(),
          'isTimestamped' => PostWidgetController::isTimestamped(),
        ]);
        break;
      case 'toplevel_page_wordproof-dashboard':
      case 'wordproof_page_wordproof-settings':
      case 'wordproof_page_wordproof-upgrade':
      case 'wordproof_page_wordproof-support':
      case 'wordproof_page_wordproof-bulk':
        $wsfy = OptionsHelper::getWSFY();

        wp_enqueue_script('wordproof.settings.admin.js', WORDPROOF_URI_JS . '/settings.js', array(), filemtime(WORDPROOF_DIR_JS . '/settings.js'), true);
        wp_enqueue_style('wordproof.settings.admin.css', WORDPROOF_URI_CSS . '/settings.css', array(), filemtime(WORDPROOF_DIR_CSS . '/settings.css'));

        wp_localize_script('wordproof.settings.admin.js', 'wordproofSettings', [
          'certificateText' => OptionsHelper::getCertificateText(),
          'certificateDOMSelector' => OptionsHelper::getCertificateDomSelector(),
          'customDomain' => OptionsHelper::getCustomDomain(),
          'showInfoLink' => OptionsHelper::getShowInfoLink(),
          'hidePostColumn' => OptionsHelper::getHidePostColumn(),
          'walletIsConnected' => AnalyticsHelper::walletIsConnected(),
          'isWSFYActive' => OptionsHelper::isWSFYActive(),
          'wsfy' => $wsfy,
          'registeredPostTypes' => get_post_types(['public' => true]),
          'saveChanges' => 'Save Changes',
          'balance' => OptionsHelper::getBalanceCache(),
          'urls' => [
            'wizard' => admin_url('admin.php?page=wordproof-wizard'),
            'wizardConnect' => admin_url('admin.php?page=wordproof-wizard#connect'),
            'settings' => admin_url('admin.php?page=wordproof-settings'),
            'dashboard' => admin_url('admin.php?page=wordproof-dashboard'),
            'bulk' => admin_url('admin.php?page=wordproof-bulk'),
            'upgrade' => admin_url('admin.php?page=wordproof-upgrade'),
            'upgradeExternal' => 'https://my.wordproof.io/sites/upgrade',
            'support' => admin_url('admin.php?page=wordproof-support'),
            'pluginDir' => WORDPROOF_URI,
          ],
          'ajax' => [
            'url' => admin_url('admin-post.php'),
            'security' => wp_create_nonce('wordproof'),
          ],
          'bulk' => [
            'counts' => [
              'post' => wp_list_pluck(DashboardWidgetController::getRecentPosts('post', 'NOT EXISTS', 1000, true), 'ID'),
              'page' => wp_list_pluck(DashboardWidgetController::getRecentPosts('page', 'NOT EXISTS', 1000, true), 'ID'),
              'attachment' => wp_list_pluck(DashboardWidgetController::getRecentPosts('attachment', 'NOT EXISTS', 1000, true), 'ID'),
            ]
          ]
        ]);
        break;
      default:
        break;
    }

    wp_localize_script('wordproof.admin.js', 'wordproofData', array(
      'ajaxURL' => admin_url('admin-ajax.php'),
      'ajaxSecurity' => wp_create_nonce('wordproof'),
      'permalink' => (!empty($post->ID)) ? DomainHelper::getPermalink($post->ID) : false,
      'network' => OptionsHelper::getNetwork(),
      'urls' => [
        'dashboard' => admin_url('admin.php?page=wordproof-dashboard'),
        'bulk' => admin_url('admin.php?page=wordproof-bulk'),
        'wizard' => admin_url('admin.php?page=wordproof-wizard'),
        'wizardConnect' => admin_url('admin.php?page=wordproof-wizard#connect'),
        'site' => get_site_url(),
        'ajax' => admin_url('admin-ajax.php'),
        'upgradeExternal' => 'https://my.wordproof.io/sites/upgrade',
      ],
      'images' => [
        'loading' => admin_url() . 'images/spinner-2x.gif'
      ]
    ));

    wp_localize_script('wordproof.adminbar.js', 'wordproofBarData', array(
      'ajaxURL' => admin_url('admin-ajax.php'),
      'ajaxSecurity' => wp_create_nonce('wordproof'),
    ));
  }
}
