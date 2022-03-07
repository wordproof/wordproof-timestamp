<?php

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
            'about'             => [
	            'dependencies' => ['wp-i18n', 'wp-element', 'wp-components', 'wp-data', 'lodash', 'wordproof-data'],
                'type'         => 'js'
            ],
        ];
    }
}
