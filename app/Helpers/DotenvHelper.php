<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Helpers;

class DotenvHelper
{
    /**
     * Return environment or default value.
     *
     * @param $key
     * @param $default
     *
     * @return mixed
     */
    public static function get($key, $default)
    {
        if (isset($_ENV) && isset($_ENV[$key])) {
            return $_ENV[$key];
        }

        return $default;
    }
}
