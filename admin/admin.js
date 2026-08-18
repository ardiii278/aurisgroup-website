// ===== ADMIN AUTH =====
const USER_KEY = 'auris_admin_user';
const PASS_KEY = 'auris_admin_pass';
const AUTH_KEY = 'auris_admin_auth';
const DEFAULT_USER = 'aurisgroup';
const DEFAULT_PASS = 'default08';

function getUsername() {
    return localStorage.getItem(USER_KEY) || DEFAULT_USER;
}

function getPassword() {
    return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
}

// ===== PUBLIKASI KE GITHUB =====
const GITHUB_REPO = 'ardiii278/aurisgroup-website';
const PUBLISH_WORKER_URL = 'https://auris-publish.akunaanimek.workers.dev';
const PUBLISH_KEY = 'XuPKefIqws1NI5JTFY9US90bEsu9eabushkmuPVq';

async function publishToGitHub() {
    const btn = document.getElementById('publishBtn');
    const setBtn = (busy) => {
        if (!btn) return;
        btn.disabled = busy;
        btn.innerHTML = busy
            ? '<i class="fas fa-spinner fa-spin"></i> Mempublikasikan...'
            : '<i class="fas fa-cloud-arrow-up"></i> Publish ke Website';
    };
    setBtn(true);

    try {
        const content = JSON.stringify(data, null, 2);
        const res = await fetch(PUBLISH_WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: PUBLISH_KEY, content })
        });

        const j = await res.json().catch(() => ({}));
        if (!res.ok || !j.ok) {
            throw new Error(j.message || ('Worker error (status ' + res.status + ')'));
        }

        alert('✅ Berhasil dipublikasikan!\nCloudflare Pages akan auto-deploy dalam 1-2 menit.');
    } catch (e) {
        alert('❌ Publikasi gagal: ' + e.message);
    } finally {
        setBtn(false);
    }
}


const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const sectionTitle = document.getElementById('sectionTitle');
const contentArea = document.getElementById('contentArea');
const saveStatus = document.getElementById('saveStatus');

function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

function showLogin() {
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
}

if (sessionStorage.getItem(AUTH_KEY) === '1') {
    showDashboard();
    initDashboard();
} else {
    showLogin();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('userInput').value.trim();
    const pass = document.getElementById('passInput').value;
    if (user === getUsername() && pass === getPassword()) {
        sessionStorage.setItem(AUTH_KEY, '1');
        loginError.textContent = '';
        loginForm.reset();
        showDashboard();
        initDashboard();
    } else {
        loginError.textContent = 'Username atau password salah.';
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
});

