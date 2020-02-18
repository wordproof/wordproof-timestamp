<?php

namespace WordProofTimestamp\includes;

class OptionsHelper
{

  public static $prefix = 'wordproof_';
  public static $optionWSFY = 'wsfy';
  public static $optionOAuth = 'oauth';

  public static $options = [
    'network' => ['type' => 'text'],
    'certificate_text' => ['type' => 'text'],
    'certificate_dom_selector' => ['type' => 'text'],
    'custom_domain' => ['type' => 'text'],
    'send_timestamps_with_order' => ['type' => 'text'],
    'timestamps_order_text' => ['type' => 'text'],
    'show_info_link' => ['type' => 'html'],
    'hide_post_column' => ['type' => 'bool'],
    'wsfy' => [
      'site_id' => ['type' => 'int'],
      'site_token' => ['type' => 'text'],
      'show_revisions' => ['type' => 'bool'],
      'allowed_post_types' => ['type' => 'text'],
      'whitelisted_ips' => ['type' => 'text']
    ],
    'oauth' => [
      'client_id' => ['type' => 'text'],
      'client_secret' => ['type' => 'text'],
      'refresh_token' => ['type' => 'text'],
      'expiration' => ['type' => 'text'],
      'access_token' => ['type' => 'text'],
    ],
    'wsfy_is_active' => ['type' => 'bool'],
    'accountname' => ['type' => 'text'],
    'balance' => ['type' => 'text'],
  ];

  private static $defaultCertificateText = "View this content's WordProof Timestamp certificate";

  public static function get($key) {
    if (!in_array($key, array_keys(self::$options)))
      return new \Exception('Option not found');

    return get_option(self::$prefix . $key);
  }

  public static function getNetwork() {
    return get_option(self::$prefix . 'network');
  }

  public static function getCertificateText() {
    $text = get_option(self::$prefix . 'certificate_text', null) ?: self::$defaultCertificateText;
    return stripslashes($text);
  }

  public static function getCertificateDomSelector() {
    return get_option(self::$prefix . 'certificate_dom_selector');
  }
  public static function getHidePostColumn() {
    return get_option(self::$prefix . 'hide_post_column');
  }

  public static function getAccountName($default = false) {
    return get_option(self::$prefix . 'accountname', $default);
  }

  public static function getBalance($default = false) {
    $balance = intval(get_option(self::$prefix . 'balance', $default));
    wp_cache_set('balance', $balance, 'wordproof');
    return $balance;
  }

  public static function getBalanceCache() { //todo use transient
    if (wp_cache_get('balance', 'wordproof'))
      return wp_cache_get('balance', 'wordproof');
    return self::getBalance();
  }

  public static function getCustomDomain($default = false) {
    return get_option(self::$prefix . 'custom_domain', $default);
  }

  public static function getShowInfoLink($default = false) {
    return get_option(self::$prefix . 'show_info_link', $default);
  }

  public static function getWSFY($excludes = []) {
    $options = get_option(self::$prefix . self::$optionWSFY, []);
    $options = self::prepareWSFY($options);

    foreach ($excludes as $exclude) {
      unset($options[$exclude]);
    }
    return (object)$options;
  }

  public static function getOAuth($excludes = ['client_secret']) {
    $options = get_option(self::$prefix . self::$optionOAuth, []);

    foreach ($excludes as $exclude) {
      unset($options[$exclude]);
    }
    return (object)$options;
  }

  public static function getWSFYField($field) {
    $options = self::getWSFY();
    if (isset($options->$field))
      return $options->$field;

    return null;
  }

  public static function getWSFYAllowedIps() {
    $whitelistedIps = self::getWSFYField('whitelisted_ips');
    if (is_array($whitelistedIps))
      return array_merge(WORDPROOF_WSFY_API_IP, $whitelistedIps);

    return WORDPROOF_WSFY_API_IP;
  }

  public static function isWSFYActive() {
    return boolval(get_option(self::$prefix . 'wsfy_is_active'));
  }

  public static function getSendTimestampsWithOrder() {
    return get_option(self::$prefix . 'send_timestamps_with_order', 'never');
  }

  public static function getTimestampOrderText() {
    return get_option(self::$prefix . 'timestamps_order_text', false);
  }

  private static function prepareWSFY($options) {
    if (isset($options['allowed_post_types']) && is_array($options['allowed_post_types'])) {
      $options['allowed_post_types'] = array_values($options['allowed_post_types']);
    } else {
      $options['allowed_post_types'] = ['post', 'page'];
    }

    if (isset($options['show_revisions'])) {
      $options['show_revisions'] = boolval($options['show_revisions']);
    } else {
      $options['show_revisions'] = true;
    }

    return $options;
  }

  public static function set($key, $value) {
    $wsfyKeys = array_keys(self::$options[self::$optionWSFY]);
    $oauthKeys = array_keys(self::$options[self::$optionOAuth]);

    if (in_array($key, $wsfyKeys)) {
      return self::setValueOfArray(self::$optionWSFY, $wsfyKeys, $key, $value);

    } else if (in_array($key, $oauthKeys)) {
      self::set('site_token', false);
      return self::setValueOfArray(self::$optionOAuth, $oauthKeys, $key, $value);

    } else if (isset(self::$options[$key])) {
      $type = self::$options[$key]['type'];
      $value = self::validateData($value, $type);
      return update_option(self::$prefix . $key, $value);
    } else {
      error_log($key . ' does not exist in $options of OptionsHelper');
    }

    return false;
  }

  private static function setValueOfArray($arrayParentKey, $arrayKeys, $key, $value) {
    $type = self::$options[$arrayParentKey][$key]['type'];
    $value = [$key => self::validateData($value, $type)];

    $options = ($arrayParentKey === self::$optionWSFY) ? (array)self::getWSFY() : (array)self::getOAuth([]);
    $options = array_intersect_key($options, array_flip($arrayKeys));

    $options = array_merge($options, $value);
    return update_option(self::$prefix . $arrayParentKey, $options);
  }

  private static function validateData($value, $type) {
    if (is_array($value)) {
      return array_map(['self', 'validate'], $value);
    } else {
      return self::validate($value, $type);
    }
  }

  private static function validate($value, $type = '') {
    switch ($type) {
      case 'int':
        return intval($value);
      case 'html':
        return wp_kses_post($value);
      case 'bool':
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
      default:
        return sanitize_text_field($value);
    }
  }
}
