<?php

namespace WordProofTimestamp\includes\Notice;

abstract class Notice {
	protected $key = null;
	protected $isDismissible = false;

	protected $notice = [
		'type'    => 'info',
		'message' => '',
	];

	protected $button = [
		'text' => '',
		'link' => '',
	];

	abstract public function getKey();

	protected function isHidden() {
		if ( ! $this->isDismissible ) {
			return false;
		}

		return ( get_transient( $this->key ) === 'hidden' );
	}

	protected function getNoticeHtml() {
		ob_start(); ?>
		<div data-notice-key="<?php echo esc_attr( $this->key ); ?>"
			 class="wordproof-notice notice notice-<?php echo esc_attr( $this->notice['type'] ); ?> <?php echo ( $this->isDismissible ) ? 'is-dismissible' : ''; ?>">
			<p><?php esc_html_e( $this->notice['message'], WORDPROOF_SLUG ); ?></p>
			<?php $button = $this->getNoticeButtonHtml();
			echo ( $button ) ? esc_html( $button ) : '';
			?>
		</div>
		<?php
		return ob_get_clean();
	}

	private function getNoticeButtonHtml() {
		if ( empty( $this->button['text'] ) ) {
			return false;
		}

		ob_start(); ?>
		<p><a class="button button-primary" href="<?php echo esc_url( $this->button['link'] ); ?>"><?php esc_html_e( $this->button['text'],
					WORDPROOF_SLUG ); ?></a></p>
		<?php
		return ob_get_clean();
	}
}
