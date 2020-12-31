<?php

namespace WordProofTimestamp\includes\Controller;

use WordProofTimestamp\includes\Notice\NotSetupNotice;
use WordProofTimestamp\includes\Notice\UnprotectedPostsNotice;

class NoticeController {

	private $notices = [];
	private $keys = [];

	public function __construct() {
		$this->initializeNotices();
		$this->getKeys();

		add_action( 'wp_ajax_wordproof_dismiss_notice', [ $this, 'dismissNotice' ] );
	}

	public function initializeNotices() {
		$this->notices[] = new UnprotectedPostsNotice();
		//$this->notices[] = new NotSetupNotice();
	}

	public function getKeys() {
		foreach ( $this->notices as $notice ) {
			$this->keys[] = $notice->getKey();
		}
	}

	public function dismissNotice() {
		check_ajax_referer( 'wordproof', 'security' );

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( ! isset( $_REQUEST['notice_key'] ) ) {
			return;
		}
		
        if ( in_array( wp_unslash($_REQUEST['notice_key']), $this->keys ) ) {
			set_transient( $_REQUEST['notice_key'], 'hidden' );
		}

	}
}
