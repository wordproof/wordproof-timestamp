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

  public static function replaceDomainInContent($content, $domain)
  {
    $url = get_site_url();
    $parsedUrl = parse_url($url);
    $host = $parsedUrl['host'];
    $port = $parsedUrl['port'];

    $hostWithPort = '';
    if ($port) {
      $hostWithPort = "${host}:${port}";
    } else {
      $hostWithPort = "${host}";
    }

    return str_replace($hostWithPort, $domain, $content);
  }
}
