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

	public static function getUnprotectedPostCount() {
		$transientKey = 'wordproof_unprotected_post_count';
		$transient    = get_transient( $transientKey );

		if ( $transient !== false ) {
			return $transient;
		}

		$query = [
			'post_type'   => [ 'post', 'product', 'attachment' ],
			'post_status' => [ 'publish', 'inherit' ],
			'meta_query'  => [
				[
					'key'     => 'wordproof_timestamp_data',
					'compare' => 'NOT EXISTS'
				]
			],
		];

		$query = new \WP_Query( $query );
		set_transient( $transientKey, $query->found_posts, 0 );

		return $query->found_posts;
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
