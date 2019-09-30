<?php

namespace WordProofTimestamp\includes\Page;

use WordProofTimestamp\includes\Controller\CertificateController;

/**
 * Class SettingsPage
 * @package WordProofTimestamp\includes\Page
 */
class GettingStarted {

  public function __construct()
  {
    add_action('admin_menu', array($this, 'addSettingsPage'));
  }

  public function addSettingsPage()
  {
    add_submenu_page(
      null,
      'Auto Posts Stamper',
      'Auto Stamp',
      'manage_options',
      'wordproof-getting-started',
      array($this, 'generateSettingsPage')
    );
  }

    public function generateSettingsPage() {
      wp_enqueue_style('wordproof.getting-started.css', WORDPROOF_URI_CSS . '/getting-started.css', array(), filemtime(WORDPROOF_DIR_CSS . '/getting-started.css'));
      wp_enqueue_script('wordproof.getting-started.js', WORDPROOF_URI_JS . '/getting-started.js', array(), filemtime(WORDPROOF_DIR_JS . '/getting-started.js'), true);
      wp_localize_script('wordproof.getting-started.js', 'wordproof', [
        'imagesUri' => WORDPROOF_URI_IMAGES,
        'wizardUrl' => admin_url('admin.php?page=wordproof-wizard')
      ]);

        ?>
        <div class="wrap">
            <h1 class="mb-4" style="display: none">Getting rid of notices</h1>
            <div id="wordproof-getting-started"></div>
        </div>
        <?php
    }
}
