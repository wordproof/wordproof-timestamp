<?php

namespace WordProofTimestamp\includes;

class ProductHelper
{
  public static function getDescription($post)
  {
    $description = '';

    if (!empty($post->post_content)) {
      $description = $post->post_content;
    } else if (!empty($post->post_excerpt)) {
      $description = $post->post_excerpt;
    }

    $description = apply_filters('wordproof_hash_product_description', $description, $post->ID);

    return $description;
  }

  public static function maybeReturnAttribute($attribute, $post)
  {
    $product = (function_exists('wc_get_product')) ? wc_get_product($post->ID) : $post;
    $value = self::getAttributeValue($attribute, $product);
    if ($value)
      return [$attribute => $value];

    return [];
  }

  private static function getAttributeValue($attribute, $product) {
    if ($product instanceof WC_Product) {
      switch ($attribute) {
        case 'productId':
          $productIdentifiers = ['isbn', 'gtin', 'mpn', 'ean', 'jan', 'brand'];
          $attributes = $product->getAttributes();
          $productId = false;
          foreach ($attributes as $key => $value) {
            if (in_array(strtolower($key), $productIdentifiers)) {
              $productId = strtolower($key) . ':' . $value;
              break;
            }
          }
          return $productId;
        case 'image':
          return get_the_post_thumbnail_url($product->get_id());
        case 'price':
          return $product->get_price();
        case 'url':
          return DomainHelper::getPermalink($product->get_id());
        default:
          return false;
      }
    }
    return false;
  }
}
