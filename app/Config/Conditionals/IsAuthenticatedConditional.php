<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Config\Conditionals;

use WordProof\SDK\Helpers\AuthenticationHelper;

class IsAuthenticatedConditional extends Conditional
{
    /**
     * @return bool
     */
    public function is_met()
    {
        return AuthenticationHelper::isAuthenticated();
    }
}
