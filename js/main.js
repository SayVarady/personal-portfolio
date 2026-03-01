/* ===================================================
   ANIME PORTFOLIO — MAIN JAVASCRIPT
   =================================================== */

/* ── Custom Cursor ── */
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    let tx = 0, ty = 0;

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        }, 80);
        tx = e.clientX; ty = e.clientY;
    });

    document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(2)';
            trail.style.transform = 'translate(-50%,-50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(1)';
            trail.style.transform = 'translate(-50%,-50%) scale(1)';
        });
    });
})();

/* ── Sakura / Star Canvas ── */
(function initSakura() {
    const canvas = document.getElementById('sakura-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PETAL_COLORS = ['#ffb7c5', '#ff9ab0', '#ffd6e0', '#ff4da6', '#ffeef3'];
    const STAR_COLORS = ['rgba(255,255,255,0.6)', 'rgba(255,209,102,0.5)', 'rgba(77,217,255,0.4)'];

    function createParticle(type) {
        return {
            type,
            x: Math.random() * W,
            y: type === 'petal' ? -20 : Math.random() * H,
            size: type === 'petal' ? 4 + Math.random() * 6 : 1 + Math.random() * 2,
            speed: type === 'petal' ? 0.6 + Math.random() * 1 : 0.05 + Math.random() * 0.15,
            drift: (Math.random() - 0.5) * 0.6,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.04,
            color: type === 'petal'
                ? PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]
                : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            alpha: type === 'star' ? 0.3 + Math.random() * 0.6 : 0.7 + Math.random() * 0.3,
            twinkle: Math.random() * 0.02,
        };
    }

    // Initialise pool
    for (let i = 0; i < 40; i++)  particles.push(createParticle('petal'));
    for (let i = 0; i < 80; i++)  particles.push(createParticle('star'));

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawStar(p) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            if (p.type === 'petal') {
                p.y += p.speed;
                p.x += p.drift + Math.sin(p.angle) * 0.5;
                p.angle += p.spin;
                if (p.y > H + 30) { Object.assign(p, createParticle('petal')); p.y = -20; }
                drawPetal(p);
            } else {
                p.y -= p.speed;
                p.alpha = 0.3 + Math.abs(Math.sin(Date.now() * p.twinkle)) * 0.6;
                if (p.y < -5) { Object.assign(p, createParticle('star')); p.y = H + 5; }
                drawStar(p);
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

/* ── Navbar: scroll shrink + hamburger ── */
(function initNavbar() {
    const nav = document.getElementById('navbar');
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        const spans = toggle.querySelectorAll('span');
        const open = links.classList.contains('open');
        spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
        spans[1].style.opacity = open ? '0' : '1';
        spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
    });

    // Close on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => links.classList.remove('open'));
    });
})();

/* ── Active nav highlight via IntersectionObserver ── */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();

/* ── Typed Text Effect ── */
(function initTyped() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const roles = [
        'Full-Stack Developer',
        'UI/UX Enthusiast',
        'Anime Art Lover',
        'Problem Solver',
        'Open Source Fan',
    ];
    let ri = 0, ci = 0, deleting = false;

    function type() {
        const current = roles[ri];
        if (!deleting) {
            el.textContent = current.slice(0, ++ci);
            if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
            el.textContent = current.slice(0, --ci);
            if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        }
        setTimeout(type, deleting ? 55 : 100);
    }
    type();
})();

/* ── Scroll Reveal ── */
(function initReveal() {
    const els = document.querySelectorAll(
        '.about__card, .fact-item, .skills__icons, .skills__bars, .project-card, .contact__info, .contact__form'
    );
    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }, 80);
            }
        });
    }, { threshold: 0.15 });

    els.forEach(el => observer.observe(el));
})();

/* ── Skill Bars Animation ── */
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-bar__fill');
                const pct = entry.target.dataset.percent;
                setTimeout(() => { fill.style.width = pct + '%'; }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(b => observer.observe(b));
})();

/* ── Contact Form ── */
(function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl = document.getElementById('message');
    const success = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    function showError(id, msg) {
        const el = document.getElementById(id + '-error');
        if (el) el.textContent = msg;
    }
    function clearErrors() {
        ['name', 'email', 'message'].forEach(f => showError(f, ''));
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        clearErrors();
        let valid = true;

        if (!nameEl.value.trim()) { showError('name', 'Please enter your name.'); valid = false; }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailEl.value.trim())) { showError('email', 'Please enter a valid email.'); valid = false; }
        if (!msgEl.value.trim()) { showError('message', 'Please enter a message.'); valid = false; }

        if (!valid) return;

        // Build mailto link
        const sub = document.getElementById('subject').value || 'Portfolio Contact';
        const mailto = `mailto:your@email.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(
            `Name: ${nameEl.value}\nEmail: ${emailEl.value}\n\n${msgEl.value}`
        )}`;
        window.location.href = mailto;

        submitBtn.disabled = true;
        success.classList.remove('hidden');
        form.reset();
        setTimeout(() => { success.classList.add('hidden'); submitBtn.disabled = false; }, 5000);
    });
})();

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── Cursor sparkle on click ── */
document.addEventListener('click', e => {
    for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      width:6px; height:6px; border-radius:50%;
      background:var(--pink); pointer-events:none; z-index:9997;
      transform:translate(-50%,-50%);
      animation: sparkle-out 0.5s ease-out forwards;
    `;
        document.body.appendChild(spark);
        const angle = (i / 6) * Math.PI * 2;
        const dist = 24 + Math.random() * 20;
        spark.animate([
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 }
        ], { duration: 500, easing: 'ease-out', fill: 'forwards' }).onfinish = () => spark.remove();
    }
});
