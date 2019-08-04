<?php

namespace WordProofTimestamp\includes\Page;

/**
 * Class AutoStampPage
 * @package WordProofTimestamp\includes\Page
 */
class AutoStampPage {

    public function __construct() {
        add_action('admin_menu', array($this, 'addSettingsPage'));
	    add_action('admin_post_wordproof_form_action', array($this, 'saveSettings'));
    }

    public function addSettingsPage() {
      add_submenu_page(
        'wordproof',
        'Auto Posts Stamper',
        'Auto Stamp',
        'manage_options',
        'wordproof-licensing',
        array($this, 'generateSettingsPage')
      );
    }

    public function generateSettingsPage() {
        $args = [
            'post_status' => 'publish',
            'post_type' => 'post',
            'numberposts' => -1,
            'meta_query' => array(
            array(
                'key' => 'wordproof_timestamp_data',
                'compare' => 'NOT EXISTS'
            ),
            )
        ];
        $posts = get_posts($args);

        wp_localize_script('wordproof.admin.js', 'wordproofAutoStamp', [
            'posts' => $posts,
            'loading' => admin_url() . 'images/spinner-2x.gif'
        ]);

        ?>
        <div class="wrap">
            <h1>WordProof Settings</h1>
            <p>Start auto-stamping <?php echo sizeof($posts); ?> posts which are not timestamped yet. We will skip posts that are stamped already. <strong>Please make sure your setup works beforehand.</strong></p>
            <button class="wordproof-auto-stamp-submit button button-primary">Start Auto-Stamping</button>
            <div class="wordproof-status"></div>
            <p class="wordproof-status-left"></p>
            <ul class="wordproof-status-list">

            </ul>
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

        if (isset($_POST['wordproof_certificate_text'])) {
          $value = sanitize_text_field($_POST['wordproof_certificate_text']);
          update_option('wordproof_certificate_text', $value);
        }

        if (isset($_POST['wordproof_certificate_dom_selector'])) {
          $value = sanitize_text_field($_POST['wordproof_certificate_dom_selector']);
          update_option('wordproof_certificate_dom_selector', $value);
        }

        if (isset($_POST['wsfy_settings'])) {
          $post = $_POST['wsfy_settings'];
          $accessToken = sanitize_text_field($post['access_token']);
          $siteId = sanitize_text_field($post['site_id']);
          $revisions = isset($post['no_revisions']) ? true : false;

          if (empty($accessToken) || empty($siteId)) {
            $options = ['accessToken' => $accessToken, 'siteId' => $siteId, 'active' => false, 'noRevisions' => $revisions];
          } else {
            $options = ['accessToken' => $accessToken, 'siteId' => $siteId, 'active' => true, 'noRevisions' => $revisions];
          }
          update_option('wordproof_wsfy', $options);
        }

      }
      wp_redirect(admin_url('admin.php?page=wordproof'));
      die();
    }
}
