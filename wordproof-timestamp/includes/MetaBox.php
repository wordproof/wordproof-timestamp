<?php

namespace WordProofTimestampFree\includes;

/**
 * Class MetaBox
 * @package WordProofTimestampFree\includes
 */
class MetaBox {

    public function __construct() {
        if (current_user_can('manage_options')) {
            add_action('add_meta_boxes', array($this, 'addMetaBox'));
        }
    }

    public function addMetaBox() {
        add_meta_box(
                'wordproof-meta-box',
                __( 'WordProof', 'wordproof-timestamp' ),
                array($this, 'generateMetaBox'),
                null,
                'side',
                'high',
                ''
        );
    }

    public function generateMetaBox() {
        ?>
            <div id="wordproof-meta-box-inside">

            </div>
        <?php
    }
}