// ===== KONFIGURASI SECTION =====
const SECTION_CONFIGS = [
    {
        id: 'navbar', label: 'Navbar', icon: 'fas fa-bars',
        fields: [
            { key: 'ctaText', label: 'Teks Tombol CTA', type: 'text', help: 'Tombol di kanan navbar' },
            { key: 'ctaHref', label: 'Link Tombol CTA', type: 'href' }
        ],
        lists: [
            {
                key: 'links', label: 'Menu Navigasi', singular: 'Menu',
                fields: [
                    { key: 'label', label: 'Label Menu', type: 'text' },
                    { key: 'href', label: 'Link (anchor)', type: 'href' }
                ],
                defaults: { label: 'Menu Baru', href: '#' }
            }
        ]
    },
    {
        id: 'hero', label: 'Hero', icon: 'fas fa-house',
        fields: [
            { key: 'badgeIcon', label: 'Ikon Badge', type: 'icon' },
            { key: 'badgeText', label: 'Teks Badge', type: 'text' },
            { key: 'titlePre', label: 'Judul Bagian Awal', type: 'text' },
            { key: 'titleHighlight', label: 'Kata Highlight (gradien)', type: 'text' },
            { key: 'titlePost', label: 'Judul Bagian Akhir', type: 'text', help: 'Boleh menggunakan <br> untuk baris baru' },
            { key: 'subtitle', label: 'Sub Judul', type: 'textarea' },
            { key: 'ctaPrimaryText', label: 'Teks Tombol Utama', type: 'text' },
            { key: 'ctaPrimaryHref', label: 'Link Tombol Utama', type: 'href' },
            { key: 'ctaSecondaryText', label: 'Teks Tombol Kedua', type: 'text' },
            { key: 'ctaSecondaryHref', label: 'Link Tombol Kedua', type: 'href' }
        ],
        lists: [
            {
                key: 'stats', label: 'Statistik Hero', singular: 'Statistik',
                fields: [
                    { key: 'value', label: 'Angka', type: 'number' },
                    { key: 'suffix', label: 'Suffix', type: 'text', help: 'Misal: +' },
                    { key: 'label', label: 'Label', type: 'text' }
                ],
                defaults: { value: 10, suffix: '+', label: 'Statistik Baru' }
            }
        ]
    },
    {
        id: 'about', label: 'Tentang', icon: 'fas fa-circle-info',
        fields: [
            { key: 'tag', label: 'Tag Section', type: 'text' },
            { key: 'title', label: 'Judul', type: 'text' },
            { key: 'image', label: 'Foto Perusahaan', type: 'image', help: 'Opsional. Ukuran otomatis dikompres (maks 1600px, JPEG).' },
            { key: 'desc1', label: 'Deskripsi 1', type: 'textarea' },
            { key: 'desc2', label: 'Deskripsi 2', type: 'textarea' },
            { key: 'badgeYear', label: 'Tahun Badge', type: 'text' },
            { key: 'badgeText', label: 'Teks Badge', type: 'text', help: 'Boleh <br> (mis. Berdiri<br>Sejak)' },
            { key: 'ctaText', label: 'Teks Tombol', type: 'text' },
            { key: 'ctaHref', label: 'Link Tombol', type: 'href' }
        ],
        lists: [
            { key: 'features', label: 'Keunggulan', singular: 'Keunggulan', stringList: true, defaultValue: 'Keunggulan Baru' }
        ]
    },
    {
        id: 'services', label: 'Layanan', icon: 'fas fa-screwdriver-wrench',
        fields: [
            { key: 'tag', label: 'Tag Section', type: 'text' },
            { key: 'title', label: 'Judul', type: 'text' },
            { key: 'desc', label: 'Deskripsi', type: 'textarea' }
        ],
        lists: [
            {
                key: 'items', label: 'Kartu Layanan', singular: 'Layanan',
                fields: [
                    { key: 'icon', label: 'Ikon (Font Awesome)', type: 'icon' },
                    { key: 'image', label: 'Foto Layanan', type: 'image', help: 'Opsional. Jika diisi, foto menggantikan ikon.' },
                    { key: 'title', label: 'Judul Layanan', type: 'text' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea' }
                ],
                defaults: { icon: 'fas fa-building', image: '', title: 'Layanan Baru', desc: 'Deskripsi layanan...' }
            }
        ]
    },
    {
        id: 'whyUs', label: 'Why Us', icon: 'fas fa-award',
        fields: [
            { key: 'tag', label: 'Tag Section', type: 'text' },
            { key: 'title', label: 'Judul', type: 'text' }
        ],
        lists: [
            {
                key: 'items', label: 'Alasan', singular: 'Alasan',
                fields: [
                    { key: 'title', label: 'Judul', type: 'text' },
                    { key: 'desc', label: 'Deskripsi', type: 'textarea' }
                ],
                defaults: { title: 'Alasan Baru', desc: 'Deskripsi alasan...' }
            }
        ]
    },
    {
        id: 'projects', label: 'Proyek', icon: 'fas fa-folder-open',
        fields: [
            { key: 'tag', label: 'Tag Section', type: 'text' },
            { key: 'title', label: 'Judul', type: 'text' },
            { key: 'desc', label: 'Deskripsi', type: 'textarea' }
        ],
        lists: [
            {
                key: 'filters', label: 'Kategori Filter', singular: 'Kategori',
                fields: [
                    { key: 'key', label: 'Key (unik, huruf kecil)', type: 'text' },
                    { key: 'label', label: 'Label Tombol', type: 'text' }
                ],
                defaults: { key: 'kategori', label: 'Kategori' }
            },
            {
                key: 'items', label: 'Kartu Proyek', singular: 'Proyek',
                fields: [
                    { key: 'category', label: 'Kategori (key filter)', type: 'select', optionsFrom: { path: 'projects.filters', valueKey: 'key', labelKey: 'label', exclude: ['all'] } },
                    { key: 'icon', label: 'Ikon', type: 'icon' },
                    { key: 'image', label: 'Foto Proyek', type: 'image', help: 'Opsional. Jika diisi, foto menggantikan ikon.' },
                    { key: 'gallery', label: 'Galeri Foto (bisa banyak)', type: 'gallery', help: 'Opsional. Foto-foto ini tampil saat kartu proyek diklik.' },
                    { key: 'catLabel', label: 'Label Kategori (badge)', type: 'text' },
                    { key: 'title', label: 'Judul Proyek', type: 'text' },
                    { key: 'location', label: 'Lokasi', type: 'text' }
                ],
                defaults: { category: 'komersial', icon: 'fas fa-building', image: '', gallery: [], catLabel: 'Kategori', title: 'Proyek Baru', location: 'Lokasi' }
            }
        ]
    },
    {
        id: 'stats', label: 'Statistik', icon: 'fas fa-chart-simple',
        lists: [
            {
                key: 'items', label: 'Kartu Statistik', singular: 'Statistik',
                fields: [
                    { key: 'icon', label: 'Ikon', type: 'icon' },
                    { key: 'value', label: 'Angka', type: 'number' },
                    { key: 'suffix', label: 'Suffix', type: 'text' },
                    { key: 'label', label: 'Label', type: 'text' }
                ],
                defaults: { icon: 'fas fa-building', value: 10, suffix: '+', label: 'Statistik Baru' }
            }
        ]
    },
    {
        id: 'testimonials', label: 'Testimoni', icon: 'fas fa-comments',
        fields: [
            { key: 'tag', label: 'Tag Section', type: 'text' },
            { key: 'title', label: 'Judul', type: 'text' },
            { key: 'desc', label: 'Deskripsi', type: 'textarea' }
        ],
        lists: [
            {
                key: 'items', label: 'Testimoni', singular: 'Testimoni',
                fields: [
                    { key: 'image', label: 'Foto Klien', type: 'image', help: 'Opsional. Tampil sebagai avatar bulat.' },
                    { key: 'text', label: 'Isi Testimoni', type: 'textarea' },
                    { key: 'name', label: 'Nama Klien', type: 'text' },
                    { key: 'role', label: 'Jabatan / Info', type: 'text' }
                ],
                defaults: { image: '', text: 'Isi testimoni...', name: 'Nama Klien', role: 'Info Klien' }
            }
        ]
    },
    {
        id: 'cta', label: 'CTA', icon: 'fas fa-bullhorn',
        fields: [
            { key: 'title', label: 'Judul', type: 'text' },
            { key: 'desc', label: 'Deskripsi', type: 'textarea' },
            { key: 'primaryText', label: 'Teks Tombol Utama', type: 'text' },
            { key: 'primaryHref', label: 'Link Tombol Utama', type: 'href' },
            { key: 'waText', label: 'Teks Tombol WhatsApp', type: 'text' },
            { key: 'waHref', label: 'Link WhatsApp (wa.me)', type: 'text' }
        ]
    },
    {
        id: 'contact', label: 'Kontak', icon: 'fas fa-envelope',
        fields: [
            { key: 'tag', label: 'Tag Section', type: 'text' },
            { key: 'title', label: 'Judul', type: 'text' },
            { key: 'desc', label: 'Deskripsi', type: 'textarea' },
            { key: 'waNumber', label: 'Nomor WhatsApp (form & float)', type: 'text', help: 'Format tanpa + atau 0 di depan, misal: 6285771895172' }
        ],
        lists: [
            {
                key: 'info', label: 'Info Kontak', singular: 'Info',
                fields: [
                    { key: 'icon', label: 'Ikon', type: 'icon' },
                    { key: 'title', label: 'Judul', type: 'text' },
                    { key: 'text', label: 'Isi', type: 'textarea', help: 'Boleh <br> untuk baris baru' }
                ],
                defaults: { icon: 'fas fa-phone', title: 'Telepon', text: '08xx-xxxx-xxxx' }
            },
            {
                key: 'socials', label: 'Media Sosial', singular: 'Sosmed',
                fields: [
                    { key: 'icon', label: 'Ikon (fab fa-...)', type: 'icon' },
                    { key: 'href', label: 'Link', type: 'text' }
                ],
                defaults: { icon: 'fab fa-instagram', href: 'https://instagram.com/' }
            }
        ]
    },
    {
        id: 'footer', label: 'Footer', icon: 'fas fa-pager',
        fields: [
            { key: 'brandText', label: 'Teks Brand', type: 'textarea' },
            { key: 'copyright', label: 'Copyright', type: 'text' },
            { key: 'tagline', label: 'Tagline', type: 'text' }
        ],
        lists: [
            {
                key: 'layananLinks', label: 'Link Kolom Layanan', singular: 'Link',
                fields: [
                    { key: 'label', label: 'Label', type: 'text' },
                    { key: 'href', label: 'Link', type: 'href' }
                ],
                defaults: { label: 'Layanan Baru', href: '#services' }
            },
            {
                key: 'companyLinks', label: 'Link Kolom Perusahaan', singular: 'Link',
                fields: [
                    { key: 'label', label: 'Label', type: 'text' },
                    { key: 'href', label: 'Link', type: 'href' }
                ],
                defaults: { label: 'Halaman Baru', href: '#' }
            },
            {
                key: 'contactLines', label: 'Baris Kontak', singular: 'Baris',
                fields: [
                    { key: 'icon', label: 'Ikon', type: 'icon' },
                    { key: 'text', label: 'Teks', type: 'text' }
                ],
                defaults: { icon: 'fas fa-phone', text: '08xx-xxxx-xxxx' }
            }
        ]
    }
];

const CONFIG_MAP = {};
SECTION_CONFIGS.forEach(c => { CONFIG_MAP[c.id] = c; });

// ===== STATE =====
let data = null;
let currentSection = null;
let serverMode = false;
let saveFlashTimer = null;

function esc(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getByPath(obj, path) {
    return path.split('.').reduce((acc, seg) => {
        if (acc == null) return acc;
        const m = seg.match(/^(.+)\[(\d+)\]$/);
        if (m) return acc[m[1]] ? acc[m[1]][+m[2]] : undefined;
        return acc[seg];
    }, obj);
}

function setByPath(obj, path, value) {
    const segs = path.split('.');
    let cur = obj;
    segs.forEach((seg, idx) => {
        const m = seg.match(/^(.+)\[(\d+)\]$/);
        const isLast = idx === segs.length - 1;
        if (m) {
            const arrName = m[1];
            const i = +m[2];
            if (isLast) {
                cur[arrName][i] = value;
            } else {
                cur = cur[arrName][i];
            }
        } else {
            if (isLast) {
                cur[seg] = value;
            } else {
                cur = cur[seg];
            }
        }
    });
}

// ===== SAVE =====
function flashSave() {
    saveStatus.textContent = 'Tersimpan ✓' + (serverMode ? ' (data.json)' : '');
    saveStatus.classList.remove('flash');
    void saveStatus.offsetWidth;
    saveStatus.classList.add('flash');
}

function save() {
    AURISStore.save(data);
    if (serverMode) {
        fetch('../admin-api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: getUsername(), pass: getPassword(), data })
        }).catch(() => { /* server mungkin nonaktif */ });
    }
    flashSave();
}

// ===== DETECT SERVER MODE (admin-api.php) =====
function detectServer() {
    return fetch('../admin-api.php', { cache: 'no-store' })
        .then(r => {
            if (!r.ok) throw new Error('no server');
            return r.json();
        })
        .then(j => { serverMode = !!(j && j.ok); })
        .catch(() => { serverMode = false; });
}

// ===== FORM RENDERING =====
function fieldHtml(cfg, field, obj, bindPath) {
    const hasKey = obj != null && Object.prototype.hasOwnProperty.call(obj, field.key);
    const value = hasKey ? obj[field.key] : (field.default ?? '');
    const id = 'f_' + bindPath.replace(/[^a-zA-Z0-9]/g, '_');
    const placeholder = field.placeholder ? ` placeholder="${esc(field.placeholder)}"` : '';
    let control = '';

    if (field.type === 'textarea') {
        control = `<textarea id="${id}" data-bind="${bindPath}" rows="4"${placeholder}>${esc(value)}</textarea>`;
    } else if (field.type === 'number') {
        control = `<input type="number" id="${id}" data-bind="${bindPath}" value="${esc(value)}">`;
    } else if (field.type === 'select') {
        let options = '';
        if (field.optionsFrom) {
            const src = getByPath(data, field.optionsFrom.path) || [];
            options = src
                .filter(o => !(field.optionsFrom.exclude || []).includes(o[field.optionsFrom.valueKey]))
                .map(o => {
                    const v = o[field.optionsFrom.valueKey];
                    return `<option value="${esc(v)}"${String(value) === String(v) ? ' selected' : ''}>${esc(o[field.optionsFrom.labelKey])}</option>`;
                }).join('');
        } else if (field.options) {
            options = field.options.map(o =>
                `<option value="${esc(o.value)}"${String(value) === String(o.value) ? ' selected' : ''}>${esc(o.label)}</option>`
            ).join('');
        }
        control = `<select id="${id}" data-bind="${bindPath}">${options}</select>`;
    } else if (field.type === 'icon') {
        control = `
            <div class="icon-input">
                <input type="text" id="${id}" data-bind="${bindPath}" value="${esc(value)}" list="iconList" placeholder="fas fa-building">
                <span class="icon-preview" data-preview-for="${id}"><i class="${esc(value)}"></i></span>
            </div>`;
    } else if (field.type === 'image') {
        control = `
            <div class="image-input">
                <input type="hidden" id="${id}" data-bind="${bindPath}" value="${esc(value)}">
                <div class="image-preview-box" data-preview-for="${id}">
                    ${value
                        ? `<img src="${esc(value)}" alt="preview">`
                        : '<span class="image-preview-empty"><i class="fas fa-image"></i> Belum ada gambar</span>'}
                </div>
                <div class="image-input-actions">
                    <button type="button" class="btn-add btn-sm" data-upload-for="${id}">
                        <i class="fas fa-upload"></i> Pilih Gambar
                    </button>
                    <button type="button" class="btn-danger btn-sm" data-clear-for="${id}"${value ? '' : ' style="display: none;"'}>
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                    <input type="file" accept="image/*" hidden data-file-for="${id}">
                </div>
            </div>`;
    } else if (field.type === 'gallery') {
        const galleryList = Array.isArray(value) ? value : [];
        control = `
            <div class="gallery-input">
                <input type="hidden" id="${id}" data-bind="${bindPath}" data-gallery="1" value="${esc(JSON.stringify(galleryList))}">
                <div class="gallery-preview-grid" data-gallery-preview-for="${id}">
                    ${galleryList.map((src, gi) => `
                        <div class="gallery-preview-item">
                            <img src="${esc(src)}" alt="galeri ${gi + 1}">
                            <button type="button" class="gallery-remove-btn" data-gallery-remove="${id}:${gi}" title="Hapus"><i class="fas fa-times"></i></button>
                        </div>`).join('')}
                </div>
                <button type="button" class="btn-add btn-sm" data-gallery-upload-for="${id}">
                    <i class="fas fa-upload"></i> Tambah Foto
                </button>
                <input type="file" accept="image/*" hidden data-gallery-file-for="${id}">
            </div>`;
    } else {
        const listAttr = field.type === 'href' ? ' list="anchorList"' : '';
        control = `<input type="text" id="${id}" data-bind="${bindPath}" value="${esc(value)}"${listAttr}${placeholder}>`;
    }

    return `
        <div class="form-group${(field.type === 'textarea' || field.type === 'image' || field.type === 'gallery') ? ' full' : ''}">
            <label for="${id}">${esc(field.label)}</label>
            ${control}
            ${field.help ? `<small class="field-help">${esc(field.help)}</small>` : ''}
        </div>`;
}

function listHtml(cfg, list, sectionData) {
    const items = sectionData[list.key] || [];

    let itemsHtml = '';
    if (list.stringList) {
        itemsHtml = items.map((item, i) => `
            <div class="list-item">
                <div class="list-item-head">
                    <span class="list-item-title">${esc(list.singular)} #${i + 1}</span>
                    <button type="button" class="btn-danger btn-sm" data-del="${cfg.id}.${list.key}[${i}]">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
                <div class="form-group full">
                    <input type="text" data-bind="${cfg.id}.${list.key}[${i}]" value="${esc(item)}">
                </div>
            </div>`).join('');
    } else {
        itemsHtml = items.map((item, i) => `
            <div class="list-item">
                <div class="list-item-head">
                    <span class="list-item-title">${esc(list.singular)} #${i + 1}</span>
                    <button type="button" class="btn-danger btn-sm" data-del="${cfg.id}.${list.key}[${i}]">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
                <div class="fields-grid">
                    ${list.fields.map(f =>
                        fieldHtml(cfg, f, item, `${cfg.id}.${list.key}[${i}].${f.key}`)
                    ).join('')}
                </div>
            </div>`).join('');
    }

    return `
        <div class="card">
            <div class="card-head">
                <h2 class="card-title">${esc(list.label)} <span class="count-badge">${items.length}</span></h2>
                <button type="button" class="btn-add" data-add="${cfg.id}.${list.key}">
                    <i class="fas fa-plus"></i> Tambah
                </button>
            </div>
            ${itemsHtml || '<p class="empty-msg">Belum ada data. Klik "Tambah" untuk menambahkan.</p>'}
        </div>`;
}

function openSection(cfgId) {
    if (cfgId === 'settings') {
        renderSettings();
        return;
    }
    const cfg = CONFIG_MAP[cfgId];
    if (!cfg) return;
    currentSection = cfg;

    sectionTitle.textContent = cfg.label;
    document.querySelectorAll('.side-link').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-section') === cfgId);
    });

    const sectionData = data[cfg.id];
    let html = '';

    if (cfg.fields && cfg.fields.length) {
        html += `
            <div class="card">
                <h2 class="card-title" style="margin-bottom: 20px;"><i class="fas fa-pen"></i> Konten Utama</h2>
                <div class="fields-grid">
                    ${cfg.fields.map(f => fieldHtml(cfg, f, sectionData, `${cfg.id}.${f.key}`)).join('')}
                </div>
            </div>`;
    }

    (cfg.lists || []).forEach(list => {
        html += listHtml(cfg, list, sectionData);
    });

    contentArea.innerHTML = html;
    bindInputs(contentArea);
}

