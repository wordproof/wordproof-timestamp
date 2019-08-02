<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class CertificateController {

  private static $default_template = "<div><p class='wordproof-certificate-link' style='display: flex; align-items: center;'><img src='". WORDPROOF_URI . "assets/images/wordproof-icon.png" . "' style='max-width: 30px; max-height: 30px; display: inline-block; margin: 0 10px 0 0;' alt='WordProof timestamp'/><a class='wordproof-certificate-helper' data-post-id='POST_ID' href='CERTIFICATE_URL'>CERTIFICATE_TEXT</a></p></div>";
  private static $default_text = "View this content's WordProof Timestamp certificate";
  private static $default_url = '#wordproof';

  public function __construct()
  {
    add_filter('the_content', array($this, 'addCertificateLink'), 999, 1);
    add_action('wp_footer', array($this, 'addCertificateModalHtml'), 10);
    add_action('wp_enqueue_scripts', array($this, 'addCertificateScript'), 999);
    add_action('wp_head', array($this, 'addCertificateSchema'), 999);
  }

  public function addCertificateLink($content)
  {
    global $post;

    if (!empty($post)) {
      $meta = PostMetaHelper::getPostMeta($post, ['wordproof_date']);
      if (isset($meta->wordproof_date)) {
        $content .= $this->getCertificateLinkHtml($post->ID);
      }
    }

    return $content;
  }

  public function addCertificateModalHtml()
  {
    global $post;

    if (!empty($post)) {
      $meta = PostMetaHelper::getPostMeta($post, ['wordproof_date']);
      if (isset($meta->wordproof_date)) {
        echo '<div id="wordproof-certificate-container"></div>';
      }
    }
  }

  public function addCertificateScript()
  {
    wp_enqueue_script('wordproof.frontend.js', WORDPROOF_URI_JS . '/frontend.js', array(), filemtime(WORDPROOF_DIR_JS . '/frontend.js'), true);
    wp_localize_script('wordproof.frontend.js', 'wordproofData', array(
      'wordProofCssDir' => WORDPROOF_URI_CSS,
      'pluginDirUrl' => WORDPROOF_URI
    ));
  }

  public function addCertificateSchema()
  {
    global $post;
    echo SchemaController::getSchema($post);
  }

  public static function getCertificateTemplate() {
      $template = self::$default_template;
      return $template;
  }

  public static function getCertificateText() {
      $text = get_option('wordproof_certificate_text', null) ?: self::$default_text;
      return $text;
  }

  public static function getCertificateUrl() {
      $url = self::$default_url;
      return $url;
  }

/**
 * Generate certificate html link
 * @param $postId
 * @return mixed|string
 */
  public static function getCertificateLinkHtml($postId) {
      $html = self::getCertificateTemplate();
      $text = self::getCertificateText();
      $url = self::getCertificateUrl();
      $html = str_replace('CERTIFICATE_URL', $url, $html);
      $html = str_replace('CERTIFICATE_TEXT', $text, $html);
      $html = str_replace('POST_ID', $postId, $html);
      return $html;
  }
}
