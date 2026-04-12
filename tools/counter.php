<?php
// Simple visitor counter using a flat file
$counter_file = __DIR__ . '/../visitors.txt';

if (!file_exists($counter_file)) file_put_contents($counter_file, '0');
$count = (int)file_get_contents($counter_file);
file_put_contents($counter_file, ++$count);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode(['visitors' => $count]);
