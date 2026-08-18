// ===== LOAD CONTENT =====
let content = null;

function esc(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

async function loadContent() {
    if (AURISStore.getLocal()) {
        content = AURISStore.getMerged();
        return;
    }
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3000);
        const res = await fetch('data.json', { cache: 'no-store', signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
            const json = await res.json();
            content = deepMerge(DEFAULT_CONTENT, json);
            return;
        }
    } catch (e) {
        // tidak ada data.json -> pakai default
    }
    content = AURISStore.defaults();
}

// ===== RENDER FUNCTIONS =====
function renderNavbar() {
    const nav = content.navbar;
    document.getElementById('navMenu').innerHTML = nav.links.map((l, i) =>
        `<a href="${esc(l.href)}" class="nav-link${i === 0 ? ' active' : ''}">${esc(l.label)}</a>`
    ).join('');
    const cta = document.getElementById('navCta');
    cta.textContent = nav.ctaText;
    cta.setAttribute('href', nav.ctaHref || '#contact');
}

function renderHero() {
    const h = content.hero;
    document.getElementById('heroInner').innerHTML = `
        <div class="hero-badge" data-aos="fade-down">
            <i class="${esc(h.badgeIcon)}"></i>
            <span>${esc(h.badgeText)}</span>
        </div>
        <h1 class="hero-title" data-aos="fade-up">
            ${esc(h.titlePre)} <span class="text-gradient">${esc(h.titleHighlight)}</span> ${h.titlePost}
        </h1>
        <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="200">${esc(h.subtitle)}</p>
        <div class="hero-cta" data-aos="fade-up" data-aos-delay="400">
            <a href="${esc(h.ctaPrimaryHref)}" class="btn btn-primary">
                <span>${esc(h.ctaPrimaryText)}</span>
                <i class="fas fa-arrow-right"></i>
            </a>
            <a href="${esc(h.ctaSecondaryHref)}" class="btn btn-outline">
                <i class="fas fa-play-circle"></i>
                <span>${esc(h.ctaSecondaryText)}</span>
            </a>
        </div>
        <div class="hero-stats" data-aos="fade-up" data-aos-delay="600">
            ${h.stats.map(s => `
                <div class="hero-stat">
                    <span class="hero-stat-number" data-target="${s.value}">0</span>${esc(s.suffix)}
                    <span class="hero-stat-label">${esc(s.label)}</span>
                </div>`).join('')}
        </div>`;
}

function renderAbout() {
    const a = content.about;
    const aboutImg = a.image
        ? `<img src="${esc(a.image)}" alt="Foto Perusahaan" class="about-photo">`
        : `<div class="about-img-placeholder">
            <i class="fas fa-building"></i>
            <span>Foto Perusahaan</span>
        </div>`;
    document.getElementById('aboutGrid').innerHTML = `
        <div class="about-image" data-aos="fade-right">
            <div class="about-img-wrapper">
                ${aboutImg}
            </div>
            <div class="about-experience-badge">
                <span class="exp-number">${esc(a.badgeYear)}</span>
                <span class="exp-text">${a.badgeText}</span>
            </div>
        </div>
        <div class="about-content" data-aos="fade-left">
            <span class="section-tag">${esc(a.tag)}</span>
            <h2 class="section-title">${esc(a.title)}</h2>
            <p class="about-desc">${esc(a.desc1)}</p>
            <p class="about-desc">${esc(a.desc2)}</p>
            <div class="about-features">
                ${a.features.map(f => `
                    <div class="about-feature">
                        <i class="fas fa-check-circle"></i>
                        <span>${esc(f)}</span>
                    </div>`).join('')}
            </div>
            <a href="${esc(a.ctaHref)}" class="btn btn-primary">
                <span>${esc(a.ctaText)}</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>`;
}

