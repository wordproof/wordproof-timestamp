<?php

namespace WordProofTimestamp\includes;

class UpdateHelper
{
  private $migration_version_200 = 'wordproof_migration_200_completed';

  public function __construct()
  {

    if (get_option($this->migration_version_200, false) === false)
      $this->migrate_200();
  }

  /**
   * Version 200 changed some option keys. This migration will fix this.
   */
  private function migrate_200()
  {
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
}