function bindInputs(container) {
    container.querySelectorAll('[data-bind]').forEach(el => {
        const handler = () => {
            const path = el.getAttribute('data-bind');
            let value = el.value;
            if (el.type === 'number') {
                value = value === '' ? 0 : Number(value);
            } else if (el.getAttribute('data-gallery') !== null) {
                try { value = JSON.parse(el.value || '[]'); } catch (e) { value = []; }
            }
            setByPath(data, path, value);
            save();
            if (container.querySelector(`.image-preview-box[data-preview-for="${el.id}"]`)) {
                updateImagePreview(container, el.id);
            }
        };
        el.addEventListener('input', handler);
        if (el.tagName === 'SELECT') {
            el.addEventListener('change', handler);
        }
    });

    container.querySelectorAll('.icon-preview[data-preview-for]').forEach(preview => {
        const input = document.getElementById(preview.getAttribute('data-preview-for'));
        if (!input) return;
        input.addEventListener('input', () => {
            preview.innerHTML = `<i class="${esc(input.value)}"></i>`;
        });
    });

    container.querySelectorAll('[data-upload-for]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-upload-for');
            const fileInput = container.querySelector(`[data-file-for="${targetId}"]`);
            if (fileInput) fileInput.click();
        });
    });

    container.querySelectorAll('[data-file-for]').forEach(fileInput => {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files && fileInput.files[0];
            if (!file) return;
            const targetId = fileInput.getAttribute('data-file-for');
            const hidden = container.querySelector(`#${targetId}`);
            processImageFile(file, (dataUrl) => {
                if (!dataUrl) {
                    alert('Gagal memuat gambar. Coba file lain.');
                    return;
                }
                hidden.value = dataUrl;
                hidden.dispatchEvent(new Event('input', { bubbles: true }));
                updateImagePreview(container, targetId);
            });
            fileInput.value = '';
        });
    });

    container.querySelectorAll('[data-clear-for]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-clear-for');
            const hidden = container.querySelector(`#${targetId}`);
            if (!hidden) return;
            hidden.value = '';
            hidden.dispatchEvent(new Event('input', { bubbles: true }));
            updateImagePreview(container, targetId);
        });
    });

    container.querySelectorAll('[data-gallery-upload-for]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-gallery-upload-for');
            const fileInput = container.querySelector(`[data-gallery-file-for="${targetId}"]`);
            if (fileInput) fileInput.click();
        });
    });

    container.querySelectorAll('[data-gallery-file-for]').forEach(fileInput => {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files && fileInput.files[0];
            if (!file) return;
            const targetId = fileInput.getAttribute('data-gallery-file-for');
            const hidden = container.querySelector(`#${targetId}`);
            processImageFile(file, (dataUrl) => {
                if (!dataUrl) {
                    alert('Gagal memuat gambar. Coba file lain.');
                    return;
                }
                let arr = [];
                try { arr = JSON.parse(hidden.value || '[]'); } catch (e) { arr = []; }
                arr.push(dataUrl);
                hidden.value = JSON.stringify(arr);
                hidden.dispatchEvent(new Event('input', { bubbles: true }));
                updateGalleryPreview(container, targetId);
            });
            fileInput.value = '';
        });
    });

    container.querySelectorAll('[data-gallery-preview-for]').forEach(grid => {
        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-gallery-remove]');
            if (!btn) return;
            const attr = btn.getAttribute('data-gallery-remove');
            const sep = attr.indexOf(':');
            const targetId = attr.slice(0, sep);
            const idx = parseInt(attr.slice(sep + 1), 10);
            const hidden = container.querySelector(`#${targetId}`);
            if (!hidden) return;
            let arr = [];
            try { arr = JSON.parse(hidden.value || '[]'); } catch (e) { arr = []; }
            arr.splice(idx, 1);
            hidden.value = JSON.stringify(arr);
            hidden.dispatchEvent(new Event('input', { bubbles: true }));
            updateGalleryPreview(container, targetId);
        });
    });
}

