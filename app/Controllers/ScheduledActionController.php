<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Controllers;

class ScheduledActionController
{
    public function __construct()
    {
        require_once(WORDPROOF_DIR_VENDOR . 'woocommerce/action-scheduler/action-scheduler.php');
    }
}
