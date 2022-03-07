<?php

namespace WordProofTimestamp\App;

use WordProofTimestamp\App\Config\SdkAppConfig;
use WordProofTimestamp\App\Vendor\WordProof\SDK\Translations\DefaultTranslations;
use WordProofTimestamp\App\Vendor\WordProof\SDK\WordPressSDK;

class Core {

	/**
	 * Initialize the WordProof timestamp app
	 */
	public function __construct() {
		add_action('activated_plugin', [$this, 'activate']);
		add_action('init', [$this, 'init']);

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
	 * Add logic on activation of this plugin.
	 */
	public function activate() {
		flush_rewrite_rules();

		if ( isset($_REQUEST['_wpnonce']) && wp_verify_nonce( sanitize_key( $_REQUEST['_wpnonce'] ), 'activate-plugin_' . WORDPROOF_BASENAME ) ) {

			if ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {

				$options = get_option( 'wpseo', [] );

				if ( is_array( $options ) && isset( $options['wordproof_integration_active'] ) && $options['wordproof_integration_active'] === true ) {
					wp_safe_redirect(wp_nonce_url(admin_url('plugins.php'), 'wordproof_notice' ,'wordproof_nonce'));
					exit();
				}
			}
		}
	}
}


