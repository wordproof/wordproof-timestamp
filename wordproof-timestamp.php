<?php
/**
 * Plugin Name: WordProof Timestamp
 * Plugin URI:  https://wordproof.io/wordproof-timestamp-plugin/
 * Description: Timestamp your WordPress content into the blockchain. Instant and without fees. For EOSIO, EOS, Ethereum &amp; Telos.
 * Version:     3.0.6
 * Author:      WordProof
 * Author URI:  https://wordproof.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Domain Path: /languages
 **/

namespace WordProofTimestamp;

use WordProofTimestamp\App\Core;
use WordProofTimestamp\App\Vendor\Dotenv\Dotenv;

if (!defined('WPINC')) {
    die();
}

/**
 * Load Composer and Dotenv
 */
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';

	$dotenv = Dotenv::createImmutable(__DIR__);

	try {
		$dotenv->safeLoad();
	} catch (\Exception $e) {}
}

/**
 * Define the plugin constants
 */
define('WORDPROOF_VERSION', '3.0.6');
define('WORDPROOF_SLUG', 'wordproof');
define('WORDPROOF_ROOT_FILE', __FILE__);
define('WORDPROOF_BASENAME', plugin_basename(WORDPROOF_ROOT_FILE));
define('WORDPROOF_DIR', plugin_dir_path(WORDPROOF_ROOT_FILE));
define('WORDPROOF_DIR_VENDOR', WORDPROOF_DIR . 'vendor/');
define('WORDPROOF_URI', plugin_dir_url(WORDPROOF_ROOT_FILE));
define('WORDPROOF_URI_BUILD', WORDPROOF_URI . 'build/');

/**
 * Construct new app.
 */
new Core();

/**
 * That's all. Happy timestamping!
 */

