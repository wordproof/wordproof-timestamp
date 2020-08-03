<?php

namespace WordProofTimestamp\includes\Resource;

use WordProofTimestamp\includes\Controller\HashController;
use WordProofTimestamp\includes\OptionsHelper;

class ItemResource {

	public static function getArray( $type, $post ) {
		$body = self::getValues( $type, $post );

		if ( ! empty( OptionsHelper::getCustomDomain() ) ) {
			$body['overwrite_callback'] = site_url( '/' ) . 'wp-admin/admin-post.php';
		}

		return $body;
	}

	private static function getValues( $type, $post ) {
		$fields = HashController::getFields( $post );

		switch ( $type ) {
			case ARTICLE_TIMESTAMP:
				return [
					'type'          => ARTICLE_TIMESTAMP,
					'version'       => $fields['properties']['version'],
					'uid'           => $post->ID,
					'title'         => $fields['properties']['title'],
					'content'       => $fields['properties']['content'],
					'date_created'  => get_the_date( 'c', $post ),
					'date_modified' => $fields['properties']['date'],
					'url'           => $fields['attributes']['url'],
				];
				break;
			case MEDIA_OBJECT_TIMESTAMP:
				return [
					'type'            => MEDIA_OBJECT_TIMESTAMP,
					'version'         => CURRENT_TIMESTAMP_STANDARD_VERSION,
					'uid'             => $post->ID,
					'title'           => $fields['properties']['title'],
					'content_hash'    => $fields['properties']['contentHash'],
					'content_url'     => $fields['properties']['contentUrl'],
					'encoding_format' => $fields['properties']['encodingFormat'],
					'date_created'    => get_the_date( 'c', $post ),
					'date_modified'   => $fields['properties']['date'],
				];
				break;
			case PRODUCT_TIMESTAMP:
				$a = array_merge( [
					'type'          => PRODUCT_TIMESTAMP,
					'version'       => CURRENT_TIMESTAMP_STANDARD_VERSION,
					'uid'           => $post->ID,
					'name'          => $fields['properties']['name'],
					'description'   => $fields['properties']['description'],
					'date_created'  => get_the_date( 'c', $post ),
					'date_modified' => $fields['properties']['date'],
				], $fields['attributes'] );

				$a = self::renameArrayKey( 'productId', 'product_id', $a );
				$a = self::renameArrayKey( 'image', 'image_url', $a );

				return $a;
				break;
			default:
				return null;
		}
	}

	private static function renameArrayKey( $old, $new, $array ) {
		if ( array_key_exists( $old, $array ) ) {
			$array[ $new ] = $array[ $old ];
			unset( $array[ $old ] );
		}

		return $array;
	}
}