function updateImagePreview(container, targetId) {
    const hidden = container.querySelector(`#${targetId}`);
    const box = container.querySelector(`[data-preview-for="${targetId}"]`);
    const clearBtn = container.querySelector(`[data-clear-for="${targetId}"]`);
    if (!hidden || !box) return;
    const v = hidden.value;
    box.innerHTML = v
        ? `<img src="${esc(v)}" alt="preview">`
        : '<span class="image-preview-empty"><i class="fas fa-image"></i> Belum ada gambar</span>';
    if (clearBtn) clearBtn.style.display = v ? '' : 'none';
}

function updateGalleryPreview(container, targetId) {
    const hidden = container.querySelector(`#${targetId}`);
    const grid = container.querySelector(`[data-gallery-preview-for="${targetId}"]`);
    if (!hidden || !grid) return;
    let arr = [];
    try { arr = JSON.parse(hidden.value || '[]'); } catch (e) { arr = []; }
    grid.innerHTML = arr.map((src, gi) => `
        <div class="gallery-preview-item">
            <img src="${esc(src)}" alt="galeri ${gi + 1}">
            <button type="button" class="gallery-remove-btn" data-gallery-remove="${targetId}:${gi}" title="Hapus"><i class="fas fa-times"></i></button>
        </div>`).join('');
}

