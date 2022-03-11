<?php

namespace WordProofTimestamp\Core;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\Controller\AdminController;
use WordProofTimestamp\includes\Controller\AutomaticHooksController;
use WordProofTimestamp\includes\Controller\CertificateController;
use WordProofTimestamp\includes\Controller\ECommerceController;
use WordProofTimestamp\includes\Controller\WebhookController;
use WordProofTimestamp\includes\Controller\TimestampController;

use \WP_Error as WP_Error;

/**
 * Initialize plugin
 */
function init() {
	add_action('plugins_loaded', __NAMESPACE__ . "\\setup");
	add_action('activated_plugin', __NAMESPACE__ . "\\activate");
	add_action('init', __NAMESPACE__ . "\\onInit");
	do_action( 'wordproof_scaffold_init' );
	add_action('in_plugin_update_message-' . WORDPROOF_BASENAME, __NAMESPACE__ . '\\displayUpgradeNotification', 10, 2);
}

/**
 * Default setup
 *
 * @return void
 */
function onInit() {
	$postTypes = ['post', 'page'];

	foreach ($postTypes as $postType) {
		register_post_meta( $postType, '_wordproof_hide_certificate', [
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'boolean',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		] );
	}
}

function setup() {

    new WebhookController();

    new AdminController();
    new AnalyticsHelper();
    new TimestampController();
    new CertificateController();

    new AutomaticHooksController();
    new ECommerceController();

	do_action( 'wordproof_scaffold_loaded' );
}

/**
 * Activate the plugin
 *
 * @return void
 */
function activate($plugin) {

	if ( isset($_REQUEST['_wpnonce']) ) {

		$nonce = sanitize_key( $_REQUEST['_wpnonce'] );

		if ( wp_verify_nonce( $nonce , 'bulk-plugins' ) || wp_verify_nonce( $nonce , 'activate-plugin_' . WORDPROOF_BASENAME ) ) {

			if ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {

				$options = get_option( 'wpseo', [] );

				if ( is_array( $options ) && isset( $options['wordproof_integration_active'] ) && $options['wordproof_integration_active'] === true ) {
					flush_rewrite_rules();
					wp_safe_redirect( wp_nonce_url( admin_url( 'plugins.php' ), 'wordproof_notice', 'wordproof_nonce' ) );
					exit();
				}
			}
		}

		if ( wp_verify_nonce( $nonce , 'activate-plugin_' . WORDPROOF_BASENAME ) ) {

			if ($plugin === WORDPROOF_BASENAME) {
				flush_rewrite_rules();
				wp_safe_redirect(admin_url('admin.php?page=wordproof-getting-started'));
				exit();
			}

		}
	}
}

/**
 * Deactivate the plugin
 *
 * @return void
 */
function deactivate() {

}

/**
 * Display a upgrade notifications on plugins.php according to line in readme.
 *
 * @param $currentPluginMetadata
 * @param $newPluginMetadata
 */
function displayUpgradeNotification( $currentPluginMetadata, $newPluginMetadata ) {
	if ( isset( $newPluginMetadata->upgrade_notice ) && strlen( trim( $newPluginMetadata->upgrade_notice ) ) > 0 ) {
		echo '<p style="background-color: #d54e21; padding: 10px; color: #f9f9f9; margin-top: 10px"><strong>Important Upgrade Notice:</strong> ';
		echo esc_html( $newPluginMetadata->upgrade_notice ), '</p>';
	}
}