function renderServices() {
    const s = content.services;
    document.getElementById('servicesInner').innerHTML = `
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">${esc(s.tag)}</span>
            <h2 class="section-title">${esc(s.title)}</h2>
            <p class="section-desc">${esc(s.desc)}</p>
        </div>
        <div class="services-grid">
            ${s.items.map((it, i) => `
                <div class="service-card" data-aos="fade-up" data-aos-delay="${100 * (i + 1)}">
                    ${it.image
                        ? `<div class="service-img"><img src="${esc(it.image)}" alt="${esc(it.title)}" loading="lazy"></div>`
                        : `<div class="service-icon"><i class="${esc(it.icon)}"></i></div>`}
                    <h3>${esc(it.title)}</h3>
                    <p>${esc(it.desc)}</p>
                    <a href="#contact" class="service-link">Pelajari <i class="fas fa-arrow-right"></i></a>
                </div>`).join('')}
        </div>`;
}

function renderWhyUs() {
    const w = content.whyUs;
    document.getElementById('whyUsGrid').innerHTML = `
        <div class="why-us-content" data-aos="fade-right">
            <span class="section-tag">${esc(w.tag)}</span>
            <h2 class="section-title">${esc(w.title)}</h2>
            <div class="why-us-items">
                ${w.items.map((it, i) => `
                    <div class="why-item">
                        <div class="why-item-number">${String(i + 1).padStart(2, '0')}</div>
                        <div class="why-item-content">
                            <h4>${esc(it.title)}</h4>
                            <p>${esc(it.desc)}</p>
                        </div>
                    </div>`).join('')}
            </div>
        </div>
        <div class="why-us-image" data-aos="fade-left">
            <div class="why-us-img-placeholder">
                <i class="fas fa-hard-hat"></i>
                <span>Foto Tim Kerja</span>
            </div>
        </div>`;
}

