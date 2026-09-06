/* ===================================================
   SAY VARADY — SITE JS
   Mobile nav toggle, active-section highlight,
   and an honest experience counter. That's it.
   =================================================== */

/* ── Mobile nav toggle ── */
(function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Active nav link on scroll ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ── Experience counter (started August 2023) ── */
(function initExperience() {
  const el = document.getElementById('experience');
  if (!el) return;

  const start = new Date(2023, 7); // August 2023
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }

  const parts = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`);
  if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`);
  el.textContent = parts.length ? parts.join(' ') : 'a few months';
})();
