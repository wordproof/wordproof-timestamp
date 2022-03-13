<?php

namespace WordProofTimestamp\App\Config;

use http\Env;
use WordProof\SDK\Config\DefaultAppConfig;
use WordProofTimestamp\App\Helpers\DotenvHelper;
use WordProofTimestamp\App\Vendor\Dotenv\Dotenv;

/**
 * Class SdkAppConfig.
 */
class SdkAppConfig extends DefaultAppConfig {

	/**
	 * Returns the partner.
	 *
	 * @return string The partner.
	 */
	public function getPartner() {
		return 'wordproof';
	}

	/**
	 * Returns the environment.
	 *
	 * @return string The environment.
	 */
	public function getEnvironment() {
		return DotenvHelper::get('APP_ENV', 'production');
	}

	public function getOauthClient() {
		return DotenvHelper::get('WORDPROOF_CLIENT', null);
	}

	public function getWordProofUrl() {
		return DotenvHelper::get('WORDPROOF_ENDPOINT', null);
	}

	public function getScriptsFileOverwrite() {
		return DotenvHelper::get('WORDPROOF_SDK_OVERWRITE', null);
	}
}
