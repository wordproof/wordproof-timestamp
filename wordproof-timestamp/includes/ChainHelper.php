<?php

namespace WordProofTimestampFree\includes;

class ChainHelper
{
  public function __construct()
  {
    add_action('current_screen', array($this, 'getWordBalance'));
  }

  public function getWordBalance() {
    $balanceCheckNeeded = ['edit', 'post', 'toplevel_page_wordproof'];
    $currentPage = get_current_screen()->base;

    if (in_array($currentPage, $balanceCheckNeeded)) {
      $accountName = get_option('wordproof_accountname');
      if ($accountName !== false) {
        $chain = get_option('wordproof_network');
        self::sendRequest($accountName, $chain);
      }
    }
  }

  /**
   * Open for api
   * @param $accountName
   * @param $chain
   */
  private function sendRequest($accountName, $chain)
  {
    $networkDetails = self::getNetworkDetails($chain);
    $endpoint = self::getEndpoint('getCurrencyBalance');

    $body = [
      'code' => 'wordtokeneos', //TODO PAYBACK ACCOUNT
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
      $error_message = $response->get_error_message();
      echo 'Something went wrong: $error_message';
    } else {
      $balance = $response['body'];
      $balance = substr($balance, 2);
      $balance = substr($balance, 0, -2);
      update_option('wordproof_balance', $balance);
    }
  }

  private function getNetworkDetails($chain)
  {
    $networks = array(
      'eos_main' =>
        array(
          'host' => 'api.eosdetroit.io/',
          'port' => 443,
          'protocol' => 'https',
          'chainId' => 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        ),
      'telos_main' =>
        array(
          'host' => 'telosapi.eosawake.io/',
          'port' => 443,
          'protocol' => 'https',
          'chainId' => '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
        ),
      'eos_jungle' =>
        array(
          'host' => 'api.jungle.alohaeos.com/',
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
      'getTableRow' => 'v1/chain/get_table_rows',
      'getCurrencyBalance' => 'v1/chain/get_currency_balance'
    ];
    return $endpoints[$endpoint];
  }
}
