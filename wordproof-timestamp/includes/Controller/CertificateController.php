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
      echo '<div id="wordproof-certificate-modal" style="position: relative; z-index: 999;"></div>';
    }
  }

  public function addScript()
  {
    global $post;
    $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain']);

    if (isset($meta->date) && !empty($meta->blockchain)) {
      $wsfyIsActive = OptionsHelper::isWSFYActive();
      $wsfyOptions = ($wsfyIsActive) ? OptionsHelper::getWSFY([], ['site_token']) : [];

      wp_enqueue_script('wordproof.frontend.js', WORDPROOF_URI_JS . '/frontend.js', [], filemtime(WORDPROOF_DIR_JS . '/frontend.js'), true);

      wp_localize_script('wordproof.frontend.js', 'wordproof', [
        'link' => [
          'url' => $this->getUrl(),
          'text' => OptionsHelper::getCertificateText(),
          'postId' => $post->ID,
        ],
        'modal' => [
          'uid' => $post->ID,
          'css' => WORDPROOF_URI_CSS . '/frontend.css',
          'dateFormat' => null, //TODO
        ],
        'automate' => [
          'active' => $wsfyIsActive,
          'api' => WORDPROOF_WSFY_API_URI . WORDPROOF_WSFY_ENDPOINT_ARTICLE,
          'options' => $wsfyOptions,
        ]
      ]);

      $date = get_the_date('', $post->ID);
      $time = get_the_time('', $post->ID);
      $user = get_user_by('id', $post->post_author);
      $author = $user->display_name;

      wp_localize_script('wordproof.frontend.js', 'wStrings', [
        'previous' => __('Previous', 'wordproof-timestamp'),
        'overview' => [
          'block' => [
            'importance' => [
              'valid' => [
                'title' => __('Content has not changed since the last timestamp', 'wordproof-timestamp'),
                'description' => __('Not the website nor a third party has modified the content of this page since it was last timestamped on the blockchain.', 'wordproof-timestamp'),
              ],
              'invalid' => [
                'title' => __('Content has changed since the last timestamp', 'wordproof-timestamp'),
                'description' => __('The website has updated the content of this page since it was last timestamped on the blockchain.', 'wordproof-timestamp'),
              ],
              'linkText' => __('Why is this important?', 'wordproof-timestamp'),
              'subText' => sprintf(__('Published by %s'), $author),
            ],
            'compare' => [
              'title' => __('Discover how this content changed over time', 'wordproof-timestamp'),
              'description' => __('Because this website timestamps every revision on the blockchain, you can compare the different versions.', 'wordproof-timestamp'),
              'linkText' => __('View previous versions', 'wordproof-timestamp'),
              'subText' => sprintf(__('Last edit on %s at %s'), $date, $time),
            ],
          ],
          'nav' => [
            'valid' => __('This content is WordProof', 'wordproof-timestamp'),
            'invalid' => __('This content is not WordProof', 'wordproof-timestamp'),
          ]
        ],
        'importance' => [
          'title' => __('This content is not WordProof', 'wordproof-timestamp'),
          'text' => __('This content is not WordProof', 'wordproof-timestamp'),
          'cta' => __('This content is not WordProof', 'wordproof-timestamp'),
        ],
        'compare' => [
          'nav' => __('Browse through previous versions', 'wordproof-timestamp'),
          'created' => __('created', 'wordproof-timestamp'),
          'recent' => __('recent', 'wordproof-timestamp'),
          'buttons' => [
            'explanation' => __('Explanation', 'wordproof-timestamp'),
            'raw' => __('View raw input', 'wordproof-timestamp'),
            'checker' => __('Timestamp check', 'wordproof-timestamp'),
            'blockchain' => __('View on blockchain', 'wordproof-timestamp'),
          ]
        ],
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
