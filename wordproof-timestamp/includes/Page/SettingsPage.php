<?php

namespace WordProofTimestamp\includes\Page;

use WordProofTimestamp\includes\Controller\CertificateController;
use WordProofTimestamp\includes\OptionsHelper;

/**
 * Class SettingsPage
 * @package WordProofTimestamp\includes\Page
 */
class SettingsPage {

    public function __construct() {
        add_action('admin_menu', array($this, 'addSettingsPage'));
	    add_action('admin_post_wordproof_form_action', array($this, 'saveSettings'));
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
        $wsfy = OptionsHelper::getWSFY();
        $wsfyActive = isset($wsfy->is_active) ? $wsfy->is_active : false;

        wp_localize_script('wordproof.admin.js', 'wordproofSettings', [
            'adminUrl' => admin_url(),
            'network' => OptionsHelper::getNetwork(),
            'certificateText' => OptionsHelper::getCertificateText(),
            'certificateDOMSelector' => OptionsHelper::getCertificateDomSelector(),
            'hidePostColumn' => OptionsHelper::getHidePostColumn(),
            'wsfy' => $wsfy,
            'registeredPostTypes' => get_post_types(['public' => true]),
            'saveChanges' => 'Save Changes'
        ]);

        ?>
        <div class="wrap">
            <h1>WordProof Settings</h1>

            <?php if ($wsfyActive): ?>
                <div class="notice notice-info"><p>WordProof Timestamp 'We Stamp For You' is active. This overwrites some of your local WordProof Timestamp settings.</p></div>
            <?php endif; ?>

            <form action="<?php echo esc_url( admin_url('admin-post.php')); ?>" method="post" id="wordproof_admin_form" >
                <input type="hidden" name="action" value="wordproof_form_action">
                <input type="hidden" name="wordproof_admin_form_nonce" value="<?php echo wp_create_nonce('wordproof_admin_form_nonce'); ?>" />
                <div id="wordproof-admin-app"></div>
            </form>
        </div>
        <?php
    }

    public function saveSettings()
    {
      if (isset($_POST['wordproof_admin_form_nonce']) && wp_verify_nonce($_POST['wordproof_admin_form_nonce'], 'wordproof_admin_form_nonce')) {

          if (isset($_POST['wordproof_network'])) {
          $value = sanitize_text_field($_POST['wordproof_network']);
          update_option('wordproof_network', $value);
        }

        /**
         * Customize settings
         */
        if (isset($_POST['wordproof_customize'])) {

          if (isset($_POST['wordproof_customize']['hide_post_column'])) {
            update_option('wordproof_hide_post_column', true);
          } else {
            update_option('wordproof_hide_post_column', false);
          }

          if (isset($_POST['wordproof_customize']['certificate_dom_selector'])) {
            $value = sanitize_text_field($_POST['wordproof_customize']['certificate_dom_selector']);
            update_option('wordproof_certificate_dom_selector', $value);
          }

          if (isset($_POST['wordproof_customize']['certificate_text'])) {
            $value = sanitize_text_field($_POST['wordproof_customize']['certificate_text']);
            update_option('wordproof_certificate_text', $value);
          }

        }

        /**
         * WSFY settings
         */
        if (isset($_POST['wsfy_settings'])) {

          $post = $_POST['wsfy_settings'];
          $accessToken = sanitize_text_field($post['access_token']);
          $siteId = sanitize_text_field($post['site_id']);
          $revisions = isset($post['no_revisions']) ? true : false;
          $allowedPostTypes = isset($post['allowed_post_types']) ? array_map('sanitize_text_field', array_values($post['allowed_post_types'])) : [];

          $options = ['accessToken' => $accessToken, 'siteId' => $siteId, 'active' => null, 'noRevisions' => $revisions, 'allowedPostTypes' => $allowedPostTypes];
          if (empty($accessToken) || empty($siteId)) {
              $options['active'] = false;
          } else {
            $options['active'] = true;
          }

          update_option('wordproof_wsfy', $options);
        }

      }
      wp_redirect(admin_url('admin.php?page=wordproof'));
      die();
    }
}
