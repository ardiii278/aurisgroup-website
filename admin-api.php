<?php
// ===== AURIS Group - Endpoint penyimpanan konten (OPSIONAL) =====
// File ini memungkinkan panel admin menulis perubahan langsung ke data.json
// sehingga langsung terlihat oleh pengunjung website.
// Hanya diperlukan jika hosting mendukung PHP. Ganti password di bawah ini.

header('Content-Type: application/json');

define('ADMIN_USER', 'aurisgroup'); // GANTI dengan username Anda
define('ADMIN_PASSWORD', 'default08'); // GANTI dengan password Anda
define('DATA_FILE', __DIR__ . '/data.json');

function respond($ok, $msg = '', $extra = []) {
    echo json_encode(array_merge(['ok' => $ok, 'message' => $msg], $extra));
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    respond(true, 'available');
}

$body = json_decode(file_get_contents('php://input'), true);

if (!$body || !isset($body['user']) || !isset($body['pass'])
    || $body['user'] !== ADMIN_USER || $body['pass'] !== ADMIN_PASSWORD) {
    http_response_code(401);
    respond(false, 'Unauthorized');
}

if ($method === 'POST') {
    if (!isset($body['data'])) {
        respond(false, 'No data');
    }
    $json = json_encode($body['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        respond(false, 'Invalid JSON data');
    }
    if (file_put_contents(DATA_FILE, $json) === false) {
        respond(false, 'Gagal menulis file data.json. Periksa permission folder.');
    }
    respond(true, 'Tersimpan ke data.json');
}

respond(false, 'Method not allowed');