function processImageFile(file, cb) {
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            try {
                const maxW = 1600;
                let w = img.width;
                let h = img.height;
                if (w > maxW) {
                    h = Math.round(h * maxW / w);
                    w = maxW;
                }
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                cb(canvas.toDataURL('image/jpeg', 0.85));
            } catch (e) {
                cb(null);
            }
        };
        img.onerror = () => cb(null);
        img.src = reader.result;
    };
    reader.onerror = () => cb(null);
    reader.readAsDataURL(file);
}

// ===== ADD / DELETE =====
document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
        const path = addBtn.getAttribute('data-add');
        const [cfgId, listKey] = path.split('.');
        const cfg = CONFIG_MAP[cfgId];
        const list = cfg.lists.find(l => l.key === listKey);
        const arr = getByPath(data, path);
        if (!Array.isArray(arr)) return;
        if (list.stringList) {
            arr.push(list.defaultValue || 'Item Baru');
        } else {
            arr.push(clone(list.defaults));
        }
        save();
        openSection(cfgId);
        return;
    }

    const delBtn = e.target.closest('[data-del]');
    if (delBtn) {
        const path = delBtn.getAttribute('data-del');
        if (!confirm('Hapus item ini?')) return;
        const m = path.match(/^(.+)\.([a-zA-Z0-9]+)\[(\d+)\]$/);
        if (!m) return;
        const parent = getByPath(data, m[1]);
        if (parent && Array.isArray(parent[m[2]])) {
            parent[m[2]].splice(+m[3], 1);
            save();
            openSection(currentSection.id);
        }
    }
});

