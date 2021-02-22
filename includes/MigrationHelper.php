<?php


namespace WordProofTimestamp\Core;


use WordProofTimestamp\includes\OptionsHelper;

class MigrationHelper
{
    public function __construct()
    {
        add_action( 'upgrader_process_complete', [ $this, 'latestMigration' ], 10);
    }
    
    public function latestMigration()
    {
        $latestSavedMigration = OptionsHelper::get('latest_migration');
        $migrationsList = scandir(WORDPROOF_DIR_MIGRATIONS);
        sort($migrationsList);
        $latestMigration = array_pop($migrationsList);
        if ($latestSavedMigration !== $latestMigration) {
            preg_match("/[0-9]{12}_(.*)\.php/i", $latestMigration, $className);
            $className = is_array($className) && isset($className[1]) ? $className[1] : "";
            
            if (!$className) return false;
            
            $className = str_replace("_","",ucwords(strtolower($className), "\t_"));
            
            if (!class_exists($className)) return false;
            
            $migration = (new $className());
            
            if ($migration->up()) OptionsHelper::set("latest_migration", $latestMigration);
        }
    }
}