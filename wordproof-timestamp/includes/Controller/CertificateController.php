<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class CertificateController
{

  private static $default_url = '#wordproof';

  public function __construct()
  {
    add_action('wp', [$this, 'init']);
  }

  public function init()
  {
    if (is_singular()) {
      add_action('wp_head', [$this, 'addSchema']);
      add_filter('the_content', [$this, 'addLink']);
      add_action('wp_footer', [$this, 'addModal']);
      add_action('wp_enqueue_scripts', [$this, 'addScript']);
      add_filter('script_loader_tag', [$this, 'addScriptAttribute'], 10, 2);
    }
  }

  public function addLink($content)
  {
    global $post;
    $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain']);
    if (isset($meta->date) && !empty($meta->blockchain)) {
      $content .= '<div id="wordproof-certificate-link"></div>';
    }

    return $content;
  }

  public function addModal()
  {
    global $post;
    $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain']);
    if (isset($meta->date) && !empty($meta->blockchain)) {
      echo '<div id="wordproof-certificate-modal"></div>';
    }
  }

  public function addScript()
  {
    global $post;
    $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain']);

    if (isset($meta->date) && !empty($meta->blockchain)) {
      $wsfyIsActive = OptionsHelper::isWSFYActive();
      $wsfyOptions = ($wsfyIsActive) ? OptionsHelper::getWSFY([], ['site_token']) : [];
      $certificateText = OptionsHelper::getCertificateText();
      $certificateDOMParent = OptionsHelper::getCertificateDomSelector();

      wp_enqueue_script('wordproof.frontend.js', WORDPROOF_URI_JS . '/frontend.js', [], filemtime(WORDPROOF_DIR_JS . '/frontend.js'), true);

      wp_localize_script('wordproof.frontend.js', 'wordproof', [
        'link' => [
          'url' => $this->getUrl(),
          'text' => OptionsHelper::getCertificateText(),
          'postId' => $post->ID,
        ],
        'uid' => $post->ID,
        'api' => WORDPROOF_WSFY_API_URI,
        'articlesEndpoint' => WORDPROOF_WSFY_ENDPOINT_ARTICLE,
        'css' => WORDPROOF_URI_CSS . '/frontend.css',
        'icon' => WORDPROOF_URI_IMAGES . '/wordproof-icon.png',
        'logo' => WORDPROOF_URI_IMAGES . '/wordproof-logo.png',
        'wsfyIsActive' => $wsfyIsActive,
        'wsfy' => $wsfyOptions,
        'certificateText' => $certificateText,
        'certificateDOMParent' => (isset($certificateDOMParent)) ? $certificateDOMParent : ''
      ]);

      wp_localize_script('wordproof.frontend.js', 'wproofStrings', [
        'title' => __('Timestamp Certificate', 'wordproof-timestamp'),
        'subtitle' => __('Protected with', 'wordproof-timestamp'),
        'readMore' => __('Read More', 'wordproof-timestamp'),
        'switchRaw' => __('Raw', 'wordproof-timestamp'),
        'switchArticle' => __('Article', 'wordproof-timestamp'),
        'switchAbout' => __('About this Timestamp Certificate', 'wordproof-timestamp'),
        'switchAboutReturn' => __('Back to Timestamp Certificate', 'wordproof-timestamp'),
        'blockchainLink' => __('View on the blockchain', 'wordproof-timestamp'),
        'timestampChecker' => __('Timestamp Checker', 'wordproof-timestamp'),
        'dateModification' => __('Modification Date', 'wordproof-timestamp'),
        'promotionLinkText' => __('Protect your content on the blockchain with WordProof Timestamp', 'wordproof-timestamp'),
        'buttonPrevious' => __('Previous', 'wordproof-timestamp'),
        'buttonNext' => __('Next', 'wordproof-timestamp'),
        'aboutTitle' => __('What is this Timestamp Certificate', 'wordproof-timestamp'),
        'aboutText' => sprintf(
          __('This content is protected with WordProof, a new web standard for a more trustworthy internet. This timestamp exists of a unique hash (summary) based on the title, date and content of this page. It is stored in the blockchain and can never be altered.<br/><br/>You can verify this Timestamp Certificate yourself with the <a target="_blank" rel="noopener noreferrer" href="%s">WordProof Timestamp Checker</a>. The hash of this post is', 'wordproof-timestamp')
          , 'https://wordproof.io/check/'),
      ]);
    }
  }

  public function addScriptAttribute($tag, $handle)
  {
    if ($handle !== 'wordproof.frontend.js')
      return $tag;
    return str_replace(' src', ' defer="defer" src', $tag);
  }

  public function addSchema()
  {
    if (is_singular()) {
      global $post;
      echo SchemaController::getSchema($post->ID);
    }
  }

  private function getUrl()
  {
    $url = self::$default_url;
    return $url;
  }
}
