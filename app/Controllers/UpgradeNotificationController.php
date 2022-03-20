<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Controllers;

class UpgradeNotificationController
{
    public function __construct()
    {
        add_action('in_plugin_update_message-' . WORDPROOF_BASENAME, [ $this, 'display' ], 10, 2);
    }

    public function display($currentPluginMetadata, $newPluginMetadata): void
    {
        if (isset($newPluginMetadata->upgrade_notice) && trim($newPluginMetadata->upgrade_notice) !== '') {
            echo '<p style="border: 4px solid #d54e21; padding: 10px; color: #000000; margin-top: 10px"><strong>Upgrade Notice:</strong> ';
            echo esc_html('Hello'), '</p>';
        }
    }
}
