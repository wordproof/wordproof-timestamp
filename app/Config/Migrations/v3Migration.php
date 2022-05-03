<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Config\Migrations;

use WordProof\SDK\Helpers\TransientHelper;

class v3Migration extends Migration
{
    public function up(): void
    {
        $this->saveAccessToken();
        $this->saveSettings();

        TransientHelper::set('wordproof_waiting_for_authentication_to_start_post_migration', true);
        TransientHelper::set('wordproof_migration_300', true);
    }

    private function saveAccessToken(): void
    {
        $oauthData = get_option('wordproof_oauth');

        /**
         * Save access token to login user with linked account while going through the new OAuth process.
         */
        if (isset($oauthData) && \is_array($oauthData) && isset($oauthData['access_token'])) {
            TransientHelper::set('wordproof_v2_authenticate_with_token', $oauthData['access_token']);
        }
    }

    private function saveSettings(): void
    {
        $wsfyData = get_option('wordproof_wsfy');
        $hideLink = get_option('wordproof_hide_certificate_home');
        $linkText = get_option('wordproof_certificate_text');

        if (isset($wsfyData) && \is_array($wsfyData)) {

            /**
             * Save source id to use the current source while going through the new OAuth process.
             */
            if (isset($wsfyData['site_id'])) {
                TransientHelper::set('wordproof_v2_get_existing_source', $wsfyData['site_id']);
            }

            /**
             * Use the current settings.
             */
            $settings = [];

            if (isset($wsfyData['show_revisions'])) {
                $settings['show_revisions'] = $wsfyData['show_revisions'];
            }

            if (isset($wsfyData['allowed_post_types'])) {
                $settings['selected_post_types'] = array_filter($wsfyData['allowed_post_types']);
            }

            if (isset($linkText)) {
                $settings['certificate_link_text'] = $linkText;
            }

            if (isset($hideLink)) {
                $settings['hide_certificate_link'] = (bool) $hideLink;
            }

            if (!empty($settings)) {
                update_option('wordproof_settings', (object) $settings);
            }
        }
    }
}
