<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\AutomaticHelper;
use WordProofTimestamp\includes\DomainHelper;
use WordProofTimestamp\includes\OptionsHelper;
use WordProofTimestamp\includes\PostMetaHelper;

class PostFilterController {

	private $metaKey = 'wordproof_timestamp_data';

	public function __construct() {
		add_filter( 'views_edit-post', [ $this, 'addPostsFilterHtml' ] );
		add_filter( 'views_edit-page', [ $this, 'addPostsFilterHtml' ] );
		add_action( 'load-edit.php', [ $this, 'postsFilterOnEdit' ] );
	}

	public function addPostsFilterHtml( $views ) {
		$screen                         = get_current_screen();
		$postType                       = $screen->post_type;
		$count                          = $this->getUnprotectedCount( $postType );
		$views['wordproof_unprotected'] = '<a href="edit.php?meta_data=wordproof_unprotected&post_type=' . $postType . '">Unprotected <span class="count">(' . $count . ')</span></a>';

		return $views;
	}

	public function postsFilterOnEdit() {
		if ( isset( $_GET['meta_data'] ) && $_GET['meta_data'] === 'wordproof_unprotected' ) {
			add_filter( 'request', [ $this, 'postsFilterQuery' ] );
		}
	}

	public function postsFilterQuery( $query ) {
		$query['meta_key']      = $this->metaKey;
		$query['meta_compare']  = 'NOT EXISTS';
		$query['meta_relation'] = 'AND';

		return $query;
	}

	private function getUnprotectedCount( $postType ) {
		$query = new \WP_Query( [
			'post_type'    => $postType,
			'meta_key'     => $this->metaKey,
			'meta_compare' => 'NOT EXISTS'
		] );

		return $query->found_posts;
	}
}
