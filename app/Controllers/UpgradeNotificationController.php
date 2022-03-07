<?php

namespace WordProofTimestamp\App\Controllers;

class UpgradeNotificationController {

	public function __construct() {
		add_action( 'in_plugin_update_message-' . WORDPROOF_BASENAME, [ $this, 'display' ], 10, 2 );
	}

	public function display( $currentPluginMetadata, $newPluginMetadata ) {
		if ( isset( $newPluginMetadata->upgrade_notice ) && strlen( trim( $newPluginMetadata->upgrade_notice ) ) > 0 ) {
			echo '<p style="background-color: #d54e21; padding: 10px; color: #f9f9f9; margin-top: 10px"><strong>Important Upgrade Notice:</strong> ';
			echo esc_html( $newPluginMetadata->upgrade_notice ), '</p>';
		}
	}
}
