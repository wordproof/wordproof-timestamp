<?php

namespace WordProofTimestamp\App\Helpers;

class CliHelper {

	/**
	 * If WP_Cli executing current session.
	 *
	 * @return bool
	 */
	public static function running() {
		return defined( 'WP_CLI' ) && WP_CLI;
	}
}
