<?php

namespace WordProofTimestamp\includes\Page;

use WordProofTimestamp\includes\OptionsHelper;

/**
 * Class SettingsPage
 * @package WordProofTimestamp\includes\Page
 */
class SettingsPage
{

    private $settingPages = [
        'dashboard' => 'Overview',
        'timestamps' => 'Timestamps',
        'bulk' => 'Bulk',
        'settings' => 'Settings',
        'support' => 'Support',
    ];

    public function __construct()
    {
        add_action('admin_menu', array($this, 'addSettingsPage'));
        add_action('admin_post_wordproof_form_action', array($this, 'saveSettings'));
    }

    public function addSettingsPage()
    {
        add_menu_page(
            'WordProof Dashboard',
            'WordProof',
            'manage_options',
            'wordproof-dashboard',
            null,
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwcHgiIGhlaWdodD0iNTAwcHgiIHZpZXdCb3g9IjAgMCA1MDAgNTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPgogPHBhdGggaWQ9InBhdGgiIGQ9Ik00MjAuNCAxMTkgTDM1My43IDM5MS4zIDI4Ni42IDM5MS4zIDI0Ny4yIDI0OS43IDMwMC45IDI0OS43IDMxOS43IDMxMy43IDM2MS40IDExOSBaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgogPHBhdGggaWQ9InBhdGgtMSIgZD0iTTIyOC4zIDExOSBMMTc0LjMgMzEzLjcgMTMyLjcgMTE5IDczLjcgMTE5IDE0MC40IDM5MS4zIDIwNy4xIDM5MS4zIDI4MC42IDExOSBaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8L3N2Zz4='
        );

        foreach ($this->settingPages as $slug => $name) {
            add_submenu_page(
                'wordproof-dashboard',
                $name,
                $name,
                'manage_options',
                'wordproof-' . $slug,
                [$this, 'generateSettingsPage_' . $slug]
            );
        }
    }

    public function generateSettingsPage_dashboard()
    {
        $this->renderSettingPage('dashboard');
    }

    public function generateSettingsPage_settings()
    {
        $this->renderSettingPage('settings');
    }

    public function generateSettingsPage_support()
    {
        $this->renderSettingPage('support');
    }

    public function generateSettingsPage_bulk()
    {
        $this->renderSettingPage('bulk');
    }

    public function generateSettingsPage_upgrade()
    {
        $this->renderSettingPage('upgrade');
    }

    public function generateSettingsPage_timestamps()
    {
        $this->renderSettingPage('timestamps');
    }

    public function renderSettingPage($slug)
    {
        ?>
        <div class="wrap">
            <h1></h1>

            <div class='wordproof-admin-app'>
                <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="post"
                      id="wordproof_admin_form">
                    <input type="hidden" name="action" value="wordproof_form_action">
                    <input type="hidden" name="slug" value="<?php echo esc_attr($slug); ?>">
                    <input type="hidden" name="wordproof_admin_form_nonce"
                           value="<?php echo esc_attr(wp_create_nonce('wordproof_admin_form_nonce')); ?>"/>
                    <div id="wordproof-admin-app-<?php echo esc_attr($slug); ?>"></div>
                </form>
            </div>
        </div>
        <?php
    }

    public function saveSettings()
    {
        // These keys and values get properly sanitized in the OptionsHelper::set function.
        // phpcs:disable

        $options = OptionsHelper::$options;

        if (isset($_POST['wordproof_admin_form_nonce']) && wp_verify_nonce(wp_unslash($_POST['wordproof_admin_form_nonce']), 'wordproof_admin_form_nonce')) {

            if (isset($_POST['wordproof_settings']) && is_array($_POST['wordproof_settings'])) {

                foreach($_POST['wordproof_settings'] as $key => $value) {

                    if ($value !== null) {
	                    OptionsHelper::set($key, $value);
                    }

                }
            }

        }
        // phpcs:enable

        wp_safe_redirect('admin.php?page=wordproof-settings');
        exit();
    }
}
