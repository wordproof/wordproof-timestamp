<?php

namespace WordProofTimestamp\includes\Notice;

use WordProofTimestamp\includes\AnalyticsHelper;
use WordProofTimestamp\includes\PostHelper;

class NotSetupNotice extends Notice {

	public function __construct() {
		$this->key = 'wordproof_not_setup_notice';

		add_action( 'admin_notices', [ $this, 'init' ] );
	}

	public function getKey() {
		return $this->key;
	}

	public function init() {
		$this->isDismissible     = true;
		$this->notice['type']    = 'info';
		$this->notice['message'] = 'Protect your content and proof the authenticity of your content to visitors and search engines. Start the Wizard to get you started with WordProof!';
		$this->button['text']    = 'Setup WordProof Timestamp';
		$this->button['link']    = menu_page_url( 'wordproof-wizard', false );

		$this->check();
	}

	public function check() {
		if ( $this->isHidden() ) {
			return;
		}

		if ( get_option( AnalyticsHelper::$optionNetwork, false ) === false ) {
			$this->handle();
		}
	}

	public function handle() {
		echo esc_html($this->getNoticeHtml());
	}
}
