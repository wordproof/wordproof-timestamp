<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class ECommerceController
{

  public function __construct()
  {
    add_filter('woocommerce_email_attachments', [$this, 'attachFiles'], 10, 3);
    add_action('wordproof_after_saving_timestamp_meta_data', [$this, 'onTimestamp']);
  }

  public function onTimestamp($postId) {
    $post = get_post($postId);
    if ($post->post_type === 'product')
      self::createTxtFile($post);
  }

  public function attachFiles($attachments, $email_id, $order)
  {
    if (!is_a($order, 'WC_Order') || !isset($email_id)) {
      return $attachments;
    }

    foreach ($order->get_items() as $item_id => $item) {
      $product = $item->get_product();
      $file = $this->getFilePath($product->get_title());

      if (file_exists($file))
        $attachments[] = $file;
    }

    return $attachments;
  }

  public static function createTxtFile($post)
  {
    $data = HashController::getHash($post, true);
    $data .= PHP_EOL . PHP_EOL . 'Blockchain Transaction: ';
    $data .= HashController::getBlockchainLink($post->ID);
    file_put_contents(self::getFilePath($post->post_title), $data);
  }

  private static function getFilePath($postTitle) {
    $uploadDir = wp_upload_dir();
    $wordproofDir = $uploadDir['basedir'] . '/' . 'wordproof';

    if (!file_exists($wordproofDir))
      wp_mkdir_p($wordproofDir);

    $fileName = self::getFileName($postTitle, 'txt');

    return $wordproofDir . '/' . $fileName;
  }

  private static function getFileName($string, $extension)
  {
    return preg_replace('/[^a-zA-Z0-9_-]+/', '-', strtolower($string)) . '.' . $extension;
  }
}
