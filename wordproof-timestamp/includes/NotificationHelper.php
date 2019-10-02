<?php

namespace WordProofTimestamp\includes;

class NotificationHelper
{
  public function __construct()
  {
    if (!OptionsHelper::isWSFYActive()) {
      add_action('admin_notices', array($this, 'checkForNotices'));
      add_filter('post_type_labels_post', array($this, 'changePostUpdateMessages'));
      add_filter('post_type_labels_page', array($this, 'changePageUpdateMessages'));
    }
  }

  public function checkForNotices()
  {
    //Has not completed setup
    if (get_option(AnalyticsHelper::$optionNetwork, false) === false) {
      self::setupPlugin();
      return;
    }

    if (get_option(AnalyticsHelper::$optionWalletConnected, false) === false) {
      self::connectToWallet();
      return;
    }

    $screen = get_current_screen();
    switch ($screen->base) {
      case 'edit':
        self::checkEditScreen();
    }
  }

  public function checkEditScreen()
  {
    $count = get_option(AnalyticsHelper::$optionTimestampCount, 0);
    if ($count < 1) {
      self::startTimestamping();
      return;
    }

    $lastTimestamped = get_option(AnalyticsHelper::$optionLastTimestamp, 0);
    if (current_time('timestamp') > ($lastTimestamped + 604800)) {
      self::keepTimestamping();
      return;
    }
  }

  public function changePostUpdateMessages($labels)
  {
      $labels->item_updated = __( 'Your post has been updated but is at risk. Timestamp your content now to claim ownership.' );
      $labels->item_published = __( 'Your post is published. Timestamp your content to claim ownership.' );
      return $labels;
  }
  public function changePageUpdateMessages($labels)
  {
      $labels->item_updated = __( 'Your page has been updated but is at risk. Timestamp your content now to claim ownership.' );
      $labels->item_published = __( 'Your page is published. Timestamp your content to claim ownership.' );
      return $labels;
  }

  private function setupPlugin()
  {
    $message = 'Protect your content and proof the authenticity of your content to visitors and search engines. Start the Wizard to get you started with WordProof!';
    $type = 'info';
    $buttonText = 'Setup WordProof Timestamp';
    $buttonLink = menu_page_url('wordproof-dashboard', false);
    echo self::getNotificationTemplate($type, $message, $buttonText, $buttonLink);
  }

  private function connectToWallet()
  {
    $message = 'It looks like you started the WordProof Setup Wizard, but did not timestamp yet! Join our <a target="_blank" rel="noopener noreferrer" href="https://t.me/joinchat/DVuJAEfhf2QURBBjOWc2XA">Telegram group</a> for help, or send us an <a href="https://wordproof.io/contact">email</a>.';
    $type = 'info';
    echo self::getNotificationTemplate($type, $message);
  }

  private function startTimestamping()
  {
    $message = 'You completed the setup, but did not protect your content by timestamping yet. Start now!';
    $type = 'info';
    echo self::getNotificationTemplate($type, $message);
  }

  private function keepTimestamping()
  {
    $message = 'It has been a week since you last protected your content on the blockchain. Timestamp a new post to get started!';
    $type = 'info';
    echo self::getNotificationTemplate($type, $message);
  }

  private function getNotificationTemplate($type, $message, $buttonText = '', $buttonLink = '', $isDismissible = false)
  {
    ob_start(); ?>
      <div class="notice notice-<?php echo $type; ?> <?php echo ($isDismissible) ? 'is-dismissible' : ''; ?>">
          <p><?php _e($message, WORDPROOF_SLUG); ?></p>
        <?php if (!empty($buttonLink)): ?>
            <p><a href="<?php echo $buttonLink; ?>"><?php _e($buttonText, WORDPROOF_SLUG); ?></a></p>
        <?php endif; ?>
      </div>
    <?php
    return ob_get_clean();
  }
}
