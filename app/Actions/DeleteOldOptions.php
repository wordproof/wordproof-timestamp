<?php

namespace WordProofTimestamp\App\Actions;

class DeleteOldOptions extends Action {

	/**
	 * Delete the old WordProof post meta.
	 *
	 * @param array|null $data
	 */
	public function execute( $data = null ) {
		$options = [
			"wordproof_network",
			"wordproof_certificate_text",
			"wordproof_certificate_dom_selector",
			"wordproof_custom_domain",
			"wordproof_send_timestamps_with_order",
			"wordproof_timestamps_order_text",
			"wordproof_show_info_link",
			"wordproof_hide_post_column",
			"wordproof_hide_certificate_home",
			"wordproof_hide_certificate_post_types",
			"wordproof_wsfy",
			"wordproof_oauth",
			"wordproof_wsfy_is_active",
			"wordproof_wallet_connected",
			"wordproof_accountname",
			"wordproof_balance",
			"wordproof_migration_200_completed",
		];

		foreach ( $options as $option ) {
			delete_option( $option );
		}
	}
}
