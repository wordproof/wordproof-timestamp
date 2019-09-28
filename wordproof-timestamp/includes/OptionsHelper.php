<?php

namespace WordProofTimestamp\includes;

use WordProofTimestamp\includes\Controller\CertificateController;

class OptionsHelper
{

  public static $prefix = 'wordproof_';
  public static $optionWSFY = 'wsfy';

  public static $options = [
    'network' => ['type' => 'text'],
    'certificate_text' => ['type' => 'text'],
    'certificate_dom_selector' => ['type' => 'text'],
    'hide_post_column' => ['type' => 'bool'],
    'wsfy' => [
      'site_token' => ['type' => 'text'],
      'site_id' => ['type' => 'int'],
      'show_revisions' => ['type' => 'bool'],
      'allowed_post_types' => ['type' => 'text']
    ],
    'wsfy_is_active' => ['type' => 'bool'],
    'accountname',
    'balance'
  ];

  private static $defaultCertificateText = "View this content's WordProof Timestamp certificate";

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
    return get_option(self::$prefix . 'balance', $default);
  }

  public static function getWSFY($includes = [], $excludes = []) {
    $options = get_option(self::$prefix . self::$optionWSFY, []);
    $options = self::prepareWSFY($options);

    if (!empty($includes)) {
      return (object)array_intersect_key($options, array_flip($includes));
    }

    foreach ($excludes as $exclude) {
      unset($options[$exclude]);
    }
    return (object)$options;
  }

  public static function isWSFYActive() {
    return get_option(self::$prefix . 'wsfy_is_active');
  }

  private static function prepareWSFY($options) {
    //Check values
    if (isset($options['allowed_post_types'])) {
      $options['allowed_post_types'] = array_values($options['allowed_post_types']);
    }

    if (isset($options['show_revisions'])) {
      $options['show_revisions'] = boolval($options['show_revisions']);
    }

    //Default values
    if (!isset($options['allowed_post_types'])) {
      $options['allowed_post_types'] = ['post', 'page'];
    }

    if (!isset($options['show_revisions'])) {
      $options['show_revisions'] = true;
    }

    return $options;
  }

  public static function set($key, $value) {
    $wsfyKeys = array_flip(array_keys(self::$options['wsfy']));
    if ($key === 'wsfy' || in_array($key, $wsfyKeys)) {

      $value = [$key => self::validateData($key, $value)];
      $options = (array)self::getWSFY();
      $options = array_intersect_key($options, $wsfyKeys);

      $options = array_merge($options, $value);
      return update_option(self::$prefix . 'wsfy', $options);

    } else if (isset(self::$options[$key])) {
        $value = self::validateData($key, $value);
        return update_option(self::$prefix . $key, $value);
    }

    return false;
  }

  private static function validateData($key, $value) {
    $type = self::$options['wsfy'][$key]['type'];

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
      case 'bool':
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
      default:
        return sanitize_text_field($value);
    }
  }
}