// ===== SETTINGS =====
function renderSettings() {
    currentSection = { id: 'settings' };
    sectionTitle.textContent = 'Pengaturan';
    document.querySelectorAll('.side-link').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-section') === 'settings');
    });

    contentArea.innerHTML = `
        <div class="card">
            <h2 class="card-title" style="margin-bottom: 20px;"><i class="fas fa-key"></i> Ganti Username & Password</h2>
            <p class="card-note">Kredensial tersimpan di browser ini. Untuk menggantinya, masukkan password saat ini.</p>
            <div class="fields-grid">
                <div class="form-group">
                    <label for="newUser">Username Baru</label>
                    <input type="text" id="newUser" value="${esc(getUsername())}" autocomplete="username">
                </div>
                <div class="form-group">
                    <label for="curPass">Password Saat Ini</label>
                    <input type="password" id="curPass" autocomplete="current-password">
                </div>
                <div class="form-group">
                    <label for="newPass">Password Baru</label>
                    <input type="password" id="newPass" autocomplete="new-password">
                </div>
                <div class="form-group">
                    <label for="newPass2">Ulangi Password Baru</label>
                    <input type="password" id="newPass2" autocomplete="new-password">
                </div>
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center; flex-wrap: wrap; gap: 12px;">
                <button type="button" class="btn-primary" id="changePassBtn">
                    <i class="fas fa-save"></i> Simpan Kredensial
                </button>
                <span id="passMsg" class="inline-msg"></span>
            </div>
        </div>

        <div class="card">
            <h2 class="card-title" style="margin-bottom: 20px;"><i class="fas fa-database"></i> Data & Publikasi</h2>
            <p class="card-note" id="storageInfo"></p>
            <div class="settings-actions">
                <button type="button" class="btn-primary" id="exportBtn">
                    <i class="fas fa-download"></i> Export data.json
                </button>
                <label class="btn-outline">
                    <i class="fas fa-upload"></i> Import data.json
                    <input type="file" id="importFile" accept=".json" hidden>
                </label>
                <button type="button" class="btn-danger" id="resetBtn">
                    <i class="fas fa-rotate-left"></i> Reset ke Default
                </button>
            </div>
            <p class="card-note">
                Website membaca konten dengan prioritas: hasil edit di browser ini (localStorage) → file <code>data.json</code> → konten bawaan.
                Di hosting statis tanpa backend, publikasikan perubahan dengan Export <code>data.json</code> lalu unggah ke folder website.
            </p>
        </div>

        <div class="card">
            <h2 class="card-title" style="margin-bottom: 20px;"><i class="fas fa-cloud-arrow-up"></i> Publikasi Otomatis (via Worker)</h2>
            <p class="card-note">Tombol <b>Publish ke Website</b> mengirim <code>data.json</code> ke Cloudflare Worker, lalu Worker menulisnya ke GitHub secara aman (token GitHub tersimpan sebagai secret di Cloudflare, bukan di kode). Auto-deploy Cloudflare Pages berjalan 1-2 menit setelahnya.</p>
            <div style="margin-top: 14px; display: flex; align-items: center; flex-wrap: wrap; gap: 12px;">
                <button type="button" class="btn-primary" id="publishSettingsBtn"><i class="fas fa-cloud-arrow-up"></i> Publish Sekarang</button>
                <span id="ghMsg" class="inline-msg"></span>
            </div>
            <p class="card-note" style="margin-top: 14px;">
                Worker URL: <code>auris-publish.akunaanimek.workers.dev</code>. Jika worker belum dibuat atau gagal, hubungi admin untuk setup.
            </p>
        </div>`;

    updateStorageInfo();

    document.getElementById('changePassBtn').addEventListener('click', () => {
        const msg = document.getElementById('passMsg');
        const newUser = document.getElementById('newUser').value.trim();
        const cur = document.getElementById('curPass').value;
        const n1 = document.getElementById('newPass').value;
        const n2 = document.getElementById('newPass2').value;
        msg.classList.remove('error');

        if (cur !== getPassword()) {
            msg.textContent = 'Password saat ini salah.';
            msg.classList.add('error');
            return;
        }
        if (newUser.length < 3) {
            msg.textContent = 'Username minimal 3 karakter.';
            msg.classList.add('error');
            return;
        }
        if (n1.length < 5) {
            msg.textContent = 'Password baru minimal 5 karakter.';
            msg.classList.add('error');
            return;
        }
        if (n1 !== n2) {
            msg.textContent = 'Konfirmasi password tidak sama.';
            msg.classList.add('error');
            return;
        }
        localStorage.setItem(USER_KEY, newUser);
        localStorage.setItem(PASS_KEY, n1);
        msg.textContent = 'Username & password berhasil diganti.';
        document.getElementById('curPass').value = '';
        document.getElementById('newPass').value = '';
        document.getElementById('newPass2').value = '';
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                if (!parsed || typeof parsed !== 'object' || !parsed.navbar || !parsed.hero) {
                    throw new Error('invalid');
                }
                data = deepMerge(DEFAULT_CONTENT, parsed);
                save();
                alert('Data berhasil diimpor.');
                openSection('navbar');
            } catch (err) {
                alert('File JSON tidak valid.');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        if (!confirm('Kembalikan semua konten ke default? Semua perubahan Anda akan hilang.')) return;
        AURISStore.clear();
        data = AURISStore.defaults();
        save();
        openSection('navbar');
    });

    document.getElementById('publishSettingsBtn').addEventListener('click', publishToGitHub);
}

