<?php

namespace WordProofTimestamp\includes\Controller;

use Firebase\JWT\JWT;
use WordProofTimestamp\includes\DebugLogHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class WebhookController {

	protected $response = null;

	public function __construct($init = true) {

        if ($init) {
            add_action('rest_api_init', [$this, 'registerRoute']);

            // Add fallback actions
            add_action( 'admin_post_nopriv_wordproof_test_callback', [ $this, 'processWebhook' ] );
            add_action( 'admin_post_nopriv_wordproof_callback', [ $this, 'processWebhook' ] );
            add_action( 'admin_post_nopriv_wordproof_wsfy_edit_post', [ $this, 'processWebhook' ] );
        }
	}

    public function registerRoute()
    {
        register_rest_route(WORDPROOF_REST_NAMESPACE, WORDPROOF_REST_TIMESTAMP_ENDPOINT, [
            'methods' => 'POST',
            'callback' => [$this, 'processWebhook'],
            'permission_callback' => '__return_true',
        ]);
    }

	private function isValidWebhook( $action ) {
		if ( $action === null || ! in_array($action, [ 'wordproof_callback', 'wordproof_test_callback' ] ) ) {
            $this->response = 'no_action_present';
            return false;
		}

        // Disable warning for nonce on webhook
        // phpcs:disable
        if ( ! isset( $_REQUEST['token'] ) ) {
            $this->response = 'no_request_token_present';
            return false;
        }
        
        $token = sanitize_text_field( wp_unslash( $_REQUEST['token'] ) );
        // phpcs:enable
        
		$oauth = OptionsHelper::getOAuth( [] );

		if ( ! isset( $oauth->access_token ) ) {
            $this->response = 'no_token_present';
            return false;
        }

        try {
            JWT::decode($token , $oauth->token_id, [ 'HS256' ] );
            return true;
        } catch ( \Exception $exception ) {
            $this->response = 'token_not_valid';
            return false;
        }
	}

	public function processWebhook() {
        // phpcs:ignore
		$action = isset( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) : null;

		if ( ! $this->isValidWebhook( $action ) ) {
            $response = [
                'success'     => false,
                'response'    => $this->response,
                'action'      => ($action) ? $action : 'none',
            ];
            DebugLogHelper::error( 'Webhook failed. ' . print_r( $response, true ) );
            error_log( 'WordProof: Update request denied' );
            error_log( print_r( $response, true ) );
            echo json_encode( $response );
            die();
        }

        switch ( $action ) {
            case 'wordproof_test_callback':
                $this->handleTestWebhook();
                break;
            case 'wordproof_callback':
            default:
            $this->handleModifyPost();
                break;
        }
	}

	public function handleTestWebhook() {
		error_log( 'WordProof: Webhook successfully tested' );
		echo json_encode( [ 'success' => true, 'response' => 'valid_endpoint'] );
		die();
	}

	public function handleModifyPost() {

	    //TODO Refactor to DTO

        // Turning off warnings for missing nonce on webhooks
        // phpcs:disable
		$postId        = isset( $_REQUEST['uid'] ) ? intval( $_REQUEST['uid'] ) : null;
		$chain         = isset( $_REQUEST['chain'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['chain'] ) ) : '';
		$balance       = isset( $_REQUEST['balance'] ) ? intval( $_REQUEST['balance'] ) : false;
		$transactionId = isset( $_REQUEST['transactionId'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['transactionId'] ) ) : '';
        $meta          = ( $postId !== null ) ? PostMetaHelper::getPostMeta( $postId ) : null;
        // phpcs:enable

		if ( ! empty( $meta ) ) {
			$meta->blockchain    = $chain;
			$meta->transactionId = $transactionId;

			PostMetaHelper::savePostMeta( $postId, (array) $meta, true );

			if ( $balance ) {
				OptionsHelper::set( 'balance', $balance );
			}

			echo json_encode( [ 'success' => true, 'response' => 'post_modified' ] );
			die();
		} else {
			error_log( 'Post ' . $postId . ' not updated. ' );
			echo json_encode( [ 'success' => false, 'response' => 'post_not_modified' ] );
			die();
		}
	}
}
