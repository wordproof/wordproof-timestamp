<?php declare(strict_types=1);

namespace WordProofTimestamp\App\Controllers;

use WordProof\SDK\Helpers\PostTypeHelper;
use WordProofTimestamp\App\Helpers\AssetHelper;

class AdminPageController
{
    private $pages = [ 'admin_page_wordproof-about', 'admin_page_wordproof-bulk' ];

    public function __construct()
    {

        //TODO Display if not shown before.
        add_action('admin_menu', [ $this, 'addPages' ]);
        add_action('admin_enqueue_scripts', [ $this, 'enqueue' ]);
        add_filter('wordproof_load_data_on_pages', [ $this, 'loadDataOnPageHook' ]);
        add_filter('wordproof_data', [ $this, 'loadExtraData' ]);
    }

    public function addPages(): void
    {
        add_submenu_page(
            null,
            'WordProof ' . WORDPROOF_VERSION,
            'WordProof' . WORDPROOF_VERSION,
            'manage_options',
            'wordproof-about',
            [ $this, 'aboutPageContent' ],
        );
        add_submenu_page(
            null,
            'WordProof ' . WORDPROOF_VERSION,
            'WordProof' . WORDPROOF_VERSION,
            'manage_options',
            'wordproof-bulk',
            [ $this, 'migratePageContent' ],
        );
    }

    public function enqueue($page): void
    {
        if (\in_array($page, $this->pages, true)) {
            AssetHelper::enqueue('index');
            AssetHelper::enqueue('main.css');
        }
    }

    public function loadDataOnPageHook($pages)
    {
        return array_merge($pages, $this->pages);
    }

    public function loadExtraData($data)
    {
        if (! is_admin()) {
            return $data;
        }

        $screen = get_current_screen();
        if (isset($screen->base) && $screen->base === 'admin_page_wordproof-bulk') {
            $postTypes     = PostTypeHelper::getPublicPostTypes();
            $postTypesData = [];


            foreach ($postTypes as $postType) {
                $postTypesData[ $postType ] = PostTypeHelper::getUnprotectedPosts($postType);
            }

            return ['data' => array_merge($data['data'], ['post_types' => $postTypesData ]) ];
        }

        return $data;
    }

    public function migratePageContent(): void
    {
        ?>

        <div id="wordproof-bulk"></div>

		<?php
    }

    public function aboutPageContent(): void
    {
        ?>

        <div id="wordproof-about"></div>

		<?php
    }
}