function renderProjects() {
    const p = content.projects;
    document.getElementById('projectsInner').innerHTML = `
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">${esc(p.tag)}</span>
            <h2 class="section-title">${esc(p.title)}</h2>
            <p class="section-desc">${esc(p.desc)}</p>
        </div>
        <div class="projects-filter" data-aos="fade-up">
            ${p.filters.map((f, i) => `
                <button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${esc(f.key)}">${esc(f.label)}</button>`).join('')}
        </div>
        <div class="projects-grid">
            ${p.items.map((it, i) => `
                <div class="project-card" data-category="${esc(it.category)}" data-project-index="${i}" data-aos="fade-up" data-aos-delay="${100 * (i + 1)}">
                    <div class="project-img">
                        ${it.image
                            ? `<img src="${esc(it.image)}" alt="${esc(it.title)}" class="project-photo" loading="lazy">`
                            : `<div class="project-img-placeholder"><i class="${esc(it.icon)}"></i></div>`}
                        <div class="project-overlay">
                            <span class="project-category">${esc(it.catLabel)}</span>
                            <h3 class="project-title">${esc(it.title)}</h3>
                            <p class="project-location"><i class="fas fa-map-marker-alt"></i> ${esc(it.location)}</p>
                            <span class="project-view"><i class="far fa-images"></i> Lihat Galeri</span>
                        </div>
                    </div>
                </div>`).join('')}
        </div>`;
}

function renderStats() {
    const st = content.stats;
    document.getElementById('statsGrid').innerHTML = st.items.map((it, i) => `
        <div class="stat-card" data-aos="fade-up" data-aos-delay="${100 * (i + 1)}">
            <div class="stat-icon"><i class="${esc(it.icon)}"></i></div>
            <div class="stat-number"><span class="counter" data-target="${it.value}">0</span>${esc(it.suffix)}</div>
            <div class="stat-label">${esc(it.label)}</div>
        </div>`).join('');
}

function renderTestimonials() {
    const t = content.testimonials;
    document.getElementById('testimonialsInner').innerHTML = `
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">${esc(t.tag)}</span>
            <h2 class="section-title">${esc(t.title)}</h2>
            <p class="section-desc">${esc(t.desc)}</p>
        </div>
        <div class="testimonials-grid">
            ${t.items.map((it, i) => `
                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${100 * (i + 1)}">
                    <div class="testimonial-stars">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-text">${esc(it.text)}</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">${it.image
                            ? `<img src="${esc(it.image)}" alt="${esc(it.name)}" loading="lazy">`
                            : '<i class="fas fa-user"></i>'}</div>
                        <div class="testimonial-info">
                            <h4>${esc(it.name)}</h4>
                            <span>${esc(it.role)}</span>
                        </div>
                    </div>
                </div>`).join('')}
        </div>`;
}

function renderCTA() {
    const c = content.cta;
    document.getElementById('ctaInner').innerHTML = `
        <div class="cta-content" data-aos="fade-up">
            <h2>${esc(c.title)}</h2>
            <p>${esc(c.desc)}</p>
            <div class="cta-buttons">
                <a href="${esc(c.primaryHref)}" class="btn btn-primary btn-lg">
                    <i class="fas fa-phone-alt"></i>
                    <span>${esc(c.primaryText)}</span>
                </a>
                <a href="${esc(c.waHref)}" class="btn btn-whatsapp btn-lg" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    <span>${esc(c.waText)}</span>
                </a>
            </div>
        </div>`;
}

function renderContact() {
    const c = content.contact;
    document.getElementById('contactHeader').innerHTML = `
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">${esc(c.tag)}</span>
            <h2 class="section-title">${esc(c.title)}</h2>
            <p class="section-desc">${esc(c.desc)}</p>
        </div>`;
    document.getElementById('contactInfo').innerHTML = `
        ${c.info.map(it => `
            <div class="contact-item">
                <div class="contact-icon"><i class="${esc(it.icon)}"></i></div>
                <div class="contact-detail">
                    <h4>${esc(it.title)}</h4>
                    <p>${it.text}</p>
                </div>
            </div>`).join('')}
        <div class="contact-social">
            ${c.socials.map(s => `
                <a href="${esc(s.href)}" class="social-link" target="_blank"><i class="${esc(s.icon)}"></i></a>`).join('')}
        </div>`;
    document.getElementById('waFloat').setAttribute('href', 'https://wa.me/' + c.waNumber);
}

function renderFooter() {
    const f = content.footer;
    document.getElementById('footerInner').innerHTML = `
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="#" class="logo">
                    <span class="logo-icon">A</span>
                    <span class="logo-text">AURIS<span class="logo-accent">GROUP</span></span>
                </a>
                <p>${esc(f.brandText)}</p>
                <div class="footer-social">
                    ${content.contact.socials.map(s => `
                        <a href="${esc(s.href)}" target="_blank"><i class="${esc(s.icon)}"></i></a>`).join('')}
                </div>
            </div>
            <div class="footer-links">
                <h4>Layanan</h4>
                <ul>
                    ${f.layananLinks.map(l => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-links">
                <h4>Perusahaan</h4>
                <ul>
                    ${f.companyLinks.map(l => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-contact">
                <h4>Kontak</h4>
                ${f.contactLines.map(l => `<p><i class="${esc(l.icon)}"></i> ${esc(l.text)}</p>`).join('')}
            </div>
        </div>
        <div class="footer-bottom">
            <p>${esc(f.copyright)}</p>
            <p>${esc(f.tagline)}</p>
        </div>`;
}

function renderAll() {
    renderNavbar();
    renderHero();
    renderAbout();
    renderServices();
    renderWhyUs();
    renderProjects();
    renderStats();
    renderTestimonials();
    renderCTA();
    renderContact();
    renderFooter();
}

// ===== PRELOADER & AOS =====
let aosInitialized = false;
let preloaderHidden = false;

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        preloaderHidden = true;
        setTimeout(ensureAOS, 300);
    }, 1500);
});

function initAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

function ensureAOS() {
    if (aosInitialized) return;
    aosInitialized = true;
    initAOS();
}

// ===== INTERACTIONS =====
function bindInteractions() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter, .hero-stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target')) || 0;
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== PROJECT FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ===== PROJECT GALLERY =====
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalBody = document.getElementById('galleryModalBody');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let lightboxImages = [];
    let lightboxIndex = 0;

    function galleryImagesOf(project) {
        const list = (project.gallery && project.gallery.length)
            ? project.gallery
            : [project.image].filter(Boolean);
        return list;
    }

    function openGallery(index) {
        const project = content.projects.items[index];
        if (!project) return;

        const images = galleryImagesOf(project);

        const gridHtml = images.length
            ? `<div class="gallery-grid">
                ${images.map((src, i) => `
                    <div class="gallery-item" data-lightbox="${i}">
                        <img src="${esc(src)}" alt="${esc(project.title)} - Foto ${i + 1}" loading="lazy">
                        <div class="gallery-item-zoom"><i class="fas fa-search-plus"></i></div>
                    </div>`).join('')}
            </div>`
            : `<div class="gallery-empty">
                <i class="${esc(project.icon)}"></i>
                <p>Foto galeri untuk proyek ini segera hadir.</p>
            </div>`;

        galleryModalBody.innerHTML = `
            <div class="gallery-header">
                <span class="project-category">${esc(project.catLabel)}</span>
                <h3 class="gallery-title">${esc(project.title)}</h3>
                <p class="gallery-location"><i class="fas fa-map-marker-alt"></i> ${esc(project.location)}</p>
            </div>
            ${gridHtml}`;

        lightboxImages = images;
        lightboxIndex = 0;
        galleryModal.classList.add('open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryModal.classList.remove('open');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        if (!lightboxImages.length) return;
        lightboxImg.src = lightboxImages[lightboxIndex];
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    }

    function openLightbox(index) {
        if (!lightboxImages.length) return;
        lightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = galleryModal.classList.contains('open') ? 'hidden' : '';
    }

    function lightboxNav(dir) {
        if (!lightboxImages.length) return;
        lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-project-index'), 10);
            openGallery(index);
        });
    });

    galleryModalBody.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            openLightbox(parseInt(item.getAttribute('data-lightbox'), 10));
        }
    });

    galleryModal.querySelectorAll('[data-close-gallery]').forEach(el => {
        el.addEventListener('click', closeGallery);
    });

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('open')) {
                closeLightbox();
            } else if (galleryModal.classList.contains('open')) {
                closeGallery();
            }
        } else if (lightbox.classList.contains('open')) {
            if (e.key === 'ArrowLeft') lightboxNav(-1);
            if (e.key === 'ArrowRight') lightboxNav(1);
        }
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        const waMessage = encodeURIComponent(
            `Halo AURIS Group! Saya ingin konsultasi:\n\n` +
            `Nama: ${name}\n` +
            `Telepon: ${phone}\n` +
            `Email: ${email}\n` +
            `Layanan: ${service}\n` +
            `Pesan: ${message}`
        );

        window.open(`https://wa.me/${content.contact.waNumber}?text=${waMessage}`, '_blank');

        showFormSuccess();
        contactForm.reset();
    });

    function showFormSuccess() {
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> <span>Pesan Terkirim!</span>';
        btn.style.background = '#25D366';
        btn.style.color = '#fff';

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (!href || href.length <= 1) return;
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT ON HERO =====
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-content');
        if (hero) {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.7;
            }
        }
    });

    // ===== HOVER EFFECTS =====
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== LIVE UPDATE DARI ADMIN (TAB LAIN) =====
window.addEventListener('storage', (e) => {
    if (e.key === AURISStore.KEY || e.key === null) {
        window.location.reload();
    }
});

// ===== INIT =====
async function init() {
    await loadContent();
    renderAll();
    bindInteractions();
    if (preloaderHidden) ensureAOS();
}

init();
