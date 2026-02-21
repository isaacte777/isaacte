<?php

declare(strict_types=1);

session_abort();

error_reporting(E_ERROR);

/**
 * Define constant with namespace
 */
const APP_NAMESPACE = "Kappascore\\Controller";

/**
 * Define constant with template folder
 */
const VIEWS_TEMPLATE = __DIR__ . "/../templates";

include __DIR__ . '/../../bootstrap.php';
