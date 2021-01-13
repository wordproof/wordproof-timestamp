<?php

namespace WordProofTimestamp\includes\Notice;

use WordProofTimestamp\includes\PostHelper;

class UnprotectedPostsNotice extends Notice {

	/**
	 * UnprotectedPostsNotice constructor.
	 */
	public function __construct() {
		$this->key = 'wordproof_unprotected_posts_notice';

		add_action( 'admin_notices', [ $this, 'init' ] );
	}

	/**
	 * @return string
	 */
	public function getKey() {
		return $this->key;
	}

	/**
	 *
	 */
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

		$unprotected_count = PostHelper::getUnprotectedPostCount();
		$this->notice['message'] = 'It looks like ' . $unprotected_count . ' of your posts, attachments and/or products are <strong>unprotected</strong>.';
		if ( $unprotected_count > 0 ) {
			$this->handle();
		}
	}

	public function handle() {
		echo wp_kses($this->getNoticeHtml(), wp_kses_allowed_html('post'));
	}
}
