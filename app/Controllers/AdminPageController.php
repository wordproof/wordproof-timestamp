<?php

namespace WordProofTimestamp\App\Controllers;

use WordProofTimestamp\App\Helpers\AssetHelper;

class AdminPageController {

    private $pages = ['admin_page_wordproof-about', 'admin_page_wordproof-migrate'];

	public function __construct() {

		//TODO Display if not shown before.
		add_action( 'admin_menu', [$this, 'addPages'] );
		add_action( 'admin_enqueue_scripts', [$this, 'enqueue'] );
		add_filter( 'wordproof_load_data_on_pages', [$this, 'loadDataOnPageHook']);
	}

	public function addPages() {
		add_submenu_page(
			null,
			'WordProof ' . WORDPROOF_VERSION,
			'WordProof' . WORDPROOF_VERSION,
			'manage_options',
			'wordproof-about',
			[$this, 'aboutPageContent'],
		);
		add_submenu_page(
			null,
			'WordProof ' . WORDPROOF_VERSION,
			'WordProof' . WORDPROOF_VERSION,
			'manage_options',
			'wordproof-migrate',
			[$this, 'migratePageContent'],
		);
	}

	public function enqueue($page) {
		if (in_array($page,$this->pages)) {
			AssetHelper::enqueue('index');
			AssetHelper::enqueue('main.css');
        }
    }

	public function loadDataOnPageHook($pages) {
	    return array_merge($pages, $this->pages);
    }

	public function migratePageContent() {
		?>

		<div id="wordproof-migrate"></div>

		<?php
	}

	public function aboutPageContent() {
		?>

		<div id="wordproof-about"></div>

		<?php
	}

}
