<?php

namespace WordProofTimestamp\App\Controllers;

class AdminPageController {

	public function __construct() {

		//TODO Display if not shown before.
		add_action( 'admin_menu', [$this, 'updateOrInstallPage'] );
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

	public function updateOrInstallPageContent() {
		?>

		<div class="wordproof-page-upgrade"></div>

		<?php
	}

}
