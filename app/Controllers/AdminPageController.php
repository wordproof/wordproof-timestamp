<?php

namespace WordProofTimestamp\App\Controllers;

use WordProofTimestamp\App\Helpers\AssetHelper;

class AdminPageController {

    private $page = 'admin_page_wordproof-about';

	public function __construct() {

		//TODO Display if not shown before.
		add_action( 'admin_menu', [$this, 'updateOrInstallPage'] );
		add_action( 'admin_enqueue_scripts', [$this, 'enqueue'] );
		add_filter( 'wordproof_load_data_on_pages', [$this, 'loadDataOnPageHook']);
	}

	public function updateOrInstallPage() {
		add_submenu_page(
			null,
			'WordProof ' . WORDPROOF_VERSION,
			'WordProof' . WORDPROOF_VERSION,
			'manage_options',
			'wordproof-about',
			[$this, 'updateOrInstallPageContent'],
		);
	}

	public function enqueue($page) {
		if ($page === $this->page) {
		    AssetHelper::enqueue('about');
        }
    }

	public function loadDataOnPageHook($pages) {
		$pages[] = $this->page;
	    return $pages;
    }

	public function updateOrInstallPageContent() {
		?>

		<div class="wordproof-page-upgrade"></div>

		<?php
	}

}
