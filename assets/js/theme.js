/* ═══════════════════════════════════════════════
   ROHAN TEKALE — Portfolio JS
═══════════════════════════════════════════════ */

function initProgress() {
  const bar = document.getElementById('progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
}

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 40);
  });
  const path = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initMobile() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-nav');
  if (!ham || !menu) return;
  ham.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  function markIn(el) {
    el.classList.add('in');
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => markIn(e.target), i * 60);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px 8% 0px' }
  );
  els.forEach((el) => io.observe(el));
  function revealIfAlreadyVisible() {
    els.forEach((el) => {
      if (el.classList.contains('in')) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.92 && r.bottom > vh * 0.05) markIn(el);
    });
  }
  requestAnimationFrame(() => {
    revealIfAlreadyVisible();
    requestAnimationFrame(revealIfAlreadyVisible);
  });
  setTimeout(revealIfAlreadyVisible, 120);
}

function initTilt() {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;
  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('loaded'), 150);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => barObs.observe(b));
}

document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  initNav();
  initMobile();
  initReveal();
  initTilt();
  initSkillBars();
});
