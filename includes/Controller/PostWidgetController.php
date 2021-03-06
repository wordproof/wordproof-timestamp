<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class PostWidgetController {
	public function __construct() {
		if ( current_user_can( 'manage_options' ) ) {
			add_action( 'add_meta_boxes', [ $this, 'hook' ] );
		}


		add_action( 'enqueue_block_editor_assets', function () {
			wp_enqueue_script(
				'wordproof_gutenberg_post_meta',
				WORDPROOF_URI_JS . '/gutenberg.js',
				[ 'wp-edit-post' ],
				false,
				false
			);
		} );
	}

	public function hook() {
		add_meta_box(
			'wordproof-meta-box',
			'WordProof',
			[ $this, 'render' ],
			null,
			'side',
			'high',
			''
		);
	}

	public function render() {
		echo '<div id="wordproof-post-widget" data-automate="' . json_encode( OptionsHelper::isWSFYActive() ) . '"></div>';
	}

	public static function isTimestamped() {
		global $post;
		if ( isset( $post->ID ) ) {
			$meta = PostMetaHelper::getPostMeta( $post->ID );

			if ( ! isset( $meta->date ) ) {
				return 'not_timestamped';
			}

			if ( $meta->date !== get_the_modified_date( 'c', $post ) ) {
				return 'outdated';
			}

			if ( ! isset( $meta->blockchain ) || empty( $meta->blockchain ) ) {
				return 'awaiting_webhook';
			}

			return 'timestamped';
		}

		return 'not_timestamped';
	}

	public static function willBeAutoStamped() {
		global $post;

		return in_array( $post->post_type, OptionsHelper::getWSFY( [], 'allowed_post_types' ) );
	}
}
