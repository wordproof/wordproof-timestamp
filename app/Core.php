<?php

namespace WordProofTimestamp\App;

use WordProofTimestamp\App\Config\SdkAppConfig;
use WordProofTimestamp\App\Controllers\AdminPageController;
use WordProofTimestamp\App\Controllers\ActionController;
use WordProofTimestamp\App\Controllers\MigrationController;
use WordProofTimestamp\App\Controllers\NoticeController;
use WordProofTimestamp\App\Controllers\ScheduledActionController;
use WordProofTimestamp\App\Controllers\UpgradeNotificationController;
use WordProof\SDK\WordPressSDK;
use WordProof\SDK\Translations\DefaultTranslations;

class Core {

	/**
	 * Initialize the WordProof timestamp app
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'init' ] );
		add_action( 'plugins_loaded', [ $this, 'setup' ], - 10 );
		add_action( 'activated_plugin', [ $this, 'activate' ] );

		do_action( 'wordproof_scaffold_init' );
	}

	/**
	 * Initialize plugin
	 *
	 * @throws \Exception
	 */
	public function init() {
		$config       = new SdkAppConfig();
		$translations = new DefaultTranslations();

		WordPressSDK::getInstance( $config, $translations )
		            ->certificate()
		            ->timestampInPostEditor()
		            ->initialize();
	}

	/**
	 * Setup the controllers
	 */
	public function setup() {
		if ( ! is_admin() ) {
			return;
		}

		new ScheduledActionController();
		new NoticeController();
		new AdminPageController();
		new UpgradeNotificationController();
		new ActionController();
		new MigrationController();
	}

	/**
	 * Add logic on activation of this plugin.
	 */
	public function activate( $plugin ) {

		if ( $plugin !== WORDPROOF_BASENAME ) {
			return;
		}

		if ( ! isset( $_REQUEST['_wpnonce'] ) ) {
			return;
		}

		$nonce = sanitize_key( $_REQUEST['_wpnonce'] );

		if (wp_verify_nonce($nonce , 'activate-plugin_' . $plugin ) || wp_verify_nonce( $nonce, 'bulk-plugins' )) {

			if ( is_plugin_active( 'wordpress-seo/wp-seo' ) ) {

				$options = get_option( 'wpseo', [] );

				if ( is_array( $options ) && isset( $options['wordproof_integration_active'] ) && $options['wordproof_integration_active'] === true ) {
					flush_rewrite_rules();

					wp_safe_redirect( wp_nonce_url( admin_url( 'plugins' ), 'wordproof_yoast_notice', 'wordproof_nonce' ) );
					exit();
				}
			}

			flush_rewrite_rules();

			wp_safe_redirect( admin_url( 'admin.php?page=wordproof-about' ) );
			exit();

		}
	}
}


