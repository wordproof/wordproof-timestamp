<?php

namespace WordProofTimestampFree;

use WordProofTimestampFree\includes\MetaBox;
use WordProofTimestampFree\includes\Page\ProofPage;
use WordProofTimestampFree\includes\Page\SettingsPage;
use WordProofTimestampFree\includes\CertificateHelper;
use WordProofTimestampFree\includes\TimestampHelper;
use WordProofTimestampFree\includes\TimestampAjaxHelper;

/**
 * Class WordProofTimestampFree
 * @package WordProofTimestampFree
 */
class WordProofTimestampFree
{

  /** @var null */
  private static $instance = null;
  private static $timestampMeta = null;

  public function init()
  {
    /**
     * Bootstrap
     */
    new ProofPage();
    new SettingsPage();
    new MetaBox();
    new TimestampAjaxHelper();

    /**
     * Actions
     */
    add_filter('manage_posts_columns', array($this, 'addColumn'));
    add_action('manage_posts_custom_column', array($this, 'addColumnContent'), 10, 2);
    add_filter('the_content', array($this, 'addProofLink'), 999, 1);
    add_action('admin_enqueue_scripts', array($this, 'loadAdminAssets'), 999);
    add_action('wp_footer', array($this, 'addProofPopupHtml'), 10);
    add_action('wp_enqueue_scripts', array($this, 'addProofPopupScripts'), 999);
  }

  public function addColumn($defaults)
  {
    $defaults['wordproof'] = 'WordProof';
    return $defaults;
  }

  public function addColumnContent($column_name, $post_id)
  {
    if ($column_name == 'wordproof') {
      $meta = self::getTimestampMeta($post_id);

      if (isset($meta['wordproof_date'])) {
        if ($meta['wordproof_date'] === get_the_modified_date('Y-m-d H:i:s', $post_id)) {
          echo '<a target="_blank" href="' . get_permalink($post_id) . '#wordproof">Stamped</a>';
        } else {
          echo '<a target="_blank" href="' . get_permalink($post_id) . '#wordproof">Outdated</a>';
        }
      } else {
        echo '—';
      }

    }
  }

  public function addProofLink($content)
  {
    global $post;

    if (!empty($post)) {
      $meta = self::getTimestampMeta($post->ID);

      if (isset($meta['wordproof_date'])) {
        $content .= CertificateHelper::getCertificateHtml($post->ID);
      }
    }

    return $content;
  }

  public function addProofPopupHtml()
  {
    global $post;

    if (!empty($post)) {
      $meta = self::getTimestampMeta($post->ID);

      if (isset($meta['wordproof_date'])) {
        echo '<div id="wordproof-popup-container"></div>';
      }
    }
  }

  public function addProofPopupScripts()
  {
    global $post;
    wp_enqueue_script('wordproof.frontend.js', WORDPROOF_URI_JS . '/frontend.js', array(), filemtime(WORDPROOF_DIR_JS . '/frontend.js'), true);

    $timestampPostMeta = TimestampHelper::getTimestampPostMeta($post->ID);
    $timestampPostMeta['current_post_modified'] = $post->post_modified;

    wp_localize_script('wordproof.frontend.js', 'wordproofData', array(
      'timestampMeta' => $timestampPostMeta,
      'wordProofCssDir' => WORDPROOF_URI_CSS
    ));
  }

  public function loadAdminAssets()
  {
    global $post;
    wp_enqueue_style('wordproof.admin.css', WORDPROOF_URI_CSS . '/admin.css', array(), filemtime(WORDPROOF_DIR_CSS . '/admin.css'));

    wp_enqueue_script('wordproof.admin.js', WORDPROOF_URI_JS . '/admin.js', array(), filemtime(WORDPROOF_DIR_JS . '/admin.js'), true);
    wp_localize_script('wordproof.admin.js', 'wordproofData', array(
      'ajaxURL' => admin_url('admin-ajax.php'),
      'settingsURL' => admin_url('admin.php?page=wordproof'),
      'ajaxSecurity' => wp_create_nonce('wordproof'),
      'postId' => (!empty($post->ID)) ? $post->ID : false,
      'network' => get_option('wordproof_network', 'eos_main'),
      'storeRam' => get_option('wordproof_store_ram', false),
      'storeContent' => get_option('wordproof_store_content', false),
      'pluginDirUrl' => plugin_dir_url(__FILE__)
    ));
  }

  /**
   * @param $postId
   * @return array|mixed|null
   */
  public static function getTimestampMeta($postId)
  {
    if (!isset(self::$timestampMeta)) {
      self::$instance = TimestampHelper::getTimestampPostMeta($postId);
    }
    return self::$instance;
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
}