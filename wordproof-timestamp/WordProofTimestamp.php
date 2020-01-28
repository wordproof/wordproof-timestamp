<?php

namespace WordProofTimestamp;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\Controller\AdminController;
use WordProofTimestamp\includes\Controller\AutomaticHooksController;
use WordProofTimestamp\includes\Controller\CertificateController;
use WordProofTimestamp\includes\Controller\HashController;
use WordProofTimestamp\includes\Controller\TimestampController;
use WordProofTimestamp\includes\PostHelper;

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

    new AutomaticHooksController();

    add_action('activated_plugin', [$this, 'gettingStarted']);
    add_action('wp_loaded', [$this, 'wpropfx']);
  }

  public function wpropfx() {
    if (isset($_GET['test'])) {


      $post = get_post(3695);
      $res = $this->request($post->ID);
      $hash = HashController::getHash($post);
      $raw = HashController::getHash($post, true);
      error_log($raw);
      error_log($res->content);

      echo $res->hash . '<br/>';
      echo 'hello&nbsp;&#160;hello' . '<br/>';
      echo htmlentities($res->content);
      echo $hash . '<br/>';



      die('died');
    }
  }

  private function request($postId) {
    $c = new AutomaticHelper($postId);
    return $c->createPost();
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
