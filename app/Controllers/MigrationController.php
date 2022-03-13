<?php

namespace WordProofTimestamp\App\Controllers;

use WordProof\SDK\Helpers\AuthenticationHelper;
use WordProofTimestamp\App\Actions\MigrateToNewSchema;
use WordProofTimestamp\App\Config\Migrations\v3Migration;
use WordProof\SDK\Helpers\TransientHelper;

class MigrationController {

	public function __construct() {
		add_action( 'admin_init', [ $this, 'migration_300' ] );
	}

	/**
	 * TODO: This should be changed to a proper migration toolkit.
	 * Supporting: preMigration and postMigration hooks.
	 */
	public function migration_300() {

		$performedMigration = TransientHelper::get('wordproof_migration_300');
		if (!$performedMigration) {
			(new v3Migration)->up();
		}

		$waitingForPostMigration = TransientHelper::get('wordproof_waiting_for_authentication_to_start_post_migration');
		if ($waitingForPostMigration) {

			if (AuthenticationHelper::isAuthenticated()) {

				$action = new MigrateToNewSchema();
				$action->execute();

				TransientHelper::getOnce('wordproof_waiting_for_authentication_to_start_post_migration');

			}
		}
	}
}
