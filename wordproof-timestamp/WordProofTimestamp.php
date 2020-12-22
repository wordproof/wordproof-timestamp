<?php

namespace WordProofTimestamp;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\Controller\AdminController;
use WordProofTimestamp\includes\Controller\AutomaticHooksController;
use WordProofTimestamp\includes\Controller\CertificateController;
use WordProofTimestamp\includes\Controller\DebugInformationController;
use WordProofTimestamp\includes\Controller\ECommerceController;
use WordProofTimestamp\includes\Controller\RestApiController;
use WordProofTimestamp\includes\Controller\TimestampController;

/**
 * Class WordProofTimestamp
 * @package WordProofTimestamp
 */
class WordProofTimestamp {

	/** @var null */
	private static $instance = null;

	public function init() {
        new DebugInformationController();
        new RestApiController();

        new AdminController();
		new AnalyticsHelper();
		new TimestampController();
		new CertificateController();

		new AutomaticHooksController();
		new ECommerceController();
	}

	/**
	 * @return WordProofTimestamp
	 */
	public static function getInstance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}
