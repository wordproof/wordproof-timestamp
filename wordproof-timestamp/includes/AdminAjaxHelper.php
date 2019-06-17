<?php

namespace WordProofTimestampFree\includes;

class AdminAjaxHelper
{

  const allowedOptions = [
    'wordproof_network',
  ];

  public function __construct()
  {
    add_action('wp_ajax_wordproof_save_option', array($this, 'saveOption'));
  }

  public function saveOption($option, $value)
  {
    check_ajax_referer('wordproof', 'security');
    if (!current_user_can('manage_options')) {
      exit;
    }

    if (in_array($option, self::allowedOptions)) {
      $value = sanitize_option($option, $value);
      update_option($option, $value);
      echo json_encode(['success' => true]);
      exit;
    }
    echo json_encode(['success' => false]);
    exit;
  }
}
