<?php

namespace WordProofTimestamp\includes\Controller;

use Mpdf\Tag\Option;
use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\Page\AutoStampPage;
use WordProofTimestamp\includes\PostMetaHelper;

class OAuthController
{

  private $options;

  public function __construct()
  {
    $this->options = OptionsHelper::getOAuth([]);

    add_action('admin_post_wordproof_oauth_authorize', [$this, 'authorize']);
    add_action('wp_loaded', [$this, 'checkOAuthCallback']);
  }

  public function checkOAuthCallback()
  {
    if (isset($_GET['wordproof_oauth_authorize_callback'])) {
      $this->getAccessTokenAfterAuthorisation();
    }
  }

  public function authorize()
  {
    check_ajax_referer('wordproof', 'security');

    set_transient('wordproof_oauth_state', wp_generate_password(40, false), 600);

    $query = build_query([
      'client_id' => $this->options->client_id,
      'redirect_uri' => get_site_url() . '?wordproof_oauth_authorize_callback',
      'response_type' => 'code',
      'scope' => '*',
      'state' => get_transient('wordproof_oauth_state'),
    ]);

    echo json_encode(['redirect' => 'https://staging.wordproof.io/oauth/authorize?' . $query]);
    die();
  }

  public static function getAccessToken()
  {
    $oauth = OptionsHelper::getOAuth();

    if (self::isExpired($oauth)) {
      error_log('getAccessToken get refreshAccessToken');
      return self::refreshAccessToken();
    }

    error_log($oauth->access_token);
    return $oauth->access_token;
  }

  private static function isExpired($oauth = false)
  {
    if (!$oauth)
      $oauth = OptionsHelper::getOAuth();

    if (!isset($oauth->expiration) || time() > intval($oauth->expiration)) {
      error_log('isExpired true');
      return true;
    }

    return false;
  }

  private static function refreshAccessToken()
  {
    error_log('refreshing');
    $my = new AutomaticHelper(false, true);
    $response = $my->refreshAccessToken();

    error_log(print_r($response, true)); //todo make function with errors

    OptionsHelper::set('access_token', $response->access_token);
    OptionsHelper::set('expiration', time() + intval($response->expires_in));
    OptionsHelper::set('refresh_token', $response->refresh_token);

    return $response->access_token;
  }

  private function getAccessTokenAfterAuthorisation()
  {
    if (isset($_GET['state']) && $_GET['state'] === get_transient('wordproof_oauth_state')) {
      if (isset($_GET['code'])) {

        $my = new AutomaticHelper(false, true);
        $response = $my->getAccessTokenWithCode($_GET['code']);

        OptionsHelper::set('access_token', $response->access_token);
        OptionsHelper::set('expiration', time() + intval($response->expires_in));
        OptionsHelper::set('refresh_token', $response->refresh_token);

        error_log('we have everything we need');
      }
    }
    wp_redirect('wp-admin');
  }
}
