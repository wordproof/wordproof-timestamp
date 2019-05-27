<?php

namespace WordProof\includes;

/**
 * Class Ajax
 * @package WordProof\includes
 */
class Ajax {
    /**
     * Ajax constructor.
     */
    public function __construct() {
        add_action('wp_ajax_wordproof_get_post', array($this, 'getPostData'));
        add_action('wp_ajax_wordproof_post_meta_data', array($this, 'postMetaData'));
    }

    public function getPostData() {
        check_ajax_referer( 'wordproof', 'security' );

        $post_id = intval($_REQUEST['post_id']);

        if (current_user_can('manage_options') && !empty($post_id)) {
           $post = (array) get_post($post_id);

           if (!empty($post)) {
               $post['wordproof_date'] = get_post_meta($post_id, 'wordproof_date', true);
           }

           echo json_encode($post);
           exit;
        }
    }

    public function postMetaData() {
        check_ajax_referer( 'wordproof', 'security' );

        $post_id = intval($_REQUEST['post_id']);

        do_action('wordproof_before_saving_timestamp_meta_data', $post_id);

        if (current_user_can('manage_options') && !empty($post_id)) {
            update_post_meta($post_id, 'wordproof_date', !empty($_REQUEST['date'])? sanitize_text_field($_REQUEST['date']): '');
            update_post_meta($post_id, 'wordproof_title', !empty($_REQUEST['title'])? sanitize_title($_REQUEST['title']): '');
            update_post_meta($post_id, 'wordproof_content', !empty($_REQUEST['content'])? sanitize_text_field(htmlentities($_REQUEST['content'])): '');
            update_post_meta($post_id, 'wordproof_transaction_id', !empty($_REQUEST['transaction_id'])? sanitize_text_field($_REQUEST['transaction_id']): '');
            update_post_meta($post_id, 'wordproof_block_num', !empty($_REQUEST['block_num'])? sanitize_text_field($_REQUEST['block_num']): '');
            update_post_meta($post_id, 'wordproof_block_time', !empty($_REQUEST['block_time'])? sanitize_text_field($_REQUEST['block_time']): '');
            update_post_meta($post_id, 'wordproof_network', !empty($_REQUEST['network'])? sanitize_text_field($_REQUEST['network']): '');

            echo json_encode(array(
            	'success' => true,
            	'data' => array(
            		'url' => get_permalink($post_id) . '#wordproof'
	            ),
            ));
            exit;
        }

      do_action('wordproof_after_saving_timestamp_meta_data', $post_id);
    }
}
