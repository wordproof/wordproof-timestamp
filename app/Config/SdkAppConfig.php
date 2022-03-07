<?php

namespace WordProofTimestamp\App\Config;

use WordProofTimestamp\Vendor\WordProof\SDK\Config\DefaultAppConfig;

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
		return 'development';
	}


	public function getOauthClient() {
		return 3;
		// return 81;
	}

	public function getWordProofUrl() {
		return 'https://myv2.test';
		// return 'https://staging.wordproof.com';
	}

	public function getScriptsFileOverwrite() {
		return 'https://wproof.test/wp-content/plugins/wordproof-timestamp/vendor/wordproof/wordpress-sdk/app/';
	}
}
