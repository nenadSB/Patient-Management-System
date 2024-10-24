<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // Include API routes and Sanctum CSRF routes (if using Sanctum for auth)
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Allow all HTTP methods (GET, POST, DELETE, PUT, etc.)
    'allowed_methods' => ['*'],

    // Allow only requests from your Angular front-end, or localhost during development
    'allowed_origins' => ['http://localhost:4200', 'http://127.0.0.1:4200'],

    // Specify patterns (optional, empty array if not used)
    'allowed_origins_patterns' => [],

    // Allow any headers (can be restricted based on your needs)
    'allowed_headers' => ['*'],

    // Expose headers if needed (optional, usually can be left empty)
    'exposed_headers' => [],

    // Cache the CORS preflight response for a certain amount of time (0 = no caching)
    'max_age' => 0,

    // Set to true if your front-end needs to send cookies or authentication tokens
    'supports_credentials' => false,
];

