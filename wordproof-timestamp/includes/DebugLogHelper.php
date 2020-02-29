<?php

namespace WordProofTimestamp\includes;

class DebugLogHelper
{
  const DEBUG = 100;
  const INFO = 200;
  const WARNING = 300;
  const ERROR = 400;

  protected static $levels = [
    self::DEBUG => 'DEBUG',
    self::INFO => 'INFO',
    self::WARNING => 'WARNING',
    self::ERROR => 'ERROR',
  ];

  public static function debug($message)
  {
    self::log(self::DEBUG, $message);
  }

  public static function info($message)
  {
    self::log(self::INFO, $message);
  }

  public static function warning($message)
  {
    self::log(self::WARNING, $message);
  }

  public static function error($message)
  {
    self::log(self::ERROR, $message);
  }

  public static function getContents()
  {
    $file = file_exists(self::getLogFilename());
    if ($file) {
      $file = file_get_contents(self::getLogFilename());
      if (!empty($file)) {
        return trim($file);
      }
    }

    return 'Nothing logged yet.';
  }

  private static function log($level, $message)
  {
    if ($level < self::getLogLevel())
      return;

    if (is_null($message))
      $message = 'null';

    if (is_bool($message))
      $message = ($message) ? 'true' : 'false';

    if (!is_string($message))
      $message = print_r($message, true);

    $level = self::getLevelName($level);
    $datetime = gmdate('Y-m-d H:i:s', time() + (get_option('gmt_offset', 0) * HOUR_IN_SECONDS));
    $message = sprintf('[%s] %s: %s', $datetime, $level, $message) . PHP_EOL;

    //TODO archive log if too large, start a fresh one with a message
    file_put_contents(self::getLogFilename(), $message, FILE_APPEND);
  }

  private static function getLogFilename()
  {
    $uploadDir = wp_upload_dir(null, false);
    $file = trailingslashit($uploadDir['basedir']) . 'wordproof-debug.log';
    return apply_filters('wordproof_debug_log_file', $file);
  }

  private static function getLogLevel()
  {
    $level = self::INFO;
    return apply_filters('wordproof_debug_log_level', $level);
  }

  private static function getLevelName($level)
  {
    if (!isset(self::$levels[$level])) {
      return $level[self::INFO];
    }

    return self::$levels[$level];
  }
}
