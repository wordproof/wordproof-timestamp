<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\PostMetaHelper;

class DashboardWidgetController {

	public $options;

	public function __construct() {
		add_action( 'wp_dashboard_setup', [ $this, 'hook' ] ); //todo only for certain users and option to hide
	}

	public function hook() {
		wp_add_dashboard_widget(
			'wordproof_dashboard_widget',
			'WordProof Timestamp',
			[ $this, 'render' ]
		);

		$this->sortWidgets();
	}

	public function render() {
		echo '<div id="wordproof-dashboard-widget"></div>';
	}

	public function sortWidgets() {
		global $wp_meta_boxes;

		$currentDashboard = $wp_meta_boxes['dashboard']['normal']['core'];
		$widget           = array( 'wordproof_dashboard_widget' => $currentDashboard['wordproof_dashboard_widget'] );
		unset( $currentDashboard['wordproof_dashboard_widget'] );
		$sortedDashboard                              = array_merge( $widget, $currentDashboard );
		$wp_meta_boxes['dashboard']['normal']['core'] = $sortedDashboard;
	}

	public static function getRecentlyStampedItems() {
		$posts  = self::getRecentPosts( [ 'post', 'attachment', 'product' ], 'EXISTS', 20, true, true );
		$format = get_option( 'date_format' ) . ' ' . get_option( 'time_format' );

		$items = [];
		foreach ( $posts as $post ) {
			$timestamp = get_post_meta( $post->ID, 'wordproof_last_timestamped_on', true );

			$item['title'] = $post->post_title;
			$item['date']  = date( $format, $timestamp );
			$item['url']   = get_permalink( $post );
			$item['type']  = get_post_type( $post );
			$items[]       = $item;
		}

		return $items;
	}

	public static function getRecentPosts(
		$postType,
		$compare = 'NOT EXISTS',
		$amount = 3,
		$postsOnly = false,
		$stamped = false,
		$hideEmptyContent = false
	) {
		$status = ( is_string( $postType ) && $postType === 'attachment' ) ? 'inherit' : 'publish';

		$result = [];

		$query = [
			'post_type'      => $postType,
			'posts_per_page' => $amount,
			'post_status'    => [ 'publish', 'inherit' ],
			'meta_query'     => [
				[
					'key'     => 'wordproof_timestamp_data',
					'compare' => $compare
				]
			],
		];

		if ( $stamped ) {
			$query = array_merge( $query, [
				'meta_key' => 'wordproof_last_timestamped_on',
				'orderby'  => 'meta_value'
			] );
		}

		if ( $hideEmptyContent ) {
			add_filter('posts_where', function( $where = '' ) {
				return $where .= "AND trim(coalesce(post_content, '')) <>''";
			} );
		}

		$query = new \WP_Query( $query );
		$posts = $query->get_posts();

		wp_reset_postdata();

		if ( $postsOnly ) {
			return $posts;
		}

		foreach ( $posts as $post ) {
			$meta     = PostMetaHelper::getPostMeta( $post->ID, [ 'date', 'blockchain' ] );
			$postData = PostMetaHelper::getPostData( $post );

			$result[] = [ 'post' => $postData, 'meta' => $meta ];
		}

		return $result;
	}

	/**
	 * @return string
	 * TODO: Yup. Refactor this please.
	 */
	public static function getUnprotectedWarning() {
		$pages       = self::getUnprotectedPostsCount( 'page' );
		$posts       = self::getUnprotectedPostsCount( 'post' );
		$attachments = self::getUnprotectedPostsCount( 'attachment' );
		if ( ! self::showWarning( $pages ) && ! self::showWarning( $posts ) && ! self::showWarning( $attachments ) ) {
			return 'Everything is protected. Congratulations!';
		}

		$end = ' are at risk of copying and miss potential SEO benefits. Timestamp them today.';

		if ( boolval( $pages ) && boolval( $posts ) && boolval( $attachments ) ) {
			return $pages . ' pages, ' . $posts . ' posts and ' . $attachments . ' of your attachments' . $end;
		}

		if ( boolval( $pages ) && boolval( $posts ) ) {
			return $pages . ' pages and ' . $posts . ' of your posts' . $end;
		}

		if ( boolval( $pages ) && boolval( $attachments ) ) {
			return $pages . ' pages and ' . $posts . ' of your attachments' . $end;
		}

		if ( boolval( $posts ) && boolval( $attachments ) ) {
			return $posts . ' posts and ' . $attachments . ' of your attachments' . $end;
		}

		if ( boolval( $pages ) ) {
			return self::getOneliner( $pages, 'pages' ) . $end;
		}

		if ( boolval( $posts ) ) {
			return self::getOneliner( $pages, 'posts' ) . $end;
		}

		if ( boolval( $attachments ) ) {
			return self::getOneliner( $pages, 'attachments' ) . $end;
		}
	}


	private static function showWarning( $amount ) {
		return $amount > 0;
	}


	private static function getOneliner( $amount, $type ) {
		return $amount . ' of your ' . $type;
	}

	public static function getTotalUnprotectedCount() {
		//TODO: refactor please
		return self::getUnprotectedPostsCount( 'page' ) + self::getUnprotectedPostsCount( 'post' ) + self::getUnprotectedPostsCount( 'attachment' );
	}

	public static function getUnprotectedPostsCount( $postType ) {
		//TODO: refactor please
		$postStatus = ( $postType === 'attachment' ) ? 'inherit' : 'publish';
		$total      = wp_count_posts( $postType )->$postStatus;
		$protected  = self::getProtectedPosts( $postType, $postStatus );

		return intval( $total - $protected );
	}

	private static function getProtectedPosts( $postType, $postStatus ) {
		//TODO: refactor please
		global $wpdb;
		$s = $wpdb->get_var( $wpdb->prepare( "SELECT count(*) FROM $wpdb->postmeta AS `M` INNER JOIN $wpdb->posts AS `P` ON `M`.`post_id` = `P`.`ID` WHERE `M`.`meta_key` = 'wordproof_timestamp_data' AND `P`.`post_status` = %s AND `P`.`post_type` = %s",
			$postStatus, $postType ) );

		return intval( $s );
	}

	private static function getUnprotectedPostIds( $postType ) {
		//TODO: We should use something like this. Now using get_posts with wp_list_pluck
		$postStatus = ( $postType === 'attachment' ) ? 'inherit' : 'publish';
		global $wpdb;
		$s = $wpdb->get_var( $wpdb->prepare( "SELECT `ID` FROM $wpdb->posts AS `P` INNER JOIN $wpdb->postmeta AS `M` ON `P`.`ID` = `M`.`post_id` WHERE `M`.`meta_key` = 'wordproof_timestamp_data' AND `P`.`post_status` = %s AND `P`.`post_type` = %s",
			$postStatus, $postType ) );

		return intval( $s );
	}
}
