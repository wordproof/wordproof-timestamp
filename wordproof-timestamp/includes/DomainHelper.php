<?php

namespace WordProofTimestamp\includes;

class DomainHelper
{

  public static function getPermalink($postId)
  {
    $custom_domain = OptionsHelper::getCustomDomain();
    $permalink = get_permalink($postId);

    if ($custom_domain && $permalink) {
      $url = parse_url($permalink);
      return $custom_domain . $url['path'];
    }

    return $permalink;
  }
}
