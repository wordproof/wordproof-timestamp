<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Config;

use WordProof\SDK\Config\DefaultAppConfig;
use WordProofTimestamp\App\Helpers\DotenvHelper;

/**
 * Class SdkAppConfig.
 */
class SdkAppConfig extends DefaultAppConfig
{
    /**
     * Returns the partner.
     *
     * @return string The partner.
     */
    public function getPartner()
    {
        return 'wordproof';
    }

    /**
     * Returns the environment.
     *
     * @return string The environment.
     */
    public function getEnvironment()
    {
        return DotenvHelper::get('APP_ENV', 'production');
    }

    /**
     * The OAuth client used.
     *
     * @return mixed|null
     */
    public function getOauthClient()
    {
        return DotenvHelper::get('WORDPROOF_CLIENT', null);
    }

    /**
     * The WordProof MY url used.
     *
     * @return mixed|null
     */
    public function getWordProofUrl()
    {
        return DotenvHelper::get('WORDPROOF_ENDPOINT', null);
    }

    /**
     * Override the SDK asset URL's.
     *
     * @return mixed|null
     */
    public function getScriptsFileOverwrite()
    {
        return DotenvHelper::get('WORDPROOF_SDK_OVERWRITE', null);
    }
}
