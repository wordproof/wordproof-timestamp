<?php


namespace WordProofTimestamp\includes;


use DirectoryIterator;

class MigrationHelper
{
    private $migrationFiles = [];
    
    public function __construct()
    {
        // run migrations after Wordproof plugin activation
        add_action( 'activate_'.WORDPROOF_BASENAME, [ $this, 'executeMigration' ], 10);
        
        // run migrations after plugins update
        add_action( 'upgrader_process_complete', [ $this, 'executeMigration' ], 10);
        
        // TODO: bind to some other hooks?
    }
    
    public function executeMigration()
    {
        $this->fillMigrationFilesList();
        
        $latestSavedMigration = OptionsHelper::get('latest_migration');
        
        $latestMigration= $this->getLatestMigrationFile();
        $latestMigrationFile = $latestMigration['fileName'] ?: "";
        
        if ($latestSavedMigration === $latestMigrationFile) {
            return false;
        }
        
        $migrationClass = "WordProofTimestamp\Migrations\\".$this->getMigrationClassName($latestMigrationFile);
        
        if (!class_exists($migrationClass)) {
            return false;
        }
        
        $migration = (new $migrationClass());
        
        if ($migration->up()) {
            OptionsHelper::set("latest_migration", $latestMigrationFile);
            return true;
        } else {
            die("Wordproof Migration error");
        }
    }
    
    private function fillMigrationFilesList()
    {
        if (!empty($this->migrationFiles)) {
            return;
        }
        foreach(new DirectoryIterator(WORDPROOF_DIR_MIGRATIONS) as $migrationFile) {
            if (
                !$migrationFile->isDot()
                && $migrationFile->isFile()
                && $migrationFile->getExtension() === 'php'
            ) {
                $this->migrationFiles []= array(
                    'fileName' => $migrationFile->getFilename(),
                    'filePathName' => $migrationFile->getPathname()
                );
            }
        }
    }
    
    private function getLatestMigrationFile()
    {
        asort($this->migrationFiles);
        $latestMigration = array_pop($this->migrationFiles);
        if (!empty($this->migrationFiles)) {
            include $latestMigration['filePathName'];
        }
        return $latestMigration;
    }
    
    private function getMigrationClassName($filename)
    {
        preg_match("/[0-9]{12}_(.*)\.php/i", $filename, $className);
        $className = is_array($className) && isset($className[1]) ? $className[1] : "";
        
        $className = str_replace("_", "", ucwords(strtolower($className), "\t_"));
        
        return $className;
    }
}