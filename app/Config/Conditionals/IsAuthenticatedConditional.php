<?php

namespace WordProofTimestamp\App\Config\Conditionals;

use WordProofTimestamp\App\Vendor\WordProof\SDK\Helpers\AuthenticationHelper;

class IsAuthenticatedConditional extends Conditional {

	/**
	 * @return bool
	 */
	public function is_met() {
		return AuthenticationHelper::isAuthenticated();
	}
}
