<?php

namespace WordProofTimestamp\includes\Page;

use WordProofTimestamp\includes\OptionsHelper;

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
      'WordProof Wizard',
      'Onboarding Wizard',
      'manage_options',
      'wordproof-wizard',
      array($this, 'generateSettingsPage')
    );
  }

    public function generateSettingsPage() {
      wp_enqueue_style('wordproof.wizard.css', WORDPROOF_URI_CSS . '/wizard.css', array(), filemtime(WORDPROOF_DIR_CSS . '/wizard.css'));
      wp_enqueue_script('wordproof.wizard.js', WORDPROOF_URI_JS . '/wizard.js', array(), filemtime(WORDPROOF_DIR_JS . '/wizard.js'), true);
      wp_localize_script('wordproof.wizard.js', 'wordproof', [
        'closeWizard' => admin_url('admin.php?page=wordproof'),
        'imagesUri' => WORDPROOF_URI_IMAGES,
        'wsfyApiUri' => WORDPROOF_WSFY_API_URI,
        'wsfyValidateTokenEndpoint' => WORDPROOF_WSFY_ENDPOINT_TOKEN_VALIDATE,
        'currentValues' => [
            'certificateText' => OptionsHelper::getCertificateText(),
            'wsfy' => get_option('wordproof_wsfy')
        ]
      ]);

        ?>
        <div id="wordproof-onboarding-wizard"></div>

      <?php
    }
}
