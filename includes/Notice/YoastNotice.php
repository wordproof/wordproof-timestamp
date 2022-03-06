<?php

namespace WordProofTimestamp\includes\Notice;

class YoastNotice extends Notice {

	public function __construct() {
		$this->key = 'wordproof_yoast_notice';

		add_action( 'admin_notices', [ $this, 'init' ] );
	}

	public function getKey() {
		return $this->key;
	}

	public function init() {
		$this->isDismissible     = true;
		$this->notice['type']    = 'error';
		$this->notice['message'] = 'Please disable the Yoast WordProof integration before install this plugin. Go to the Yoast settings and turn off the WordProof integration.';
		$this->button['text']    = 'Yoast SEO settings';
		$this->button['link']    = admin_url( 'admin.php?page=wpseo_dashboard#top#integrations' );
		$this->check();
	}

	public function check() {
		if ( $this->isHidden() ) {
			return;
		}

		if ( isset( $_REQUEST['wordproof_nonce'] ) ) {
			if (wp_verify_nonce(sanitize_key($_REQUEST['wordproof_nonce']), 'wordproof_notice')) {
				$this->handle();

				deactivate_plugins(WORDPROOF_BASENAME, true);
			}
		}
	}

	public function handle() {
		echo wp_kses( $this->getNoticeHtml(), wp_kses_allowed_html( 'post' ) );

	}
}
