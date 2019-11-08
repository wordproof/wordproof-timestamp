<?php

namespace WordProofTimestamp\includes\Page;

/**
 * Class AutoStampPage
 * @package WordProofTimestamp\includes\Page
 */
class AutoStampPage
{

  public function __construct()
  {
    add_action('admin_menu', array($this, 'addSettingsPage'));
  }

  public function addSettingsPage()
  {
    add_submenu_page(
      null,
      'Auto Posts Stamper',
      'Auto Stamp',
      'manage_options',
      'wordproof-autostamp',
      array($this, 'generateSettingsPage')
    );
  }

  public function generateSettingsPage()
  {
    self::initDeletion();

    $posts = self::retrievePosts();
    self::localizeScript($posts);

    ?>
      <div class="wrap">
          <h1>WordProof Settings</h1>
          <p>Start auto-stamping <?php echo sizeof($posts); ?> posts which are not timestamped yet. We will skip posts
              that are stamped already. <strong>Please make sure your setup works beforehand.</strong></p>
          <p>Timestamp all of your posts cost <?php echo sizeof($posts); ?> timestamps. If you don't have enough
              timestamps, you <a href="https://my.wordproof.io/sites/upgrade" target="_blank" rel="noopener noreferrer">can
                  upgrade your plan</a>. If you pay for a yearly plan, you'll get a big timestamp bonus</p>
          <button class="wordproof-auto-stamp-submit button button-primary">Start Auto-Stamping</button>
          <div class="wordproof-status"></div>
          <p class="wordproof-status-left"></p>
          <ul class="wordproof-status-list">

          </ul>
      </div>
    <?php
  }

  public function initDeletion()
  {
    if (isset($_GET['remove_timestamp']) && !empty($_GET['remove_timestamp'])) {
      self::removeTimestamp(intval($_GET['remove_timestamp']));
    }
  }

  public function retrievePosts()
  {
    $cpt = 'post';
    $offset = 0;
    $force = false;

    if (isset($_GET['cpt']) && !empty($_GET['cpt'])) {
      $cpt = sanitize_text_field($_GET['cpt']);
    }

    if (isset($_GET['force']) && isset($_GET['offset'])) {
      $offset = intval($_GET['offset']);
      $force = true;
    }

    return self::getPosts($cpt, $offset, $force);
  }

  public function localizeScript($posts)
  {
    wp_localize_script('wordproof.admin.js', 'wordproofAutoStamp', [
      'posts' => $posts,
      'loading' => admin_url() . 'images/spinner-2x.gif'
    ]);
  }

  public function removeTimestamp($id)
  {
    delete_post_meta($id, 'wordproof_timestamp_data');
  }

  public function getPosts($cpt = 'post', $offset = 0, $force = false)
  {

    $metaQueries = ['key' => 'wordproof_timestamp_data', 'compare' => 'NOT EXISTS'];
    if ($force)
      $metaQueries = [];

    $args = [
      'post_status' => 'publish',
      'post_type' => $cpt,
      'numberposts' => 1000,
      'offset' => $offset,
      'meta_query' => [$metaQueries]
    ];
    return $posts = get_posts($args);
  }

}
