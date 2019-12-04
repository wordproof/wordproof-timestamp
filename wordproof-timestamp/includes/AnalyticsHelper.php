<?php

namespace WordProofTimestamp\includes;

class AnalyticsHelper
{
  public static $optionTimestampCount = 'wordproof_timestamp_count';
  public static $optionLastTimestamp = 'wordproof_last_timestamp';
  public static $optionSetupStarted = 'wordproof_setup_started';
  public static $optionWalletConnected = 'wordproof_wallet_connected';
  public static $optionNetwork = 'wordproof_network';
  public static $optionAccountName = 'wordproof_accountname';
  public static $optionWordBalance = 'wordproof_balance';

  public function __construct()
  {
    add_action('wp_ajax_wordproof_setup_start', array($this, 'onSetupStarted'));
    add_action('wp_ajax_wordproof_wallet_connection', array($this, 'onWalletConnected'));

    add_action('wordproof_after_saving_timestamp_meta_data', array($this, 'onNewTimestamp'));
  }

  public function onNewTimestamp()
  {
    $count = get_option(self::$optionTimestampCount, 0);
    $newCount = intval($count) + 1;
    update_option(self::$optionTimestampCount, $newCount);
    update_option(self::$optionLastTimestamp, current_time('timestamp'));
  }

  public function onSetupStarted()
  {
    check_ajax_referer('wordproof', 'security');
    if (!current_user_can('manage_options')) {
      exit;
    }
    update_option(self::$optionSetupStarted, true);
  }

  public function onWalletConnected()
  {
    check_ajax_referer('wordproof', 'security');
    if (!current_user_can('manage_options')) {
      exit;
    }
    update_option(self::$optionWalletConnected, true);
  }

  public static function walletIsConnected() {
    return boolval(get_option(self::$optionWalletConnected, false));
  }

  public static function getTimestampCount() {
    return intval(get_option(self::$optionTimestampCount, 0));
  }
}
