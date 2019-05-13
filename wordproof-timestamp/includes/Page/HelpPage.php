<?php

namespace WordProof\includes\Page;

/**
 * Class HelpPage
 * @package WordProof\includes\Page
 */
class HelpPage {

    public function __construct() {
        add_action('admin_menu', array($this, 'addHelpPage'));

    }

    public function addHelpPage() {
        add_submenu_page(
            'wordproof',
            'WordProof - Help',
            'Help',
            'manage_options',
            'wordproof-help',
            array($this, 'generateHelpPage')
        );
    }

    public function generateHelpPage() {
        ?>
        <div id="wordproof-app"></div>
        <?php
    }
}
