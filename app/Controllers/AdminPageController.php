<?php

namespace WordProofTimestamp\App\Controllers;

class AdminPageController {

	public function __construct() {

		//TODO Display if not shown before.
		add_action( 'admin_menu', [$this, 'updateOrInstallPage'] );
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

	public function loadDataOnPageHook($pages) {
		$pages[] = 'admin_page_wordproof-about';
	    return $pages;
    }

	public function updateOrInstallPageContent() {
		?>

		<div class="wordproof-page-upgrade"></div>

		<?php
	}

}
