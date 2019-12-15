<?php

namespace WordProofTimestamp\includes;

use WordProofTimestamp\includes\Controller\AutomateController;

class UpdateHelper
{
  private $migration_version_200 = 'wordproof_migration_200_completed';
  private $migration_version_240 = 'wordproof_migration_240_completed';

  public function __construct()
  {
    if (!wp_cache_get($this->migration_version_200))
      if (!get_option($this->migration_version_200, false))
        $this->migrate_200();

    add_action('upgrader_process_complete', [$this, 'isUpdated'], 10, 2);
  }

  public function isUpdated($upgrader_object, $options)
  {
    if ($options['action'] === 'update' && $options['type'] === 'plugin' && isset($options['plugins'])) {
      foreach ($options['plugins'] as $plugin) {

        if ($plugin === WORDPROOF_BASENAME) {
          if (!get_option($this->migration_version_240, false))
            $this->migrate_240();
        }

      }
    }
  }

  /**
   * Version 200 changed some option keys. This migration will fix this.
   */
  private function migrate_200()
  {
    wp_cache_set($this->migration_version_200, true);
    update_option($this->migration_version_200, true);

    $wsfyOptions = get_option('wordproof_wsfy');

    if (!$wsfyOptions || !is_array($wsfyOptions) || empty($wsfyOptions))
      return;

    $newOptions = [];

    if (isset($wsfyOptions['accessToken']))
      $newOptions['site_token'] = $wsfyOptions['accessToken'];

    if (isset($wsfyOptions['siteId']))
      $newOptions['site_id'] = $wsfyOptions['siteId'];

    if (isset($wsfyOptions['noRevisions']))
      $newOptions['show_revisions'] = ($wsfyOptions['noRevisions'] ? false : true);

    if (isset($wsfyOptions['allowedPostTypes']) && is_array($wsfyOptions['allowedPostTypes']))
      $newOptions['allowed_post_types'] = $wsfyOptions['allowedPostTypes'];

    if (isset($wsfyOptions['active']))
      OptionsHelper::set('wsfy_is_active', $wsfyOptions['active']);

    OptionsHelper::set('wsfy', $newOptions);
  }

  /**
   * Get site balance for existing users
   */
  private function migrate_240()
  {
    update_option($this->migration_version_240, true);
    AutomateController::getBalance();
  }
}
