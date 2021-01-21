<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\ChainHelper;
use WordProofTimestamp\includes\DebugLogHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\Page\GettingStarted;
use WordProofTimestamp\includes\Page\OnboardingWizard;
use WordProofTimestamp\includes\Page\SettingsPage;
use WordProofTimestamp\includes\UpdateHelper;
use WordProofTimestamp\includes\Controller\DebugInformationController;


class AdminController {

	public function __construct() {
		if ( is_admin() ) {

			new UpdateHelper();

			add_action( 'admin_post_wordproof_update_setting', [ $this, 'updateSetting' ] );
			add_action( 'admin_post_wordproof_update_settings', [ $this, 'updateSettings' ] );
			add_action( 'admin_enqueue_scripts', [ $this, 'loadAdminAssets' ] );

			//Admin Pages
			new SettingsPage();
			new OnboardingWizard();
			new GettingStarted();
			new DebugInformationController();

			new PostColumnController();
			new PostFilterController();
			new DashboardWidgetController();
			new PostWidgetController();
			new AdminBarController();

			new NoticeController();
			new ChainHelper();
		}
	}

	// These keys and values get properly sanitized in the OptionsHelper::set function.
	// phpcs:disable
	public function updateSetting() {
		check_ajax_referer( 'wordproof', 'security' );

		if ( ! isset( $_REQUEST ) ) {
			return;
		}

		if ( isset( $_REQUEST['key'] ) ) {
			$key = sanitize_key( $_REQUEST['key'] );
		}

		if ( isset( $_REQUEST['value'] ) ) {
			$value = $_REQUEST['value'];
		}

		if ( ! empty( $key ) && ! empty( $value ) ) {
			OptionsHelper::set( $key, $value );
		}
	}

	public function updateSettings() {
		check_ajax_referer( 'wordproof', 'security' );

		if ( isset( $_REQUEST['options'] ) ) {
			$options = $_REQUEST['options'];
		}

		if ( ! empty( $options ) && is_array( $options ) ) {
			foreach ( $options as $key => $value ) {
				OptionsHelper::set( $key, $value );
			}
		}
	}

	// phpcs:enable

