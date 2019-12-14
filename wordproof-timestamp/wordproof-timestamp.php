<?php

/*
 Plugin Name: WordProof Timestamp
 Plugin URI:  https://wordproof.io/wordproof-timestamp-plugin/
 Description: Timestamp your WordPress content into the blockchain. Instant and without fees. For EOSIO, EOS &amp; Telos.
 Version:     {release version}
 Author:      WordProof
 Author URI:  https://wordproof.io
 License:     GPL2
 License URI: https://www.gnu.org/licenses/gpl-2.0.html
 Domain Path: /languages
*/

namespace WordProofTimestamp;

// If this file is called directly, abort.
if (!defined('WPINC')) {
  die();
}

define('WORDPROOF_DEVELOPMENT', false);
define('WORDPROOF_VERSION', '{release version}');
define('WORDPROOF_SLUG', 'wordproof');
define('WORDPROOF_PREFIX', 'wordproof');
define('WORDPROOF_ROOT_FILE', __FILE__);
define('WORDPROOF_BASENAME', plugin_basename(WORDPROOF_ROOT_FILE));
define('WORDPROOF_DIR', plugin_dir_path(WORDPROOF_ROOT_FILE));
define('WORDPROOF_DIR_ASSETS', WORDPROOF_DIR . 'assets');
define('WORDPROOF_DIR_VENDOR', WORDPROOF_DIR_ASSETS . '/vendor');
define('WORDPROOF_DIR_JS', WORDPROOF_DIR_ASSETS . '/js');
define('WORDPROOF_DIR_CSS', WORDPROOF_DIR_ASSETS . '/css');
define('WORDPROOF_DIR_SVG', WORDPROOF_DIR_ASSETS . '/svg');
define('WORDPROOF_URI', plugin_dir_url(WORDPROOF_ROOT_FILE));
define('WORDPROOF_URI_ASSETS', WORDPROOF_URI . 'assets');
define('WORDPROOF_URI_VENDOR', WORDPROOF_URI_ASSETS . '/vendor');
define('WORDPROOF_URI_JS', WORDPROOF_URI_ASSETS . '/js');
define('WORDPROOF_URI_CSS', WORDPROOF_URI_ASSETS . '/css');
define('WORDPROOF_URI_IMAGES', WORDPROOF_URI_ASSETS . '/images');
define('WORDPROOF_URI_SVG', WORDPROOF_URI_ASSETS . '/svg');
define('WORDPROOF_WSFY_ENDPOINT_ITEM', 'sites/$siteId/items/');
define('WORDPROOF_WSFY_ENDPOINT_RETRY_CALLBACK', 'sites/$siteId/items/$postId/callback/retry');
define('WORDPROOF_WSFY_ENDPOINT_TOKEN_VALIDATE', 'validate/token');
define('WORDPROOF_WSFY_CRON_HOOK', 'wsfy_save_post_on_cron');

define('WORDPROOF_WSFY_API_IP', ['167.71.143.38']);
if (WORDPROOF_DEVELOPMENT) {
  define('WORDPROOF_WSFY_API_URI', 'https://staging.wordproof.io/api/');
} else {
  define('WORDPROOF_WSFY_API_URI', 'https://my.wordproof.io/api/');
}

//Web Standards
define('ARTICLE_TIMESTAMP', 'ArticleTimestamp');
define('MEDIA_OBJECT_TIMESTAMP', 'MediaObjectTimestamp');
define('CURRENT_TIMESTAMP_STANDARD_VERSION', '0.2.0');

// Init plugin
spl_autoload_register(__NAMESPACE__ . '\\autoload');
add_action('activated_plugin', __NAMESPACE__ . '\\wordproofGettingStarted');
add_action('plugins_loaded', array(WordProofTimestamp::getInstance(), 'init'));

/**
 * @param string $class
 */
function autoload($class = '')
{
  if (!strstr($class, 'WordProofTimestamp')) {
    return;
  }
  $result = str_replace('WordProofTimestamp\\', '', $class);
  $result = str_replace('\\', '/', $result);
  require $result . '.php';
}

function wordproofGettingStarted($plugin) {
  if ($plugin === 'wordproof-timestamp/wordproof-timestamp.php' && !isset($_GET['activate-multi'])) {
    wp_redirect(admin_url('admin.php?page=wordproof-getting-started'));
    die();
  }
}
