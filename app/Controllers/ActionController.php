<?php

namespace WordProofTimestamp\App\Controllers;

use WordProofTimestamp\App\Actions\Action;
use WordProofTimestamp\App\Config\Migrations\v3Migration;
use WordProofTimestamp\App\Helpers\ActionHelper;

class ActionController {

	public function __construct() {
		add_action( 'wordproof_action', [ $this, 'execute' ] );
		add_action( 'init', [ $this, 'init' ] );
	}

	public function execute( $data ) {

		if ( ! isset( $data ) || ! is_array( $data ) || ! isset( $data['action'] ) ) {
			return;
		}

		$action = '\WordProofTimestamp\App\Actions\\' . $data['action'];
		unset($data['action']);

		/** @var $class Action */
		(new $action)->execute($data);
	}

	public function init() {

//		(new v3Migration)->up();

//		$this->execute( [
//			"action" => "RetrieveSchemaForPost",
//			"id"     => "1",
//		] );

//		ActionHelper::now('MigrateToNewSchema');
//		ActionHelper::now('RetrieveSchemaForPost', ['id' => '1', 'more' => true]);

	}


}
