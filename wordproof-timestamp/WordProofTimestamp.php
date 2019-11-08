<?php

namespace WordProofTimestamp;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\Controller\AdminController;
use WordProofTimestamp\includes\Controller\AutomateController;
use WordProofTimestamp\includes\Controller\CertificateController;
use WordProofTimestamp\includes\Controller\TimestampController;

/**
 * Class WordProofTimestamp
 * @package WordProofTimestamp
 */
class WordProofTimestamp
{

  /** @var null */
  private static $instance = null;

  public function init()
  {
    new AdminController();
    new AnalyticsHelper();
    new TimestampController();
    new CertificateController();

    new AutomateController();

    add_action('activated_plugin', [$this, 'gettingStarted']);
  }

  /**
   * @return null|WordProof
   */
  public static function getInstance()
  {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }


  public function gettingStarted($plugin) {
    error_log('here');
    if ($plugin === 'wordproof-timestamp/wordproof-timestamp.php' && !isset($_GET['activate-multi'])) {
      wp_redirect(admin_url('admin.php?page=wordproof-getting-started'));
      die();
    }
  }


}
