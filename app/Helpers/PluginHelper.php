<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Helpers;

class PluginHelper
{
    /**
     * Deactivate the WordProof Timestamp plugin.
     */
    public static function deactivate(): void
    {
        if (\defined('WORDPROOF_BASENAME') && is_plugin_active(WORDPROOF_BASENAME)) {
            deactivate_plugins(WORDPROOF_BASENAME, true);
        }
    }
}
