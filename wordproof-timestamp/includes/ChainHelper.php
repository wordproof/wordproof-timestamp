<?php

namespace WordProofTimestamp\includes;

class ChainHelper
{
  public function __construct()
  {
    add_action('wp_ajax_wordproof_get_balance', array($this, 'returnWordBalance'));
//    add_action('current_screen', array($this, 'getWordBalance'));
  }

  public function getWordBalance()
  {
    $balanceCheckNeeded = ['edit', 'post', 'toplevel_page_wordproof'];
    $currentPage = get_current_screen()->base;

    if (in_array($currentPage, $balanceCheckNeeded)) {
      $accountName = OptionsHelper::getAccountName();
      if ($accountName !== false) {
        $chain = OptionsHelper::getNetwork();
        self::sendRequest($accountName, $chain);
      }
    }
  }

  public function returnWordBalance()
  {
    check_ajax_referer('wordproof', 'security');
    if (!current_user_can('manage_options')) {
      exit;
    }
    $chain = OptionsHelper::getNetwork();

    if (isset($_REQUEST['accountName'])) {
      $accountName = sanitize_text_field($_REQUEST['accountName']);
      $result = self::sendRequest($accountName, $chain);
      echo json_encode(['success' => true, 'balance' => $result]);
      exit;
    } else {
      echo json_encode(['success' => false, 'message' => 'No accountname']);
      exit;
    }
  }

  /**
   * @param $accountName
   * @param $chain
   * @return bool|string
   */
  private function sendRequest($accountName, $chain)
  {
    $networkDetails = self::getNetworkDetails($chain);
    $endpoint = self::getEndpoint('getCurrencyBalance');

    $body = [
      'code' => 'wordtokeneos',
      'account' => $accountName,
      'symbol' => 'WORD',

    ];
    $args = [
      'headers' => [
        'Content-Type' => 'application/json',
      ],
      'body' => json_encode($body)
    ];
    $url = $networkDetails['protocol'] . '://' . $networkDetails['host'] . $endpoint;
    $response = wp_remote_post($url, $args);

    if (is_wp_error($response)) {
      return $response->get_error_message();
    } else {
      $balance = $response['body'];
      $balance = substr($balance, 2);
      $balance = substr($balance, 0, -2);
      update_option('wordproof_balance', $balance);
      return $balance;
    }
  }

  private function getNetworkDetails($chain)
  {
    $networks = array(
      'eos_main' =>
        array(
          'host' => 'eos.greymass.com',
          'port' => 443,
          'protocol' => 'https',
          'chainId' => 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        ),
      'telos_main' =>
        array(
          'host' => 'telosapi.eosawake.io',
          'port' => 443,
          'protocol' => 'https',
          'chainId' => '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
        ),
      'eos_jungle' =>
        array(
          'host' => 'api.jungle.alohaeos.com',
          'port' => 443,
          'protocol' => 'https',
          'chainId' => 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
        ),
    );
    return $networks[$chain];
  }

  private function getEndpoint($endpoint)
  {
    $endpoints = [
      'getCurrencyBalance' => '/v1/chain/get_currency_balance'
    ];
    return $endpoints[$endpoint];
  }
}
