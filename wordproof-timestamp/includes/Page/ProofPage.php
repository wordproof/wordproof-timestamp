<?php

namespace WordProof\includes\Page;

/**
 * Class ProofPage
 * @package WordProof\includes\Page
 */
class ProofPage {

    public function __construct() {
        add_action('init', array($this, 'generateProofPage'), 1);
    }

    public function generateProofPage() {
        if (!is_admin() && isset($_GET['wordproof'])) {
            if ($_SERVER['REQUEST_URI'] == '/?wordproof') {
                $post_id = get_option('page_on_front');
            } else {
                $post_id = url_to_postid( $_SERVER['REQUEST_URI']);
            }

	        if ($post_id && $post = get_post($post_id)) {
	            $proof_date = get_post_meta($post_id, 'wordproof_date', true);

	            if ($proof_date) {
		            $proof_network          = get_post_meta($post_id, 'wordproof_network', true);
		            $proof_transaction_id   = get_post_meta($post_id, 'wordproof_transaction_id', true);

		            switch ($proof_network) {
                        case 'eos_main':
                            $transaction_url = 'https://bloks.io/transaction/' . $proof_transaction_id;
                            break;
                        case 'telos_main':
                            $transaction_url = 'https://telos.eosx.io/tx/' . $proof_transaction_id;
                            break;
                        case 'eos_jungle':
                            $transaction_url = 'https://jungle.bloks.io/transaction/' . $proof_transaction_id;
                            break;
                        default:
	                        $transaction_url = '';
                    }

		            ?>
                    <style type="text/css">

						body {
							font-family: sans-serif;
						}

						a, a:visited {
							color: #0073aa;
						}

						a:hover, a:active {
							color: #005177;
							outline: 0;
							text-decoration: none;
						}

						table {
							background: white;
							border-collapse: collapse;
							width: 100%;
							max-width: 100%;
						}

						th, td {
							padding: 8px;
							border: 1px solid #ccc;
							vertical-align: top;
							text-align: left;
						}

                    </style>
					<h1>WordProof Timestamp certificate</h1>
                    <table>
                        <tr>
                            <th>Post Title</th>
                            <td><?php echo esc_html($post->post_title)?></td>
                        </tr>
                        <tr>
                            <th>Post Content</th>
                            <td><textarea name="" id="" cols="100" rows="10"><?php echo esc_html($post->post_content)?></textarea></td>
                        </tr>
                        <tr>
                            <th>Post Date</th>
                            <td><?php echo esc_html($post->post_date)?></td>
                        </tr>
                        <tr>
                            <th>Modified Date</th>
                            <td><?php echo esc_html($post->post_modified)?></td>
                        </tr>
                        <tr>
                            <th>Proof Date</th>
                            <td><?php echo esc_html($proof_date)?></td>
                        </tr>
                        <tr>
                            <th>Transaction Url</th>
                            <td><a target="_blank" href="<?php echo esc_html($transaction_url)?>"><?php echo esc_html($transaction_url)?></a></td>
                        </tr>
                    </table>
					<p>
                        <small>WordProof Timestamp with WordProof.io, bringing WordPress to the blockchain.</small><br>
                        <small>Download the <a href="https://wordproof.io/timestamp-plugin/" target="_blank" rel="noopener noreferrer">WordProof Timestamp plugin</a> for free to timestamp your WordPress content too.</small>
                    </p>

		            <?php
                } else {
		            ?>
                    <p>Post not proofed</p>
		            <?php
                }

		        exit;
	        }

        }
    }
}
