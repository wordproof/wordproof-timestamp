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
      if (is_main_query())
        add_filter('the_content', [$this, 'addLink']);

      add_action('wp_head', [$this, 'addSchema']);
      add_action('wp_footer', [$this, 'addModal']);
      add_action('wp_enqueue_scripts', [$this, 'addScript']);
      add_filter('script_loader_tag', [$this, 'addScriptAttribute'], 10, 2);
    }
  }

  public function showCertificate() {
    global $post;
    $meta = PostMetaHelper::getPostMeta($post->ID, ['date', 'blockchain', 'type']);

    switch($meta->type) {
      case 'WebArticleTimestamp':
      case ARTICLE_TIMESTAMP:
        $allowed = true;
        break;
      default:
        $allowed = false;
    }

    if (isset($meta->date) && !empty($meta->blockchain) && $allowed) {
      return true;
    }
  }

  public function addLink($content)
  {
    if ($this->showCertificate() && empty(OptionsHelper::getCertificateDomSelector())) {
      $content .= '<div id="wordproof-certificate-link"></div>';
    }

    return $content;
  }

  public function addModal()
  {
    if ($this->showCertificate()) {
      echo '<div id="wordproof-certificate-modal" style="position: relative; z-index: 9999999999;"></div>';
    }
  }

  public function addScript()
  {
    if ($this->showCertificate()) {
      global $post;

      $wsfyIsActive = OptionsHelper::isWSFYActive();
      $wsfyOptions = ($wsfyIsActive) ? OptionsHelper::getWSFY(['site_token']) : [];

      $endpoint = str_replace('$siteId', $wsfyOptions->site_id, WORDPROOF_WSFY_ENDPOINT_ITEM);
      $endpoint .= $post->ID;

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
          'locale' => get_locale(),
          'lastModified' => get_the_modified_date('c', $post->ID),
        ],
        'automate' => [
          'dom' => OptionsHelper::getCertificateDomSelector(),
          'active' => $wsfyIsActive,
          'api' => WORDPROOF_WSFY_API_URI . $endpoint,
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
              'subText' => sprintf(__('Last edit on %s at %s', 'wordproof-timestamp'), $date, $time),
            ],
            'compare' => [
              'withRevisions' => [
                'title' => __('Discover how this content changed over time', 'wordproof-timestamp'),
                'description' => __('Because this website timestamps every revision on the blockchain, you can compare the different versions.', 'wordproof-timestamp'),
                'linkText' => __('View previous versions', 'wordproof-timestamp'),
              ],
              'withoutRevisions' => [
                'title' => __('Verify the fingerprint of this content', 'wordproof-timestamp'),
                'description' => __('See how this unique fingerprint was generated and verify it in the blockchain.', 'wordproof-timestamp'),
                'linkText' => __('View the input of this timestamp', 'wordproof-timestamp'),
              ],
              'subText' => sprintf(__('Published by %s', 'wordproof-timestamp'), $author),
            ],
          ],
          'nav' => [
            'valid' => __('This content is WordProof', 'wordproof-timestamp'),
            'invalid' => __('This content is not WordProof', 'wordproof-timestamp'),
          ]
        ],
        'importance' => [
          'title' => __('Why does a timestamp on the blockchain matter?', 'wordproof-timestamp'),
          'paragraphs' => [
            __('The unique fingerprint (called the hash) of the latest version of this content has been added to the blockchain. It can’t be changed or removed.', 'wordproof-timestamp'),
            __('Both you and the website have access to the hash and input that corresponds to this hash.', 'wordproof-timestamp'),
            __('You have proof that the owner of this content created it and that it was not tampered with.', 'wordproof-timestamp'),
            __('The website has proof of having this content at certain points in time, which can be used for copyright conflicts.', 'wordproof-timestamp'),
          ],
        ],
        'compare' => [
          'nav' => __('Browse through previous versions', 'wordproof-timestamp'),
          'first' => __('first timestamp', 'wordproof-timestamp'),
          'recent' => __('recent', 'wordproof-timestamp'),
          'at' => __('at', 'wordproof-timestamp'),
          'buttons' => [
            'explanation' => __('Explanation', 'wordproof-timestamp'),
            'raw' => __('Raw input', 'wordproof-timestamp'),
            'compare' => __('Compare', 'wordproof-timestamp'),
            'checker' => __('Timestamp check', 'wordproof-timestamp'),
            'blockchain' => __('View on Blockchain', 'wordproof-timestamp'),
          ],
          'raw' => [
            'nav' => __('Check it yourself', 'wordproof-timestamp'),
          ]
        ]
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
