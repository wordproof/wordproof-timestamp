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
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxhYWdfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDUwMCA1MDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwMCA1MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMDBEMUIyO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KCS5zdDJ7b3BhY2l0eTowLjg7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHJlY3QgeD0iLTEiIHk9Ii0yIiBjbGFzcz0ic3QwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDA4LjIsMzUxLjZsLTEuMiwzLjJsLTguOCwyNC4ybC03LjktMTUuNmwyLjUtMS4zbDQuOSw5LjlsNi42LTE4LjRsMS4xLTMuMgoJQzQwNi42LDM1MC44LDQwNy40LDM1MS4yLDQwOC4yLDM1MS42eiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDE0LjUsMzU3LjJjLTEuNy0yLjMtMy44LTQuMi02LjItNS42Yy0wLjgtMC41LTEuNy0wLjktMi42LTEuMmMtMS4yLTAuNS0yLjUtMC44LTMuOC0xCgljLTUuMS0wLjktMTAuMiwwLjQtMTQuNCwzLjRjLTQuMiwzLTYuOSw3LjUtNy44LDEyLjZjLTAuOCw1LjEsMC40LDEwLjIsMy40LDE0LjRjMyw0LjIsNy41LDYuOSwxMi42LDcuOGMxLDAuMiwyLjEsMC4zLDMuMiwwLjMKCWM0LDAsNy45LTEuMywxMS4yLTMuN2M0LjItMyw3LTcuNSw3LjgtMTIuNkM0MTguNywzNjYuNSw0MTcuNSwzNjEuNCw0MTQuNSwzNTcuMnogTTQxNC41LDM3MWMtMC43LDQuMi0zLDcuOS02LjQsMTAuNAoJYy0zLjUsMi41LTcuNywzLjUtMTEuOSwyLjhjLTQuMi0wLjctNy45LTMtMTAuNC02LjRjLTIuNS0zLjQtMy41LTcuNy0yLjgtMTEuOWMwLjctNC4yLDMtNy45LDYuNC0xMC40YzIuOC0yLDYtMyw5LjMtMwoJYzAuOSwwLDEuNywwLjEsMi42LDAuMmMxLjEsMC4yLDIuMiwwLjUsMy4yLDAuOWMwLjksMC4zLDEuNywwLjcsMi41LDEuMmMxLjgsMS4xLDMuNCwyLjYsNC43LDQuMwoJQzQxNC4yLDM2Mi42LDQxNS4yLDM2Ni44LDQxNC41LDM3MXoiLz4KPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSI0MjAuNCwxMTkgMzUzLjcsMzkxLjMgMjg2LjYsMzkxLjMgMjQ3LjIsMjQ5LjcgMzAwLjksMjQ5LjcgMzE5LjcsMzEzLjcgMzYxLjQsMTE5ICIvPgo8cG9seWdvbiBjbGFzcz0ic3QyIiBwb2ludHM9IjIyOC4zLDExOSAxNzQuMywzMTMuNyAxMzIuNywxMTkgNzMuNywxMTkgMTQwLjQsMzkxLjMgMjA3LjEsMzkxLjMgMjgwLjYsMTE5ICIvPgo8L3N2Zz4K'
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
