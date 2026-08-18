// ===== LAPISAN DATA & PENYIMPANAN =====
// Konten seluruh website disimpan di sini.
// Prioritas baca: localStorage (hasil edit admin) -> data.json (publikasi) -> DEFAULT_CONTENT

const STORAGE_KEY = 'auris_content';

const DEFAULT_CONTENT = {
  navbar: {
    links: [
      { label: 'Beranda', href: '#home' },
      { label: 'Tentang', href: '#about' },
      { label: 'Layanan', href: '#services' },
      { label: 'Proyek', href: '#projects' },
      { label: 'Testimoni', href: '#testimonials' },
      { label: 'Kontak', href: '#contact' }
    ],
    ctaText: 'Konsultasi Gratis',
    ctaHref: '#contact'
  },
  hero: {
    badgeIcon: 'fas fa-hard-hat',
    badgeText: 'Architecture & Interior Since 2025',
    titlePre: 'We Offer',
    titleHighlight: 'Solutions',
    titlePost: 'to All<br>Your Construction Needs',
    subtitle: 'AURIS Group adalah mitra tepercaya di bidang konstruksi, desain interior, dan penyelenggaraan event. Kami menghadirkan solusi terintegrasi dengan standar profesionalisme tinggi, ketepatan waktu, dan efisiensi biaya.',
    stats: [
      { value: 50, suffix: '+', label: 'Proyek Terencana & Berjalan' },
      { value: 7, suffix: '+', label: 'Mitra Korporat' },
      { value: 6, suffix: '+', label: 'Lini Layanan' }
    ],
    ctaPrimaryText: 'Lihat Proyek Kami',
    ctaPrimaryHref: '#projects',
    ctaSecondaryText: 'Tentang Kami',
    ctaSecondaryHref: '#about'
  },
  about: {
    tag: 'Tentang Kami',
    title: 'Solusi Terintegrasi untuk Konstruksi, Interior & Event',
    image: '',
    desc1: 'AURIS Group adalah grup perusahaan tepercaya yang bergerak di bidang konstruksi, desain interior, dan penyelenggaraan event, yang berkomitmen menghadirkan solusi terintegrasi dengan standar profesionalisme tinggi.',
    desc2: 'Kami mengedepankan ketepatan waktu, efisiensi biaya, serta mutu pekerjaan sebagai prioritas utama di setiap proyek. Diperkuat oleh tim ahli mulai dari arsitek, project manager, engineer, hingga manajemen lapangan yang berpengalaman.',
    features: [
      'Tim Ahli Berpengalaman',
      'Standar K3 & Peduli Lingkungan',
      'Mitra Instansi & Swasta Besar',
      'Tepat Waktu & Efisien Biaya'
    ],
    badgeYear: '2025',
    badgeText: 'Berdiri<br>Sejak',
    ctaText: 'Hubungi Kami',
    ctaHref: '#contact'
  },
  services: {
    tag: 'Layanan Kami',
    title: 'Solusi Konstruksi Lengkap untuk Setiap Kebutuhan',
    desc: 'Kami menyediakan layanan konstruksi menyeluruh dari perencanaan hingga finishing dengan standar mutu terbaik.',
    items: [
      { icon: 'fas fa-building', image: '', title: 'Konstruksi Bangunan', desc: 'Pembangunan gedung komersial, kafe, kantor, dan bangunan lainnya dengan standar mutu tinggi dan pengerjaan profesional.' },
      { icon: 'fas fa-couch', image: '', title: 'Interior Design', desc: 'Desain dan pengerjaan ruangan untuk hunian, kantor, kafe, dan ruang komersial dengan gaya yang estetis dan fungsional.' },
      { icon: 'fas fa-bolt', image: '', title: 'Instalasi Elektrikal', desc: 'Pemasangan dan perawatan sistem kelistrikan bangunan dengan standar keselamatan dan efisiensi energi yang optimal.' },
      { icon: 'fas fa-water', image: '', title: 'Instalasi Irigasi & Drainase', desc: 'Perencanaan dan pembangunan sistem irigasi serta drainase untuk area komersial, perumahan, dan kawasan industri.' },
      { icon: 'fas fa-calendar-star', image: '', title: 'Event Organizer', desc: 'Penyelenggaraan event korporat, launching, gathering, dan acara spesial dengan konsep kreatif dan eksekusi profesional.' },
      { icon: 'fas fa-drafting-compass', image: '', title: 'Arsitektur & Perencanaan Struktur', desc: 'Jasa perencanaan arsitektur dan struktur bangunan, mulai dari konsep desain hingga gambar kerja detail.' }
    ]
  },
  whyUs: {
    tag: 'Mengapa Memilih Kami',
    title: 'Komitmen Kami adalah Kepuasan dan Keamanan Anda',
    items: [
      { title: 'Solusi Terintegrasi', desc: 'Ahli di bidang Arsitektur, Konstruksi, Desain Interior, hingga Event dalam satu grup perusahaan.' },
      { title: 'Profesional & Berintegritas', desc: 'Didukung tim ahli yang kompeten mulai dari arsitek hingga manajemen lapangan.' },
      { title: 'Fokus pada Mutu & Efisiensi', desc: 'Mengutamakan mutu pekerjaan, efisiensi biaya, serta ketepatan waktu proyek.' },
      { title: 'Standar Keamanan Tinggi', desc: 'Berkomitmen penuh menerapkan sistem keselamatan dan kesehatan kerja (K3) serta peduli lingkungan.' }
    ]
  },
  projects: {
    tag: 'Portfolio',
    title: 'Proyek yang Telah Kami Selesaikan',
    desc: 'Setiap proyek adalah bukti dedikasi kami terhadap kualitas dan kepuasan klien.',
    filters: [
      { key: 'all', label: 'Semua' },
      { key: 'komersial', label: 'Komersial' },
      { key: 'residensial', label: 'Residensial' },
      { key: 'perkantoran', label: 'Perkantoran' },
      { key: 'infrastruktur', label: 'Infrastruktur' }
    ],
    items: [
      { category: 'komersial', icon: 'fas fa-mug-hot', image: '', catLabel: 'Kafe / Komersial', title: 'Cafe LIMA MANGKOK', location: 'Pondok Labu, Jakarta Selatan', gallery: [] },
      { category: 'komersial', icon: 'fas fa-coffee', image: '', catLabel: 'Kafe / Komersial', title: 'KATA SIAPA KOPI Kemang', location: 'Kemang, Jakarta Selatan', gallery: [] },
      { category: 'residensial', icon: 'fas fa-home', image: '', catLabel: 'Residensial', title: 'Interior "Tom House"', location: 'Jakarta Selatan', gallery: [] },
      { category: 'perkantoran', icon: 'fas fa-briefcase', image: '', catLabel: 'Perkantoran', title: 'Vessel Tower Office', location: 'Jakarta', gallery: [] },
      { category: 'perkantoran', icon: 'fas fa-laptop-house', image: '', catLabel: 'Perkantoran', title: 'Inovagit Solution Office', location: 'Sentul, Bogor', gallery: [] },
      { category: 'infrastruktur', icon: 'fas fa-tree', image: '', catLabel: 'Infrastruktur & Landsekap', title: 'BMW & Kota Podomoro Tenjo', location: 'Tangerang & Tenjo, Bogor', gallery: [] }
    ]
  },
  stats: {
    items: [
      { icon: 'fas fa-project-diagram', value: 50, suffix: '+', label: 'Proyek Terencana & Berjalan' },
      { icon: 'fas fa-handshake', value: 7, suffix: '+', label: 'Mitra Korporat Besar' },
      { icon: 'fas fa-user-tie', value: 6, suffix: '', label: 'Lini Layanan' },
      { icon: 'fas fa-building', value: 3, suffix: '', label: 'Divisi Bisnis' }
    ]
  },
  testimonials: {
    tag: 'Testimoni',
    title: 'Apa Kata Klien Kami',
    desc: 'Kepuasan klien adalah prioritas utama kami dalam setiap proyek.',
    items: [
      { image: '', text: '"Kerja sama yang sangat baik dalam merancang ruang kerja dan ruang santai kami di Sentul. Desain yang dihadirkan sangat inovatif, fungsional, dan sesuai dengan kultur perusahaan kami."', name: 'Manajemen Inovagit Solution', role: 'Klien Korporat, Sentul' },
      { image: '', text: '"AURIS Group berhasil mengeksekusi pembangunan sekaligus interior kafe kami dengan standar pengerjaan yang rapi, estetis, dan selesai tepat waktu."', name: 'Manajemen LIMA MANGKOK', role: 'Klien Komersial, Pondok Labu' },
      { image: '', text: '"Sangat puas dengan hasil penataan interior rumah kami di Jakarta Selatan. Tim desainer sangat responsif dalam mendengarkan kebutuhan kami."', name: 'Ibu Halizah', role: 'Klien Residensial, Jakarta Selatan' }
    ]
  },
  cta: {
    title: 'Siap Memulai Proyek Impian Anda?',
    desc: 'Konsultasikan kebutuhan konstruksi Anda dengan tim ahli kami. Gratis estimasi biaya untuk proyek Anda.',
    primaryText: 'Hubungi Kami Sekarang',
    primaryHref: '#contact',
    waText: 'Chat WhatsApp',
    waHref: 'https://wa.me/6285771895172'
  },
  contact: {
    tag: 'Kontak',
    title: 'Hubungi Kami',
    desc: 'Kami siap membantu mewujudkan proyek konstruksi Anda. Hubungi kami untuk konsultasi gratis.',
    waNumber: '6285771895172',
    info: [
      { icon: 'fas fa-map-marker-alt', title: 'Alamat Kantor', text: 'Jl. Nangka Raya No. 5, RT 008 RW 05, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
      { icon: 'fab fa-whatsapp', title: 'WhatsApp', text: '0857-7189-5172<br>0858-1112-3960' },
      { icon: 'fas fa-envelope', title: 'Email', text: 'aurisgroupid@gmail.com' },
      { icon: 'fas fa-clock', title: 'Jam Operasional', text: 'Senin - Jumat: 08.00 - 17.00 WIB<br>Sabtu: 08.00 - 13.00 WIB' }
    ],
    socials: [
      { icon: 'fab fa-instagram', href: 'https://instagram.com/aurisgroup.id' },
      { icon: 'fab fa-facebook-f', href: 'https://facebook.com/AurisGroupID' }
    ]
  },
  footer: {
    brandText: 'Grup perusahaan tepercaya di bidang konstruksi, desain interior, dan penyelenggaraan event. Berdiri sejak 2025.',
    layananLinks: [
      { label: 'Konstruksi Bangunan', href: '#services' },
      { label: 'Interior Design', href: '#services' },
      { label: 'Instalasi Elektrikal', href: '#services' },
      { label: 'Irigasi & Drainase', href: '#services' },
      { label: 'Event Organizer', href: '#services' },
      { label: 'Arsitektur & Struktur', href: '#services' }
    ],
    companyLinks: [
      { label: 'Tentang Kami', href: '#about' },
      { label: 'Portfolio', href: '#projects' },
      { label: 'Testimoni', href: '#testimonials' },
      { label: 'Karir', href: '#' },
      { label: 'Kontak', href: '#contact' }
    ],
    contactLines: [
      { icon: 'fas fa-map-marker-alt', text: 'Jl. Nangka Raya No. 5, Tanjung Barat, Jagakarsa, Jakarta Selatan' },
      { icon: 'fab fa-whatsapp', text: '0857-7189-5172' },
      { icon: 'fas fa-envelope', text: 'aurisgroupid@gmail.com' }
    ],
    copyright: '© 2026 AURIS Group. All Rights Reserved.',
    tagline: 'Kontraktor Umum Terpercaya di Indonesia'
  }
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepMerge(defaults, stored) {
  if (Array.isArray(defaults)) {
    return Array.isArray(stored) ? stored : defaults;
  }
  if (defaults && typeof defaults === 'object') {
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return defaults;
    const out = {};
    Object.keys(defaults).forEach(key => {
      out[key] = Object.prototype.hasOwnProperty.call(stored, key)
        ? deepMerge(defaults[key], stored[key])
        : defaults[key];
    });
    return out;
  }
  return stored !== undefined && stored !== null ? stored : defaults;
}

const AURISStore = {
  KEY: STORAGE_KEY,
  getLocal() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  getMerged() {
    return deepMerge(DEFAULT_CONTENT, this.getLocal());
  },
  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  },
  clear() {
    try {
      localStorage.removeItem(this.KEY);
    } catch (e) { /* noop */ }
  },
  defaults() {
    return clone(DEFAULT_CONTENT);
  }
};
