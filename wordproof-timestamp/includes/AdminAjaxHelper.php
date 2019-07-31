<?php

namespace WordProofTimestamp\includes;

class AdminAjaxHelper
{

  const allowedOptions = [
    'wordproof_network',
    'wordproof_accountname'
  ];

  public function __construct()
  {
    add_action('wp_ajax_wordproof_save_option', array($this, 'saveOption'));
  }

  public function saveOption()
  {
    check_ajax_referer('wordproof', 'security');
    if (!current_user_can('manage_options')) {
      exit;
    }

    $option = strval($_REQUEST['option']);
    if (in_array($option, self::allowedOptions)) {
      $value = sanitize_option($option, $_REQUEST['value']);
      update_option($option, $value);
      echo json_encode(['success' => true]);
      exit;
    }
    echo json_encode(['success' => false]);
    exit;
  }
}
