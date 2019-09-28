<?php

namespace WordProofTimestamp\includes;

use WordProofTimestamp\includes\Controller\CertificateController;

class OptionsHelper
{

  public static $prefix = 'wordproof_';
  public static $options = (object)[
    'network',
    'certificate_text',
    'certificate_dom_selector',
    'hide_post_column',
    'automate' => [
      'site_token',
      'site_id',
      'is_active',
      'show_revisions',
      'allowed_post_types'
    ],
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
}
