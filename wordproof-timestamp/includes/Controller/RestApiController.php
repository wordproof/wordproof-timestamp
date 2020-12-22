<?php

namespace WordProofTimestamp\includes\Controller;

class RestApiController
{

    private $namespace = 'wordproof-timestamp/v1';

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'registerRoute']);

        if ($_ENV['APP_ENV'] === 'development') {
            add_filter('https_ssl_verify', '__return_false');
        }

    }

    public function registerRoute()
    {
        register_rest_route($this->namespace, 'posts', [
            'methods' => 'POST',
            'callback' => [AutomaticHooksController::class, 'processCallback'],
        ]);
    }

}