	public function loadAdminAssets( $hookSuffix ) {
		global $post;

		$assetVersion = ( isset( $_ENV['app_env'] ) && $_ENV['app_env'] === 'local' ) ? null : WORDPROOF_VERSION;

		wp_enqueue_style( 'wordproof.admin.css', WORDPROOF_URI_CSS . '/admin.css', array(), $assetVersion );
		wp_enqueue_script( 'wordproof.admin.js', WORDPROOF_URI_JS . '/admin.js', array(), $assetVersion, true );
		wp_enqueue_script( 'wordproof.adminbar.js', WORDPROOF_URI_JS . '/adminbar.js', array(), $assetVersion, true );

		switch ( $hookSuffix ) {
			case 'index.php':
				wp_localize_script( 'wordproof.admin.js', 'wordproofDashboard', [
					'timestampCount'       => AnalyticsHelper::getTimestampCount(),
					'isActive'             => ( AnalyticsHelper::walletIsConnected() || OptionsHelper::isWSFYActive() ),
					'isWSFYActive'         => OptionsHelper::isWSFYActive(),
					'unprotectedAmount'    => DashboardWidgetController::getTotalUnprotectedCount(),
					'unprotectedMessage'   => DashboardWidgetController::getUnprotectedWarning(),
					'balance'              => OptionsHelper::getBalanceCache(),
					'recentUnstampedPosts' => DashboardWidgetController::getRecentPosts( 'post' ),
					'recentUnstampedPages' => DashboardWidgetController::getRecentPosts( 'page' ),
					'recentUnstampeditems' => DashboardWidgetController::getRecentPosts( [ 'post', 'page' ] ),
					'recentStampedItems'   => DashboardWidgetController::getRecentPosts( [ 'post', 'page' ], 'EXISTS',
						3, false, true ),
				] );
				break;
			case 'post-new.php':
			case 'post.php':
				wp_localize_script( 'wordproof.admin.js', 'wordproofPost', [
					'isActive'          => ( AnalyticsHelper::walletIsConnected() || OptionsHelper::isWSFYActive() ),
					'isWSFYActive'      => OptionsHelper::isWSFYActive(),
					'postId'            => ( ! empty( $post->ID ) ) ? $post->ID : false,
					'permalink'         => ( ! empty( $post->ID ) ) ? get_permalink( $post->ID ) : '',
					'balance'           => OptionsHelper::getBalanceCache(),
					'unprotectedAmount' => DashboardWidgetController::getTotalUnprotectedCount(),
					'isTimestamped'     => PostWidgetController::isTimestamped(),
					'autoStamped'       => PostWidgetController::willBeAutoStamped(),
				] );
				break;
			case 'toplevel_page_wordproof-dashboard':
			case 'wordproof_page_wordproof-settings':
			case 'wordproof_page_wordproof-upgrade':
			case 'wordproof_page_wordproof-support':
			case 'wordproof_page_wordproof-bulk':
			case 'wordproof_page_wordproof-timestamps':
				wp_enqueue_script( 'wordproof.settings.admin.js', WORDPROOF_URI_JS . '/settings.js', array(),
					$assetVersion, true );
				wp_enqueue_style( 'wordproof.settings.admin.css', WORDPROOF_URI_CSS . '/settings.css', array(),
					$assetVersion );

				wp_localize_script( 'wordproof.settings.admin.js', 'wordproofSettings', [
					'options'                 => OptionsHelper::all(),
					'certificateText'         => OptionsHelper::get( 'certificate_text' ),
					'certificateDOMSelector'  => OptionsHelper::getCertificateDomSelector(),
					'customDomain'            => OptionsHelper::getCustomDomain(),
					'showInfoLink'            => OptionsHelper::getShowInfoLink(),
					'hidePostColumn'          => OptionsHelper::getHidePostColumn(),
					'walletIsConnected'       => AnalyticsHelper::walletIsConnected(),
					'isWSFYActive'            => OptionsHelper::isWSFYActive(),
					'sendTimestampsWithOrder' => OptionsHelper::getSendTimestampsWithOrder(),
					'timestampsOrderText'     => OptionsHelper::getTimestampOrderText(),
					'wsfy'                    => OptionsHelper::getWSFY(),
					'recentlyStampedItems'    => DashboardWidgetController::getRecentlyStampedItems(),
					'registeredPostTypes'     => get_post_types( [ 'public' => true ] ),
					'saveChanges'             => 'Save Changes',
					'balance'                 => OptionsHelper::getBalanceCache(),
					'urls'                    => [
						'wizard'          => admin_url( 'admin.php?page=wordproof-wizard' ),
						'wizardConnect'   => admin_url( 'admin.php?page=wordproof-wizard#connect' ),
						'settings'        => admin_url( 'admin.php?page=wordproof-settings' ),
						'dashboard'       => admin_url( 'admin.php?page=wordproof-dashboard' ),
						'bulk'            => admin_url( 'admin.php?page=wordproof-bulk' ),
						'timestamps'      => admin_url( 'admin.php?page=wordproof-timestamps' ),
						'upgrade'         => admin_url( 'admin.php?page=wordproof-upgrade' ),
						'upgradeExternal' => WORDPROOF_MY_URI . 'sites/upgrade',
						'support'         => admin_url( 'admin.php?page=wordproof-support' ),
						'pluginDir'       => WORDPROOF_URI,
					],
					'ajax'                    => [
						'url'      => admin_url( 'admin-post.php' ),
						'security' => wp_create_nonce( 'wordproof' ),
					],
					'debugging'               => [
						'log'           => DebugLogHelper::getContents(),
						'siteHealthUrl' => admin_url( 'site-health.php?tab=debug' ),
					]
				] );
				break;
			default:
				break;

		}

		wp_localize_script( 'wordproof.admin.js', 'wordproofData', array(
			'ajaxURL'      => admin_url( 'admin-ajax.php' ),
			'ajaxSecurity' => wp_create_nonce( 'wordproof' ),
			'permalink'    => ( ! empty( $post->ID ) ) ? DomainHelper::getPermalink( $post->ID ) : false,
			'network'      => OptionsHelper::get( 'network' ),
			'balance'      => OptionsHelper::getBalanceCache(),
			'urls'         => [
				'dashboard'       => admin_url( 'admin.php?page=wordproof-dashboard' ),
				'bulk'            => admin_url( 'admin.php?page=wordproof-bulk' ),
				'settings'        => admin_url( 'admin.php?page=wordproof-settings' ),
				'wizard'          => admin_url( 'admin.php?page=wordproof-wizard' ),
				'wizardConnect'   => admin_url( 'admin.php?page=wordproof-wizard#connect' ),
				'postOverview'    => admin_url( 'edit.php' ),
				'pagesOverview'   => admin_url( 'edit.php?post_type=page' ),
				'site'            => get_site_url(),
				'ajax'            => admin_url( 'admin-ajax.php' ),
				'upgradeExternal' => WORDPROOF_MY_URI . 'sites/upgrade',
			],
			'images'       => [
				'wordpress' => WORDPROOF_URI_IMAGES . '/wordpress-logo.png',
				'loading'   => admin_url() . 'images/spinner-2x.gif'
			]
		) );

		wp_localize_script( 'wordproof.adminbar.js', 'wordproofBarData', array(
			'ajaxURL'      => admin_url( 'admin-ajax.php' ),
			'ajaxSecurity' => wp_create_nonce( 'wordproof' ),
		) );

	}


}
