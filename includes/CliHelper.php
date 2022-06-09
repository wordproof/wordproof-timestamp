<?php

namespace WordProofTimestamp\includes;

class CliHelper {

	public static function running() {
		return defined( 'WP_CLI' ) && WP_CLI;
	}
}
