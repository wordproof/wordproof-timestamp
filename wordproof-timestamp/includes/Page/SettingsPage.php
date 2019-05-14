<?php

namespace WordProof\includes\Page;

use WordProof\includes\CertificateHelper;

/**
 * Class SettingsPage
 * @package WordProof\includes\Page
 */
class SettingsPage {

    public function __construct() {
        add_action('admin_menu', array($this, 'addSettingsPage'));
	    add_action('admin_init', array($this, 'registerSettings'));
    }

    public function registerSettings() {
        register_setting( 'wordproof-options', 'wordproof_network' );
        register_setting( 'wordproof-options', 'wordproof_store_content' );
        register_setting( 'wordproof-options', 'wordproof_store_ram' );
        register_setting( 'wordproof-options', 'wordproof_certificate_template' );
    }

    public function addSettingsPage() {
        add_menu_page(
            'WordProof',
            'WordProof',
            'manage_options',
            'wordproof',
            array($this, 'generateSettingsPage'),
            'dashicons-admin-network'
        );
    }

    public function generateSettingsPage() {
        wp_localize_script('wordproof.admin.js', 'wordproofSettings', [
            'network' => get_option('wordproof_network', 'eos_main'),
            'storeContent' => get_option('wordproof_store_content', false),
            'storeRam' => get_option('wordproof_store_ram', false),
            'certificateTemplate' => CertificateHelper::getCertificateTemplate(),
            'saveChanges' => __('Save Changes')
        ]);

        ?>
        <div class="wrap">
            <h1>WordProof Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields( 'wordproof-options' ); ?>
                <?php do_settings_sections( 'wordproof-options' ); ?>
                <div id="wordproof-admin-app"></div>
            </form>
        </div>
        <?php
    }
}
