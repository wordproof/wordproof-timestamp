<?php

namespace WordProofTimestamp\includes;

class PostHelper {
	public static function getContent( $post ) {
		$postContent = apply_filters( 'wordproof_hash_post_content', $post->post_content, $post->ID );

		$customDomain = OptionsHelper::getCustomDomain();
		if ( ! empty( $customDomain ) ) {
			return self::replaceWithCustomDomain( $customDomain, $postContent );
		}

		return $postContent;
	}

	public static function getUnprotectedPosts( $type, $forceRefresh = false, $onlyCount = false ) {
		$transientKey = "wordproof_unprotected_{$type}_count";
		$transient    = get_transient( $transientKey );

		if ( !$forceRefresh && $transient !== false ) {
			ray('transient');
			return $transient;
		}

		$query = [
			'post_type'      => [ $type ],
			'fields'         => 'ids',
			'posts_per_page' => - 1,

			'post_status' => [ 'publish', 'inherit' ],
			'meta_query'  => [
				[
					'key'     => 'wordproof_timestamp_data',
					'compare' => 'NOT EXISTS'
				]
			],
		];

		$query = new \WP_Query( $query );

		if ($onlyCount)
			return $query->found_posts;

		return ['count' => $query->found_posts, 'ids' => $query->posts];

	}

	public static function getTotalUnprotectedPostCount() {
		$transientKey = 'wordproof_total_unprotected_post_count';
		$transient    = get_transient( $transientKey );

		if ( $transient !== false ) {
			return $transient;
		}

		$amount = 0;
		foreach (get_post_types( [ 'public' => true ] ) as $postType) {
			$amount += self::getUnprotectedPosts($postType, true, true);
 		}

		set_transient( $transientKey, $amount, 0 );

		return $amount;
	}

	private static function replaceWithCustomDomain( $customDomain, $content ) {

		$url       = get_site_url();
		$parsedUrl = parse_url( $url );
		$host      = $parsedUrl['host'];
		$port      = $parsedUrl['port'];

		if ( $port ) {
			$hostWithPort = "${host}:${port}";
		} else {
			$hostWithPort = "${host}";
		}

		return str_replace( $hostWithPort, $customDomain, $content );
	}
}
