<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class PostColumnController {

	public $options;

	public function __construct() {
		$showColumn = true;
		if ( OptionsHelper::getHidePostColumn() ) {

			$userMeta = get_userdata( get_current_user_id() );
			$roles    = $userMeta->roles;

			if ( ! is_array( $roles ) || ! in_array( 'administrator', $roles, true ) ) {
				$showColumn = false;
			}
		}

		if ( $showColumn ) {
			add_filter( 'manage_posts_columns', array( $this, 'addColumn' ) );
			add_action( 'manage_posts_custom_column', array( $this, 'addColumnContent' ), 10, 2 );
			add_filter( 'manage_pages_columns', array( $this, 'addColumn' ) );
			add_action( 'manage_pages_custom_column', array( $this, 'addColumnContent' ), 10, 2 );
			add_filter( 'manage_media_columns', array( $this, 'addColumn' ) );
			add_action( 'manage_media_custom_column', array( $this, 'addColumnContent' ), 10, 2 );
		}

		add_action( 'wp_ajax_wordproof_wsfy_save_post', [ $this, 'savePost' ] );
		add_action( 'wp_ajax_wordproof_wsfy_retry_webhook', [ $this, 'retryWebhook' ] );
		add_filter( 'default_hidden_columns', [ $this, 'defaultHiddenColumns' ], 10, 2 );
	}

	public function defaultHiddenColumns( $hidden, $screen ) {
		if ( $screen->base !== 'edit' ) {
			return $hidden;
		}

		$defaultShow = ['post', 'page', 'attachment'];
		if ( in_array( $screen->post_type, $defaultShow ) ) {
			return $hidden;
		}

		$show = array_merge(OptionsHelper::getWSFYField( 'allowed_post_types' ), $defaultShow);
		$registered = array_values( get_post_types( [ 'public' => true ] ) );
		$defaultHidden = array_diff($registered, $show);

		if ( in_array( $screen->post_type, $defaultHidden ) ) {
			$hidden[] = 'wordproof';
		}

		return $hidden;
	}

	public function savePost() {
		check_ajax_referer( 'wordproof', 'security' );

		if ( ! isset( $_REQUEST ) ) {
			return;
		}

		$postId     = intval( sanitize_text_field( wp_unslash( $_REQUEST['post_id'] ) ) );
		$controller = new AutomaticHelper( $postId );
		$result     = $controller->createPost();
		echo json_encode( $result );
		die();
	}

	public function retryWebhook() {
		check_ajax_referer( 'wordproof', 'security' );
		$postId     = intval( sanitize_text_field( $_REQUEST['post_id'] ) );
		$controller = new AutomaticHelper( $postId );
		$result     = $controller->retryWebhook();
		echo json_encode( $result );
		die();
	}

	public function addColumn( $defaults ) {
		$defaults['wordproof'] = 'WordProof';

		return $defaults;
	}

	public function addColumnContent( $column_name ) {
		global $post;
		if ( $column_name == 'wordproof' ) {

			$meta     = PostMetaHelper::getPostMeta( $post->ID, [ 'date', 'blockchain' ] );
			$postData = PostMetaHelper::getPostData( $post );

			echo '<div class="wordproof-timestamp-button" data-automate="' . json_encode( OptionsHelper::isWSFYActive() ) . '" data-post="' . urlencode( json_encode( $postData ) ) . '" data-meta="' . urlencode( json_encode( $meta ) ) . '"></div>';
		}
	}
}
