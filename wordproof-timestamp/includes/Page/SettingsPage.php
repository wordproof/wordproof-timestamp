<?php

namespace WordProofTimestampFree\includes\Page;

use WordProofTimestampFree\includes\CertificateHelper;

/**
 * Class SettingsPage
 * @package WordProofTimestampFree\includes\Page
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
        register_setting( 'wordproof-options', 'wordproof_certificate_text' );
    }

    public function addSettingsPage() {
        add_menu_page(
            'WordProof',
            'WordProof',
            'manage_options',
            'wordproof',
            array($this, 'generateSettingsPage'),
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwcHgiIGhlaWdodD0iNTAwcHgiIHZpZXdCb3g9IjAgMCA1MDAgNTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPgogPHBhdGggaWQ9InBhdGgiIGQ9Ik00MjAuNCAxMTkgTDM1My43IDM5MS4zIDI4Ni42IDM5MS4zIDI0Ny4yIDI0OS43IDMwMC45IDI0OS43IDMxOS43IDMxMy43IDM2MS40IDExOSBaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgogPHBhdGggaWQ9InBhdGgtMSIgZD0iTTIyOC4zIDExOSBMMTc0LjMgMzEzLjcgMTMyLjcgMTE5IDczLjcgMTE5IDE0MC40IDM5MS4zIDIwNy4xIDM5MS4zIDI4MC42IDExOSBaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8L3N2Zz4='
            );
    }

    public function generateSettingsPage() {
        wp_localize_script('wordproof.admin.js', 'wordproofSettings', [
            'network' => get_option('wordproof_network', 'eos_main'),
            'storeContent' => get_option('wordproof_store_content', false),
            'storeRam' => get_option('wordproof_store_ram', false),
            'certificateText' => CertificateHelper::getCertificateText(),
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
