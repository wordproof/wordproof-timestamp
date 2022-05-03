<?php

declare(strict_types=1);

namespace WordProofTimestamp\App;

use WordProof\SDK\Helpers\RedirectHelper;
use WordProof\SDK\Helpers\TransientHelper;
use WordProof\SDK\Translations\DefaultTranslations;
use WordProof\SDK\WordPressSDK;
use WordProofTimestamp\App\Config\SdkAppConfig;
use WordProofTimestamp\App\Controllers\ActionController;
use WordProofTimestamp\App\Controllers\AdminPageController;
use WordProofTimestamp\App\Controllers\MigrationController;
use WordProofTimestamp\App\Controllers\NoticeController;
use WordProofTimestamp\App\Controllers\ScheduledActionController;
use WordProofTimestamp\App\Controllers\UpgradeNotificationController;
use WordProofTimestamp\App\Helpers\CliHelper;
use WordProofTimestamp\App\Helpers\PluginHelper;

class Core
{
    /**
     * Initialize the WordProof timestamp app.
     */
    public function __construct()
    {
        add_action('init', [$this, 'init']);
        add_action('plugins_loaded', [$this, 'setup'], -10);
        add_action('activated_plugin', [$this, 'activate']);
        add_action('upgrader_process_complete', [$this, 'upgrade'], 10, 2);

        do_action('wordproof_scaffold_init');
    }

    /**
     * Setup the controllers.
     */
    public function setup(): void
    {
        if (!is_admin()) {
            return;
        }

        new ScheduledActionController();
        new NoticeController();
        new AdminPageController();
        new UpgradeNotificationController();
        new ActionController();
        new MigrationController();
    }

    /**
     * Initialize plugin.
     *
     * @throws \Exception
     */
    public function init(): void
    {
        $config = new SdkAppConfig();
        $translations = new DefaultTranslations();

        WordPressSDK::getInstance($config, $translations)
            ->certificate()
            ->timestampInPostEditor()
            ->initialize()
        ;
    }

    /**
     * Add logic on activation of this plugin.
     *
     * @param mixed $plugin
     */
    public function activate($plugin): void
    {
        if (WORDPROOF_BASENAME !== $plugin) {
            return;
        }

        $cli = CliHelper::running();

        if (!$cli) {
            if (!isset($_REQUEST['_wpnonce'])) {
                return;
            }

            $nonce = sanitize_key($_REQUEST['_wpnonce']);
        }

        if ($cli || wp_verify_nonce($nonce, 'activate-plugin_'.$plugin) || wp_verify_nonce($nonce, 'bulk-plugins')) {
            if (is_plugin_active('wordpress-seo/wp-seo.php')) {
                $options = get_option('wpseo', []);

                if (\is_array($options) && isset($options['wordproof_integration_active']) && true === $options['wordproof_integration_active']) {
                    if ($cli) {
                        PluginHelper::deactivate();
                        \WP_CLI::error('Cannot be activated if the WordProof integration in Yoast SEO is turned on.');
                    }

                    flush_rewrite_rules();

                    RedirectHelper::safe(wp_nonce_url(admin_url('plugins.php'), 'wordproof_yoast_notice', 'wordproof_nonce'));

                    exit();
                }
            }

            if ($cli) {
                return;
            }

            flush_rewrite_rules();

            RedirectHelper::safe(admin_url('admin.php?page=wordproof-about'));

            exit();
        }
    }

    /**
     * Add logic on upgrade of this plugin.
     *
     * @param \Plugin_Upgrader $upgrader
     * @param array            $data
     */
    public function upgrade($upgrader, $data): void
    {
        if (!isset($data) || !\is_array($data) || 'plugin' !== $data['type']) {
            return;
        }

        if (!isset($data['plugins']) || !\is_array($data['plugins'])) {
            return;
        }

        $plugins = array_values($data['plugins']);

        foreach ($plugins as $plugin) {
            if (WORDPROOF_BASENAME !== $plugin) {
                continue;
            }

            /** @var \WP_Ajax_Upgrader_Skin $skin */
            $skin = $upgrader->skin;
            if (isset($skin, $upgrader->skin->plugin_info)) {
                if (isset($skin->plugin_info['Version'])) {
                    $previousVersion = $upgrader->skin->plugin_info['Version'];

                    // User coming from version 2.0.
                    if ('2' === substr($previousVersion, 0, 1)) {
                        TransientHelper::set('wordproof_upgraded', true);
                    }
                }
            }
        }
    }
}
