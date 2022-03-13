<?php

namespace WordProofTimestamp\App\Config\Conditionals;

/**
 * Base migration class.
 */
abstract class Conditional {

	/**
	 * Performs if the conditional is met.
	 *
	 * @return void
	 */
	abstract public function is_met();

}
