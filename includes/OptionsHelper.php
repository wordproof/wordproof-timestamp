<?php

namespace WordProofTimestamp\includes;

class OptionsHelper {

	public static $prefix = 'wordproof_';
	public static $optionWSFY = 'wsfy';
	public static $optionOAuth = 'oauth';

	public static $options = [
		'network'                     => [ 'type' => 'text' ],
		'certificate_text'            => [
			'type'    => 'text',
			'default' => 'View this content\'s WordProof Timestamp certificate'
		],
		'certificate_dom_selector'    => [ 'type' => 'text' ],
		'custom_domain'               => [
			'type'    => 'text',
			'default' => false
		],
		'send_timestamps_with_order'  => [ 'type' => 'text' ],
		'timestamps_order_text'       => [ 'type' => 'text' ],
		'show_info_link'              => [ 'type' => 'html' ],
		'hide_post_column'            => [ 'type' => 'bool' ],
		'hide_certificate_home'       => [ 'type' => 'bool' ],
		'hide_certificate_post_types' => [ 'type' => 'text', 'default' => [] ],
		'wsfy'                        => [
			'site_id'            => [ 'type' => 'int' ],
			'show_revisions'     => [
				'type'    => 'bool',
				'default' => true
			],
			'allowed_post_types' => [
				'type'    => 'text',
				'default' => [ 'post', 'page' ]
			],
		],
		'oauth'                       => [
			'access_token' => [ 'type' => 'text' ],
			'token_id'     => [ 'type' => 'text' ],
		],
		'wsfy_is_active'              => [ 'type' => 'bool' ],
		'wallet_connected'            => [ 'type' => 'bool' ],
		'accountname'                 => [ 'type' => 'text' ],
		'balance'                     => [ 'type' => 'text' ],
	];

	public static function all(): array {
		return [
			'hide_certificate_home'       => self::get( 'hide_certificate_home' ),
			'hide_certificate_post_types' => self::get( 'hide_certificate_post_types' ),
		];
	}

	public static function get( $key ) {
		if ( ! in_array( $key, array_keys( self::$options ) ) ) {
			return new \Exception( 'Option not found' );
		}

		$option = self::$options[ $key ];
		$value  = get_option( self::$prefix . $key, null );

		switch ( $option['type'] ) {
			case 'bool': //todo get default
				return boolval( $value );
			case 'text':
				if (is_array($value)) {
					return map_deep( array_values($value), 'stripslashes' );
				}

				if ( ! empty( $value ) ) {
					return stripslashes( $value );
				}
				break;
			case 'int':
				return intval( $value );
			default:
				break;
		}

		if ( isset( $option['default'] ) ) {
			return $option['default'];
		}

		return false;
	}

	public static function getCertificateDomSelector() {
		return get_option( self::$prefix . 'certificate_dom_selector' );
	}

	public static function getHidePostColumn() {
		return get_option( self::$prefix . 'hide_post_column' );
	}

	public static function getBalance( $default = false ) {
		$balance = intval( get_option( self::$prefix . 'balance', $default ) );
		wp_cache_set( 'balance', $balance, 'wordproof' );

		return $balance;
	}

	public static function getBalanceCache() { //todo use transient
		if ( wp_cache_get( 'balance', 'wordproof' ) ) {
			return wp_cache_get( 'balance', 'wordproof' );
		}

		return self::getBalance();
	}

	public static function getCustomDomain( $default = false ) {
		return get_option( self::$prefix . 'custom_domain', $default );
	}

	public static function getShowInfoLink( $default = false ) {
		return get_option( self::$prefix . 'show_info_link', $default );
	}

	public static function getWSFY( $excludes = [], $field = null ) {
		$options = get_option( self::$prefix . self::$optionWSFY, [] );
		$options = self::prepareWSFY( $options );

		if ( isset($field) && isset( $options[$field] ) ) {
			return $options[$field];
		}

		foreach ( $excludes as $exclude ) {
			unset( $options[ $exclude ] );
		}

		return (object) $options;
	}

	public static function getOAuth( $excludes = [] ) {
		$options = get_option( self::$prefix . self::$optionOAuth, [] );

		foreach ( $excludes as $exclude ) {
			unset( $options[ $exclude ] );
		}

		return (object) $options;
	}

	public static function isWSFYActive() {
		return boolval( get_option( self::$prefix . 'wsfy_is_active' ) );
	}

	public static function getSendTimestampsWithOrder() {
		return get_option( self::$prefix . 'send_timestamps_with_order', 'never' );
	}

	public static function getTimestampOrderText() {
		return get_option( self::$prefix . 'timestamps_order_text', false );
	}

	private static function prepareWSFY( $options ) {
		if ( isset( $options['allowed_post_types'] ) && is_array( $options['allowed_post_types'] ) ) {
			$options['allowed_post_types'] = array_values( $options['allowed_post_types'] );
		} else {
			$options['allowed_post_types'] = [ 'post', 'page' ];
		}

		if ( isset( $options['show_revisions'] ) ) {
			$options['show_revisions'] = boolval( $options['show_revisions'] );
		} else {
			$options['show_revisions'] = true;
		}

		return $options;
	}

	public static function set( $key, $value ) {
		$wsfyKeys  = array_keys( self::$options[ self::$optionWSFY ] );
		$oauthKeys = array_keys( self::$options[ self::$optionOAuth ] );

		$value = wp_unslash( $value );

		if ( in_array( $key, $wsfyKeys ) ) {
			return self::setValueOfArray( self::$optionWSFY, $wsfyKeys, $key, $value );
		}

		if ( in_array( $key, $oauthKeys ) ) {
			return self::setValueOfArray( self::$optionOAuth, $oauthKeys, $key, $value );
		}

		if ( isset( self::$options[ $key ] ) ) {
			$type  = self::$options[ $key ]['type'];
			$value = self::sanitizeData( $value, $type );

			return update_option( self::$prefix . $key, $value );
		}

		DebugLogHelper::warning( $key . ' does not exist in $options of OptionsHelper' );
		error_log( $key . ' does not exist in $options of OptionsHelper' );

		return false;
	}

	private static function setValueOfArray( $arrayParentKey, $arrayKeys, $key, $value ) {
		$type  = self::$options[ $arrayParentKey ][ $key ]['type'];
		$value = [ $key => self::sanitizeData( $value, $type ) ];

		$options = ( $arrayParentKey === self::$optionWSFY ) ? (array) self::getWSFY() : (array) self::getOAuth( [] );
		$options = array_intersect_key( $options, array_flip( $arrayKeys ) );

		$options = array_merge( $options, $value );

		return update_option( self::$prefix . $arrayParentKey, $options );
	}

	private static function sanitizeData( $value, $type ) {
		if ( is_array( $value ) ) {
			return array_map( [ 'self', 'sanitize' ], array_values($value) );
		} else {
			return self::sanitize( $value, $type );
		}
	}

	private static function sanitize( $value, $type = '' ) {
		switch ( $type ) {
			case 'int':
				return intval( $value );
			case 'html':
				return wp_kses_post( $value );
			case 'bool':
				return filter_var( $value, FILTER_VALIDATE_BOOLEAN );
			default:
				return sanitize_text_field( $value );
		}
	}
}
