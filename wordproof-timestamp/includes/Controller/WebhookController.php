<?php

namespace WordProofTimestamp\includes\Controller;

use Firebase\JWT\JWT;
use WordProofTimestamp\includes\DebugLogHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class WebhookController {

	protected $response = null;

	public function __construct() {
        add_action('rest_api_init', [$this, 'registerRoute']);

        // Add fallback actions
		add_action( 'admin_post_nopriv_wordproof_test_callback', [ $this, 'processWebhook' ] );
		add_action( 'admin_post_nopriv_wordproof_callback', [ $this, 'processWebhook' ] );
		add_action( 'admin_post_nopriv_wordproof_wsfy_edit_post', [ $this, 'processWebhook' ] );
	}

    public function registerRoute()
    {
        register_rest_route(WORDPROOF_REST_NAMESPACE, WORDPROOF_REST_TIMESTAMP_ENDPOINT, [
            'methods' => 'POST',
            'callback' => [$this, 'processWebhook'],
        ]);
    }

	private function isValidWebhook( $action ) {

		if ( $action === null || ! in_array($action, [ 'wordproof_callback', 'wordproof_test_callback' ] ) ) {
            $this->response = 'no_action_present';
            return false;
		}

        if ( ! isset( $_REQUEST['token'] ) ) {
            $this->response = 'no_request_token_present';
            return false;
        }

		$oauth = OptionsHelper::getOAuth( [] );

		if ( ! isset( $oauth->access_token ) ) {
            $this->response = 'no_token_present';
            return false;
        }

        try {
            JWT::decode( $_REQUEST['token'], $oauth->token_id, [ 'HS256' ] );
            return true;
        } catch ( \Exception $exception ) {
            $this->response = 'token_not_valid';
            return false;
        }
	}

	public function processWebhook() {
        $action = isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : null;

		if ( ! $this->isValidWebhook( $action ) ) {
            $response = [
                'success'     => false,
                'response'    => $this->response,
                'action'      => $action
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
		$postId        = ( $_REQUEST['uid'] ) ? intval( $_REQUEST['uid'] ) : null;
		$chain         = ( $_REQUEST['chain'] ) ? sanitize_text_field( $_REQUEST['chain'] ) : '';
		$balance       = ( $_REQUEST['balance'] ) ? intval( $_REQUEST['balance'] ) : false;
		$transactionId = ( $_REQUEST['transactionId'] ) ? sanitize_text_field( $_REQUEST['transactionId'] ) : '';
		$meta          = ( $postId !== null ) ? PostMetaHelper::getPostMeta( $postId ) : null;

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
