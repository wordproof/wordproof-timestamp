<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class AutomaticHooksController {

	public function __construct() {
		add_action( 'admin_post_wordproof_validate_token', [ $this, 'validateToken' ] );

		add_action( WORDPROOF_WSFY_CRON_HOOK, [ $this, 'createPost' ] );

		add_action( 'wp_ajax_nopriv_wordproof_get_articles', [ $this, 'getArticles' ] );
		add_action( 'wp_ajax_wordproof_get_articles', [ $this, 'getArticles' ] );
		add_action( 'wp_ajax_wordproof_get_refreshed_balance', [ $this, 'getNewBalance' ] );
		add_action( 'wp_ajax_wordproof_get_post_data', [ $this, 'getPostData' ] );
		add_action( 'wp_ajax_wordproof_get_unprotected_posts', [ $this, 'getUnprotectedPosts' ] );

        if ( OptionsHelper::isWSFYActive() ) {
			$this->setUpdateHooks();
		}
	}

	public function createPost( $postId ) {
		$helper = new AutomaticHelper( $postId );
		$helper->createPost();
	}

	public function setUpdateHooks() {
		$options = OptionsHelper::getWSFY( [] );
		if ( isset( $options->allowed_post_types ) ) {
			foreach ( $options->allowed_post_types as $postType ) {
				add_action( 'publish_' . $postType, [ $this, 'setCron' ] );
			}
		}
	}

	public function getArticles() {
		check_ajax_referer( 'wordproof', 'security' );

		if ( !isset( $_REQUEST ) ) {
			return;
		}

		if (!isset($_REQUEST['post_id'])) {
            return;
        }

		$postId     = intval( sanitize_text_field( wp_unslash( $_REQUEST['post_id'] ) ) );
		$controller = new AutomaticHelper( $postId );
		$result     = $controller->getArticles();
		echo json_encode( $result, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
		die();
	}

	public function getNewBalance() {
		check_ajax_referer( 'wordproof', 'security' );
		$controller = new AutomaticHelper();
		$balance    = $controller->getBalance();
		echo json_encode( [ 'balance' => $balance ] );
		die();
	}

	public function validateToken() {
		check_ajax_referer( 'wordproof', 'security' );
		$controller = new AutomaticHelper();
		$body       = $controller->validateToken();
		echo json_encode( $body );
		die();
	}

	public function getPostData() {
		check_ajax_referer( 'wordproof', 'security' );

        if ( !isset( $_REQUEST ) ) {
            return;
        }

        if (!isset($_REQUEST['post_id'])) {
            return;
        }

		$postId     = intval( sanitize_text_field( wp_unslash( $_REQUEST['post_id'] ) ) );
		$postData = PostMetaHelper::getPostData( $postId );
		$meta     = PostMetaHelper::getPostMeta( $postId, [ 'date', 'blockchain' ] );
		echo json_encode( [ 'post' => $postData, 'meta' => $meta ] );
		die();
	}

	/**
	 * Returns post ids without the WordPress meta field, per post type
	 */
	public function getUnprotectedPosts() {
		check_ajax_referer( 'wordproof', 'security' );

		$postTypes = [];
		foreach ( get_post_types( [ 'public' => true ] ) as $postType ) {
			$postTypes[$postType] = PostHelper::getUnprotectedPosts($postType, true);
		}

		echo json_encode( $postTypes );
		die();
	}

	public function setCron( $postId ) {
		if ( ! wp_next_scheduled( WORDPROOF_WSFY_CRON_HOOK, [ $postId ] ) ) {
			wp_schedule_single_event( time() + 7, WORDPROOF_WSFY_CRON_HOOK, [ $postId ] );
		}
	}
}
