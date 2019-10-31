<?php

namespace WordProofTimestamp\includes;

/**
 * Class MetaBox
 * @package WordProofTimestamp\includes
 */
class MetaBox {

    public function __construct() {
        if (current_user_can('manage_options')) {
          if (!OptionsHelper::isWSFYActive()) {
            add_action('add_meta_boxes', [$this, 'addMetaBox']);
          }
        }
    }

    public function addMetaBox() {
        add_meta_box(
                'wordproof-meta-box',
                'WordProof',
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
