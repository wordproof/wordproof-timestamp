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

  public static function getCustomDomain() {
    $custom_domain = get_option('wordproof_custom_domain');
    return $custom_domain; 
  }

  public static function replaceDomainInContent($content, $domain) {
    $url = get_site_url();
    $parsed_url = parse_url($url);
    $host = $parsed_url['host'];
    $port = $parsed_url['port'];

    $host_with_port = '';
    if ($port) {
      $host_with_port = "${host}:${port}";
    } else {
      $host_with_port = "${host}";
    }

    return str_replace($host_with_port, $domain, $content);
  }
}