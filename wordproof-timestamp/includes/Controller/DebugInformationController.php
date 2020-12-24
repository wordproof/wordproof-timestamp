<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\OptionsHelper;

class DebugInformationController {

	public $options;

	public function __construct() {
		add_action( 'debug_information', [ $this, 'information' ] );
	}

	public function information( $args ) {
		$args['wordproof'] = [
			'label'       => 'WordProof',
			'description' => 'This contains information which comes in handy when debugging.',
			'show_count'  => false,
		];

		$args['wordproof']['fields'] = $this->getFields();

		return $args;
	}

	public function getFields() {
		$fields  = [];
		$options = array_keys( OptionsHelper::$options );
		foreach ( $options as $option ) {
			$value = OptionsHelper::get( $option );

			if ( is_array( $value ) ) {
				foreach ( $value as $k => $v ) {
					$fields[ $k ] = $this->getField( $k, $v );
				}
			} else {
				$fields[ $option ] = $this->getField( $option, $value );
			}
		}

        $fields['webhook_admin_post'] = $this->getField( 'webhook_admin_post', admin_url( 'admin-post.php' ) );
        $fields['webhook_rest_url'] = $this->getField( 'webhook_rest_url', get_rest_url( null, WORDPROOF_REST_NAMESPACE . '/' . WORDPROOF_REST_TIMESTAMP_ENDPOINT ) );

		return $fields;
	}

	private function getField( $label, $value ) {
		return [
			'label'   => $this->getLabel( $label ),
			'value'   => $this->getValue( $value ),
			'debug'   => $this->getValue( $value, true )
        ];
	}

	private function getValue( $value, $debug = false ) {
		if ( empty( $value ) ) {
			if ( $debug ) {
				return null;
			}

			return 'Not Set';
		}

		if ( is_string( $value ) && ! $debug && strlen( $value ) > 60 ) {
			return substr( $value, 0, 60 ) . '...';
		}

		return $value;
	}

	private function getLabel( $value ) {
		return ucwords( str_replace( '_', ' ', $value ) );
	}
}
