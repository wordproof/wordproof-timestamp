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
      'wordproof-dashboard',
      'WordProof Wizard',
      'Wizard',
      'manage_options',
      'wordproof-wizard',
      array($this, 'generateSettingsPage'),
      3
    );
  }

    public function generateSettingsPage() {
      wp_enqueue_style('wordproof.wizard.css', WORDPROOF_URI_CSS . '/wizard.css', array(), filemtime(WORDPROOF_DIR_CSS . '/wizard.css'));
      wp_enqueue_script('wordproof.wizard.js', WORDPROOF_URI_JS . '/wizard.js', array(), filemtime(WORDPROOF_DIR_JS . '/wizard.js'), true);

      $currentValues = array_merge(
        ['certificate_text' => OptionsHelper::getCertificateText(), 'isWSFYActive' => OptionsHelper::isWSFYActive()],
        (array)OptionsHelper::getWSFY(),
        (array)OptionsHelper::getOAuth([])
      );

      wp_localize_script('wordproof.wizard.js', 'wordproof', [
        'urls' => [
          'dashboard' => admin_url('admin.php?page=wordproof-dashboard'),
          'settings' => admin_url('admin.php?page=wordproof-settings'),
          'api' => WORDPROOF_WSFY_API_URI,
          'images' => WORDPROOF_URI_IMAGES,
          'signup' => 'https://my.wordproof.io/signup?plan=free&url=' . get_site_url(),
          'site' => get_site_url(),
        ],
        'ajax' => [
            'url' => admin_url('admin-post.php'),
            'security' => wp_create_nonce('wordproof'),
        ],
        'wsfyValidateTokenEndpoint' => WORDPROOF_WSFY_ENDPOINT_TOKEN_VALIDATE,
        'currentValues' => $currentValues,
        'registeredPostTypes' => array_values(get_post_types(['public' => true])),
      ]);

        ?>
        <div id="wordproof-onboarding-wizard"></div>

      <?php
    }
}
