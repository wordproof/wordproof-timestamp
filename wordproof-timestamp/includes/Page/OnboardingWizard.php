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
      wp_localize_script('wordproof.wizard.js', 'wordproof', [
        'pluginDirUrl' => WORDPROOF_URI,
        'wsfyApiUri' => WORDPROOF_WSFY_API_URI,
        'wsfyValidateTokenEndpoint' => WORDPROOF_WSFY_ENDPOINT_TOKEN_VALIDATE,
      ]);

        ?>
        <div id="wordproof-onboarding-wizard"></div>

      <?php
    }
}
