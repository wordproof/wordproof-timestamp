<?php

declare(strict_types=1);

namespace WordProofTimestamp\App\Actions;

/**
 * Base migration class.
 */
abstract class Action
{
    public function getKey()
    {
        $class = (new \ReflectionClass($this))->getShortName();

        return strtolower(preg_replace('/([^A-Z])([A-Z])/', "$1_$2", $class));
    }

    /**
     * Performs the migration.
     *
     * @return void
     */
    abstract public function execute(array $data = null): void;
}
