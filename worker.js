// ===== AURIS Group - Publish Worker =====
// Perantara aman: menerima konten dari admin panel, lalu menulis data.json
// ke GitHub menggunakan token yang tersimpan sebagai SECRET (tidak di kode klien).
//
// Secret yang harus di-set di Cloudflare:
//   - GITHUB_TOKEN : fine-grained token (repo arldiii278/aurisgroup-website, Contents R/W)
//   - PUBLISH_KEY  : kunci bersama (sama dengan nilai di admin.js)

const REPO = 'ardiii278/aurisgroup-website';

function toBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

function json(obj, status) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store'
        }
    });
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });
        }

        if (request.method !== 'POST') {
            return json({ ok: false, message: 'Method not allowed' }, 405);
        }

        let body;
        try {
            body = await request.json();
        } catch (e) {
            return json({ ok: false, message: 'Bad request' }, 400);
        }

        if (!body || body.key !== env.PUBLISH_KEY) {
            return json({ ok: false, message: 'Unauthorized' }, 401);
        }

        const content = body.content;
        if (!content || typeof content !== 'string') {
            return json({ ok: false, message: 'No content' }, 400);
        }

        const token = env.GITHUB_TOKEN;
        if (!token) {
            return json({ ok: false, message: 'Worker belum dikonfigurasi (GITHUB_TOKEN kosong)' }, 500);
        }

        const headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'auris-publish-worker'
        };

        // Ambil SHA data.json saat ini (jika ada)
        let sha = null;
        try {
            const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/data.json`, { headers });
            if (getRes.ok) {
                const j = await getRes.json();
                sha = j.sha;
            } else if (getRes.status !== 404) {
                return json({ ok: false, message: 'Gagal membaca repo (status ' + getRes.status + ')' }, 502);
            }
        } catch (e) {
            return json({ ok: false, message: 'Gagal menghubungi GitHub' }, 502);
        }

        // Tulis data.json
        const putBody = {
            message: 'Update konten website (dari admin panel)',
            content: toBase64(content),
            branch: 'main'
        };
        if (sha) putBody.sha = sha;

        try {
            const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/data.json`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(putBody)
            });
            if (!putRes.ok) {
                const err = await putRes.json().catch(() => ({}));
                return json({ ok: false, message: err.message || ('GitHub menolak (status ' + putRes.status + ')') }, 502);
            }
        } catch (e) {
            return json({ ok: false, message: 'Gagal menulis ke GitHub' }, 502);
        }

        return json({ ok: true, message: 'Tersimpan! Auto-deploy dimulai (1-2 menit).' }, 200);
    }
};
