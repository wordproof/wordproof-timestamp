<?php

namespace WordProofTimestamp\App\Notices;

abstract class Notice {

	/**
	 * The key used for the transient if the notice is dismissible
	 * @var null
	 */
	protected $key = null;

	/**
	 * If the user is allowed to dismiss the notice.
	 * @var bool
	 */
	protected $isDismissible = false;

	/**
	 * @var string[] The notice config.
	 */
	protected $notice = [
		'type'    => 'info',
		'message' => '',
	];

	/**
	 * The button config
	 *
	 * @var string[]
	 */
	protected $button = [
		'text' => '',
		'link' => '',
	];

	abstract public function init();
	abstract public function show();
	abstract public function configureNotice();

	/**
	 * Returns the notice key.
	 *
	 * @return null
	 */
	public function getKey() {
		return $this->key;
	}

	/**
	 * Returns if notice is hidden.
	 *
	 * @return bool
	 */
	protected function isHidden() {
		if ( ! $this->isDismissible ) {
			return false;
		}

		return ( get_transient( $this->key ) === 'hidden' );
	}

	/**
	 * Returns the escapes notice html
	 *
	 * @return false|string
	 */
	protected function getNotice() {
		return wp_kses( $this->getNoticeHtml(), wp_kses_allowed_html( 'post' ) );
	}

	/**
	 * Returns the notice html
	 *
	 * @return false|string
	 */
	private function getNoticeHtml() {
		ob_start(); ?>
		<div data-notice-key="<?php echo esc_attr( $this->key ); ?>"
		     class="wordproof-notice notice notice-<?php echo esc_attr( $this->notice['type'] ); ?> <?php echo ( $this->isDismissible ) ? 'is-dismissible' : ''; ?>">
			<p><?php echo wp_kses_post( $this->notice['message'] ); ?></p>
			<?php echo ( $b =  $this->getNoticeButtonHtml()) ? wp_kses_post($b) : ''; ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Returns the button html
	 *
	 * @return false|string
	 */
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
