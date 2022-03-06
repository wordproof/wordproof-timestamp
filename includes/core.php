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
    flush_rewrite_rules();

    if ( isset($_REQUEST['_wpnonce']) && wp_verify_nonce( sanitize_key( $_REQUEST['_wpnonce'] ), 'activate-plugin_' . WORDPROOF_BASENAME ) ) {

	    if ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {

		    $options = get_option( 'wpseo', [] );

		    if ( is_array( $options ) && isset( $options['wordproof_integration_active'] ) && $options['wordproof_integration_active'] === true ) {
			    wp_safe_redirect(wp_nonce_url(admin_url('plugins.php'), 'wordproof_notice' ,'wordproof_nonce'));
			    exit();
		    }
	    }

        if ($plugin === WORDPROOF_BASENAME && !isset($_GET['activate-multi'])) {
            wp_safe_redirect(admin_url('admin.php?page=wordproof-getting-started'));
            exit();
        }
    }

    return;
}

/**
 * Deactivate the plugin
 *
 * @return void
 */
function deactivate() {

}
