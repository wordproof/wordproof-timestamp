<?php

namespace WordProofTimestamp\includes\Page;

use WordProofTimestamp\includes\Controller\CertificateController;

/**
 * Class SettingsPage
 * @package WordProofTimestamp\includes\Page
 */
class OnboardingWizard {

  public function __construct()
  {
    add_action('admin_menu', array($this, 'addSettingsPage'));
  }

  public function addSettingsPage()
  {
    add_submenu_page(
      null,
      'WordProof Onboarding Wizard',
      'Onboarding Wizard',
      'manage_options',
      'wordproof-onboarding-wizard',
      array($this, 'generateSettingsPage')
    );
  }

    public function generateSettingsPage() {
      wp_enqueue_style('wordproof.wizard.css', WORDPROOF_URI_CSS . '/wizard.css', array(), filemtime(WORDPROOF_DIR_CSS . '/wizard.css'));
      wp_enqueue_script('wordproof.wizard.js', WORDPROOF_URI_JS . '/wizard.js', array(), filemtime(WORDPROOF_DIR_JS . '/wizard.js'), true);
      wp_localize_script('wordproof.wizard.js', 'wordproofSettings', [
            'network' => get_option('wordproof_network', false),
            'adminUrl' => admin_url(),
            'certificateText' => CertificateController::getText(),
            'certificateDOMSelector' => get_option('wordproof_certificate_dom_selector', false),
            'hidePostColumn' => get_option('wordproof_hide_post_column', false),
            'registeredPostTypes' => get_post_types(['public' => true]),
            'saveChanges' => 'Save Changes'
        ]);

        ?>
        <div id="wordproof-onboarding-wizard"></div>

      <?php
    }
}
