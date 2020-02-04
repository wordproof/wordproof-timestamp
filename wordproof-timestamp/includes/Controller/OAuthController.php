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
    add_action('admin_post', [$this, 'checkOAuthCallback']); //nopriv?
  }

  public function authorize()
  {
    check_ajax_referer('wordproof', 'security');

    set_transient('wordproof_oauth_state', wp_generate_password(40, false), 600);

    $query = build_query([
      'client_id' => $this->options->client_id,
      'redirect_uri' => admin_url('admin-post.php'),
      'response_type' => 'code',
      'scope' => '*',
      'state' => get_transient('wordproof_oauth_state'),
    ]);

    echo json_encode(['redirect' => WORDPROOF_MY_URI . 'oauth/authorize?' . $query]);
    die();
  }

  public function checkOAuthCallback()
  {
    if (isset($_GET['state']) && $_GET['state'] === get_transient('wordproof_oauth_state')) {
      $this->getAccessTokenAfterAuthorisation();
    }
  }

  public static function getAccessToken()
  {
    $oauth = OptionsHelper::getOAuth();

    if (self::isExpired($oauth)) {
      error_log('getAccessToken get refreshAccessToken');
      return self::refreshAccessToken();
    }

    return $oauth->access_token;
  }

  private static function refreshAccessToken()
  {
    $my = new AutomaticHelper(false, true);
    $response = $my->refreshAccessToken();

    if (self::isValidResponse($response)) {
      OptionsHelper::set('access_token', $response->access_token);
      OptionsHelper::set('expiration', time() + intval($response->expires_in));
      OptionsHelper::set('refresh_token', $response->refresh_token);
    }

    return $response->access_token;
  }

  private function getAccessTokenAfterAuthorisation()
  {
    if (isset($_GET['code'])) {

      $my = new AutomaticHelper(false, true);
      $response = $my->getAccessTokenWithCode($_GET['code']);

      if ($this->isValidResponse($response)) {
        OptionsHelper::set('site_token', '');
        OptionsHelper::set('access_token', $response->access_token);
        OptionsHelper::set('expiration', time() + intval($response->expires_in));
        OptionsHelper::set('refresh_token', $response->refresh_token);
      }
    }

    wp_redirect(admin_url('admin.php?page=wordproof-wizard#connect'));
  }

  private static function isValidResponse($response) //TODO: Log
  {
    return (isset($response->access_token) && isset($response->expires_in) && isset($response->refresh_token)
      && isset($response->access_token) && $response->token_type === 'Bearer');
  }

  private static function isExpired($oauth = false)
  {
    if (!$oauth)
      $oauth = OptionsHelper::getOAuth();

    if (!isset($oauth->expiration) || time() > intval($oauth->expiration)) {
      return true;
    }

    return false;
  }
}
