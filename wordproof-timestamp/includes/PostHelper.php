<?php

namespace WordProofTimestamp\includes;

class PostHelper
{
  public static function getContent($post)
  {
    $postContent = apply_filters('wordproof_hash_post_content', $post->post_content, $post->ID);

    $customDomain = OptionsHelper::getCustomDomain();
    if (!empty($customDomain))
      return self::replaceWithCustomDomain($customDomain, $postContent);

     return $postContent;
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
