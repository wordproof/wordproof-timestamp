<?php


namespace WordProofTimestamp\includes;


use DirectoryIterator;

class MigrationHelper
{
    private $migrationFiles = array();
    private $latestSavedMigration = array();
    
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
        
        $this->latestSavedMigration = $this->getLatestSavedMigration(OptionsHelper::get('latest_migration'));
    
        $errors = array();
        $latestMigrationName = "";
        
        $actualMigrations = $this->getActualMigrations();
        $this->loadFiles($actualMigrations);
        
        foreach ($actualMigrations as $actualMigration) {
            $migrationClass = "WordProofTimestamp\Migrations\\".$this->getMigrationClassName($actualMigration['fileName']);
    
            if (!class_exists($migrationClass)) {
                $errors []= "Migration $migrationClass not found";
                continue;
            }
    
            $migration = (new $migrationClass());
    
            if ($migration->up()) {
                $latestMigrationName = $actualMigration['fileName'];
            } else {
                $errors []= "Migration $migrationClass failed";
            }
        }
        
        if ($latestMigrationName) OptionsHelper::set("latest_migration", $latestMigrationName);
        
        if (!empty($errors)) echo implode("\n", $errors);
    }
    
    /**
     * Fill migrationFiles property with file list from migrations dir
     * @return void
     */
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
                    'filePathName' => $migrationFile->getPathname(),
                    'time' => substr($migrationFile->getFilename(), 0, 12)
                );
            }
        }
        sort($this->migrationFiles);
    }
    
    /**
     * Find latest saved migration in migrationFiles property array
     * @param string $latestMigrationFileName Filename of latest saved migration
     * @return array
     */
    private function getLatestSavedMigration($latestMigrationFileName)
    {
        $migration = [];
        foreach ($this->migrationFiles as $migrationFile) {
            if ($migrationFile['fileName'] === $latestMigrationFileName) {
                $migration = $migrationFile;
                break;
            }
        }
        return $migration;
    }
    
    
    /**
     * Get migrations that more fresh than last executed one
     * @return array
     */
    private function getActualMigrations()
    {
        $latestSavedMigrationIndex = array_search($this->latestSavedMigration, $this->migrationFiles);
        $offset = $latestSavedMigrationIndex === false ? 0 : $latestSavedMigrationIndex + 1;
        return array_slice($this->migrationFiles, $offset, count($this->migrationFiles));
    }
    
    /**
     * Get class name from migration file name
     * @param $filename
     * @return string|string[]
     */
    private function getMigrationClassName($filename)
    {
        preg_match("/[0-9]{12}_(.*)\.php/i", $filename, $className);
        $className = is_array($className) && isset($className[1]) ? $className[1] : "";
        
        $className = str_replace("_", "", ucwords(strtolower($className), "\t_"));
        
        return $className;
    }
    
    /**
     * Include files from list
     * @param $fileList
     * @return void
     */
    private function loadFiles($fileList)
    {
        foreach ($fileList as $file) {
            include $file['filePathName'];
        }
    }
}