<?php
// counter.php — not usable on GitHub Pages (no PHP).
// Visitor counting is handled client-side via hits.sh.
// See script.js: fetch('https://hits.sh/ivoryy06.github.io/mps17.json')
//
// To self-host: deploy this file on any PHP server and update
// COUNTER_URL in script.js to point to it.

$counter_file = __DIR__ . '/../visitors.txt';
if (!file_exists($counter_file)) file_put_contents($counter_file, '0');
$count = (int)file_get_contents($counter_file);
file_put_contents($counter_file, ++$count);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode(['visitors' => $count]);
