<?php

namespace WordProofTimestamp\App\Notices;

use WordProofTimestamp\App\Vendor\WordProof\SDK\Helpers\AuthenticationHelper;
use WordProofTimestamp\App\Vendor\WordProof\SDK\Helpers\TransientHelper;

class AuthenticateAfterMigrationNotice extends Notice {

	/**
	 * YoastNotice constructor.
	 */
	public function __construct() {
		$this->key = 'wordproof_authenticate_after_migration';

		add_action( 'admin_notices', [ $this, 'init' ] );
	}

	/**
	 * Displays notice if requirements are met.
	 */
	public function init() {
		if ($this->show()) {
			$this->configureNotice();

			echo $this->getNotice();
		}
	}

	/**
	 * Configures the notice variables.
	 */
	public function configureNotice() {
		$this->isDismissible     = false;
		$this->notice['type']    = 'warning';
		$this->notice['message'] = 'WordProof is upgraded to version 3.0. We need you perform one manual step before the plugin working properly again.';
		$this->button['text']    = 'Authenticate with WordProof';
		$this->button['link']    = admin_url( 'admin.php?page=wordproof_about' );
	}

	/**
	 * Determines if the notice should be displayed.
	 *
	 * @return bool
	 */
	public function show() {
		if ( $this->isHidden() ) {
			return false;
		}

		$hadVersion200Installed = get_option('wordproof_migration_200_completed');
		$performed300Migration = TransientHelper::get('wordproof_migration_300');
		if ($hadVersion200Installed && $performed300Migration && !AuthenticationHelper::isAuthenticated()) {
			return true;
		}

		return false;
	}
}
