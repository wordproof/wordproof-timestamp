<?php

namespace WordProofTimestampFree\includes;

class DomainHelper
{
  public static function getPermalinkOrCustomDomain($post) {
    $custom_domain = get_option('wordproof_custom_domain');
    $permalink = (!empty($post->ID)) ? get_permalink($post->ID) : false;

    if ($custom_domain && $permalink) {
      $url = parse_url($permalink);
      $ret = $custom_domain . $url['path'];
      return $ret;
    }

    if ($custom_domain) {
      return $custom_domain;
    }
    return $permalink;
  }
}