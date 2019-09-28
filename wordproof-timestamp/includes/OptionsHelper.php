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

  public static function getWSFY($keys = []) {
    $options = get_option(self::$prefix . self::$optionWSFY, []);
    $options = self::prepareWSFY($options);

    if (!empty($keys)) {
      return (object)array_intersect_key($options, array_flip($keys));
    }
    return (object)$options;
  }

  private static function prepareWSFY($options) {
    if (!isset($options['allowed_post_types'])) {
      $options['allowed_post_types'] = ['post', 'page'];
    }

    return $options;
  }

  public static function set($key, $value) {
    if ($key === 'wsfy') {

      if (!is_array($value))
        return false;

      $allowed = array_flip(array_keys(self::$options['wsfy']));
      $values = array_intersect_key($value, $allowed);
      foreach ($values as $k => $v) {
        $type = self::$options['wsfy'][$k]['type'];
        $values[$k] = self::validate($type, $v);
      }

      $options = (array)self::getWSFY();
      $options = array_intersect_key($options, $allowed);
      $options = array_merge($options, $values);
      return update_option(self::$prefix . $key, $options);

    } else if (isset(self::$options[$key])) {
        $type = self::$options[$key]['type'];
        $value = self::validate($type, $value);
        return update_option(self::$prefix . $key, $value);
    }
    return false;
  }

  private static function validate($type, $value) {
    switch ($type) {
      case 'integer':
        return intval($value);
      case 'boolean':
        return boolval($value);
      default:
        return sanitize_text_field($value);
    }
  }
}
