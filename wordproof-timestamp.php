<?php
/**
 * Plugin Name: WordProof Timestamp
 * Plugin URI:  https://wordproof.io/wordproof-timestamp-plugin/
 * Description: Timestamp your WordPress content into the blockchain. Instant and without fees. For EOSIO, EOS, Ethereum &amp; Telos.
 * Version:     3.0.0
 * Author:      WordProof
 * Author URI:  https://wordproof.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Domain Path: /languages
 **/

namespace WordProofTimestamp;

if (!defined('WPINC')) {
    die();
}

// Load Composer
if (is_readable(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';

    try {
    	if (file_exists(__DIR__ . '/.env')) {
		    $dotenv = \WordProofTimestamp\Vendor\Dotenv\Dotenv::createImmutable( __DIR__ );
		    $dotenv->load();
	    }
    } catch(\Exception $e) {}

}

define('WORDPROOF_VERSION', '3.0.0');
define('WORDPROOF_SLUG', 'wordproof');
define('WORDPROOF_ROOT_FILE', __FILE__);
define('WORDPROOF_BASENAME', plugin_basename(WORDPROOF_ROOT_FILE));
define('WORDPROOF_DIR', plugin_dir_path(WORDPROOF_ROOT_FILE));
define('WORDPROOF_URI', plugin_dir_url(WORDPROOF_ROOT_FILE));

// Load plugin
spl_autoload_register(function ($class = '') {
    if (!strstr($class, 'WordProofTimestamp')) {
        return;
    }
    $result = str_replace('WordProofTimestamp\\', '', $class);
    $result = str_replace('\\', '/', $result);
    require $result . '.php';
});

//Setup Plugin
require_once WORDPROOF_DIR_INC . '/core.php';
\WordProofTimestamp\Core\init();

/**
 * Return environment value, or default if false
 * @param $key
 * @param $default
 * @return mixed
 */

function wordproof_get_env($key, $default)
{
    return ( isset($_ENV[$key]) ) ? $_ENV[$key] : $default;
}