function updateStorageInfo() {
    const el = document.getElementById('storageInfo');
    if (!el) return;
    if (serverMode) {
        el.innerHTML = '<i class="fas fa-server" style="color: var(--green);"></i> <b>Mode server aktif:</b> setiap perubahan otomatis ditulis ke <code>data.json</code> dan langsung terlihat oleh pengunjung website.';
    } else {
        el.innerHTML = '<i class="fas fa-browser" style="color: var(--primary);"></i> <b>Mode lokal:</b> perubahan tersimpan di browser ini dan langsung terlihat saat Anda buka <code>index.html</code>. Untuk memublikasikan ke pengunjung, gunakan <b>Export data.json</b> lalu unggah file tersebut ke folder website (atau pasang <code>admin-api.php</code> di hosting PHP untuk mode otomatis).';
    }
}

// ===== SIDEBAR =====
function renderSidebar() {
    const sidebarNav = document.getElementById('sidebarNav');
    sidebarNav.innerHTML = '';

    SECTION_CONFIGS.forEach(cfg => {
        const btn = document.createElement('button');
        btn.className = 'side-link';
        btn.setAttribute('data-section', cfg.id);
        btn.innerHTML = `<i class="${cfg.icon}"></i><span>${cfg.label}</span>`;
        btn.addEventListener('click', () => openSection(cfg.id));
        sidebarNav.appendChild(btn);
    });

    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'side-link';
    settingsBtn.setAttribute('data-section', 'settings');
    settingsBtn.innerHTML = '<i class="fas fa-gear"></i><span>Pengaturan</span>';
    settingsBtn.addEventListener('click', () => openSection('settings'));
    sidebarNav.appendChild(settingsBtn);
}

// ===== INIT DASHBOARD =====
let dashboardReady = false;

async function initDashboard() {
    if (dashboardReady) return;
    dashboardReady = true;

    data = AURISStore.getMerged();
    renderSidebar();
    await detectServer();
    openSection('navbar');

    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) publishBtn.addEventListener('click', publishToGitHub);
}
