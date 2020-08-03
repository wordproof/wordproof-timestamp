<?php

namespace WordProofTimestamp\includes\Notice;

use WordProofTimestamp\includes\PostHelper;

class UnprotectedPostsNotice extends Notice {

	public function __construct() {
		$this->key = 'wordproof_unprotected_posts_notice';

		add_action( 'admin_notices', [ $this, 'init' ] );
	}

	public function getKey() {
		return $this->key;
	}

	public function init() {
		$this->isDismissible  = true;
		$this->notice['type'] = 'warning';
		$this->button['text'] = 'Timestamp your posts';
		$this->button['link'] = menu_page_url( 'wordproof-bulk', false );

		$this->check();
	}

	public function check() {
		if ( $this->isHidden() ) {
			return;
		}

		$unprotectedCount        = PostHelper::getUnprotectedPostCount();
		$this->notice['message'] = 'It looks like ' . $unprotectedCount . ' of your posts, attachments and/or products are <strong>unprotected</strong>.';
		if ( $unprotectedCount > 0 ) {
			$this->handle();
		}
	}

	public function handle() {
		echo $this->getNoticeHtml();
	}
}
