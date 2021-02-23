<?php
namespace WordProofTimestamp\Migrations;

class ExampleMigration
{
    public function up()
    {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
    
        $sql =
        "CREATE TABLE IF NOT EXISTS wordproof_plugin_data (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          setting varchar(100) NOT NULL,
          value text,
          PRIMARY KEY  (id)
        ) $charset_collate;";
        
        return $wpdb->query($sql);
    }
}