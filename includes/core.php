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
	do_action( 'wordproof_scaffold_init' );
}

/**
 * Default setup
 *
 * @return void
 */
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
 * Uninstall routines should be in uninstall.php
 *
 * @return void
 */
function deactivate() {

}