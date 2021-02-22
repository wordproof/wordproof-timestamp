<?php
namespace WordProofTimestamp\Includes\Console;

use Composer\Script\Event;

class MakeMigration
{
    private static $migrationDir = __DIR__ . "/../../migrations/";
    
    public static function execute(Event $event)
    {
        $arguments = $event->getArguments();
        
        if (count($arguments) > 1) {
            die("Too much arguments. Please use: \n\r composer make:migration migration_name\n\r");
        }
        if (count($arguments) == 0) {
            die("Too few arguments. Please use: \n\r composer make:migration migration_name\n\r");
        }
        
        $fileName = array_shift($arguments);
        $className = str_replace("_","",ucwords(strtolower($fileName), "\t_"));
        $fileName = date("YmdHi")."_".$fileName.".php";
        
        $file = fopen(self::$migrationDir . $fileName, "w+");
        
        $result = fwrite($file, "<?php\nnamespace WordProofTimestamp\Migrations;\n\nclass $className\n{\n    public function up()\n    {\n        return true;\n    }\n}");
        
        if ($result) {
            echo "\e[32mMigration $fileName has been created successfully!\n";
        } else {
            echo "\e[31mError! Migration $fileName not been created!\n";
        }
        
        fclose($file);
    }
}