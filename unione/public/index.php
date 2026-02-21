<?php

declare(strict_types=1);

session_abort();
error_reporting(E_ERROR);

const APP_NAMESPACE = "UnioneApp\\Controller";
const VIEWS_TEMPLATE = __DIR__ . "/../templates";

include __DIR__ . '/../../bootstrap.php';