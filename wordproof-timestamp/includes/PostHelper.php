<?php

namespace WordProofTimestamp\includes;

class PostHelper
{
  public static function getContent($post)
  {
    $customDomain = OptionsHelper::getCustomDomain();
    if (!empty($customDomain))
      return self::replaceWithCustomDomain($customDomain, $post->post_content);

     return $post->post_content;
  }

  private static function replaceWithCustomDomain($customDomain, $content) {

    $url = get_site_url();
    $parsedUrl = parse_url($url);
    $host = $parsedUrl['host'];
    $port = $parsedUrl['port'];

    if ($port) {
      $hostWithPort = "${host}:${port}";
    } else {
      $hostWithPort = "${host}";
    }

    return str_replace($hostWithPort, $customDomain, $content);
  }
}
