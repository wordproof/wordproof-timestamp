<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Config;

class ScriptsConfig extends Config
{
    /**
     * Returns an array with the environment config.
     *
     * @return array
     */
    protected static function values()
    {
        return [
            'index'             => [
                'dependencies' => ['wp-i18n', 'wp-element', 'wp-components', 'wp-data', 'lodash', 'wordproof-data'],
                'type'         => 'js'
            ],
            'main.css'             => [
                'dependencies' => ['wp-components'],
                'type'         => 'css'
            ],
        ];
    }
}
