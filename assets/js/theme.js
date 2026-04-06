/* ═══════════════════════════════════════════════
   ROHAN TEKALE — SHARED JS ENGINE
═══════════════════════════════════════════════ */

/* ── THEME ENGINE ── */
const THEME_KEY = 'rt-theme';

function applyTheme(mode) {
  document.body.classList.remove('dev','ai');
  document.body.classList.add(mode);
  localStorage.setItem(THEME_KEY, mode);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.mode === mode);
  });
  // Update cursor blend
  const cursor = document.getElementById('cursor');
  if (cursor) cursor.style.mixBlendMode = mode === 'ai' ? 'screen' : 'screen';
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dev';
  applyTheme(saved);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.mode));
  });
}

/* ── CURSOR ── */
function initCursor() {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-trail');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  const lerp = (a, b, t) => a + (b - a) * t;
  function tick() {
    rx = lerp(rx, mx, 0.13); ry = lerp(ry, my, 0.13);
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();
  document.querySelectorAll('a, button, .card, .tag, .ai-tool').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '20px'; dot.style.height = '20px';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '10px'; dot.style.height = '10px';
    });
  });
}

/* ── SCROLL PROGRESS ── */
function initProgress() {
  const bar = document.getElementById('progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
}

/* ── NAV STUCK ── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 40);
  });
  // active link
  const links = nav.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === location.href) link.classList.add('active');
  });
}

/* ── MOBILE MENU ── */
function initMobile() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-nav');
  if (!ham || !menu) return;
  ham.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  function markIn(el) {
    el.classList.add('in');
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => markIn(e.target), i * 70);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 8% 0px' });
  els.forEach(el => io.observe(el));
  function revealIfAlreadyVisible() {
    els.forEach(el => {
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

/* ── TYPING EFFECT ── */
function initTyping(id, words) {
  const el = document.getElementById(id);
  if (!el) return;
  let wi = 0, ci = 0, del = false;
  function tick() {
    const word = words[wi];
    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, del ? 55 : 85);
  }
  setTimeout(tick, 800);
}

/* ── CARD TILT ── */
function initTilt() {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 10;
      const y = ((e.clientY - r.top) / r.height - .5) * -10;
      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transformStyle = 'preserve-3d';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── COMMAND PALETTE ── */
function initCmd(cmds) {
  const overlay = document.getElementById('cmd-overlay');
  const input   = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  if (!overlay) return;
  let sel = 0;

  function render(q = '') {
    const f = cmds.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));
    results.innerHTML = f.map((c, i) =>
      `<li class="cmd-item${i===0?' sel':''}" data-i="${i}">
        <i class="${c.icon}"></i>${c.label}
       </li>`
    ).join('');
    sel = 0;
    results.querySelectorAll('.cmd-item').forEach((el, i) => {
      el.addEventListener('click', () => { f[i].action(); close(); });
    });
  }

  function close() {
    overlay.classList.remove('open');
    input.value = ''; render();
  }

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); overlay.classList.toggle('open'); if (overlay.classList.contains('open')) { input.focus(); render(); } }
    if (e.key === 'Escape') close();
    if (!overlay.classList.contains('open')) return;
    const items = results.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') { sel = (sel + 1) % items.length; }
    if (e.key === 'ArrowUp')   { sel = (sel - 1 + items.length) % items.length; }
    items.forEach((it, i) => it.classList.toggle('sel', i === sel));
    if (e.key === 'Enter' && items[sel]) items[sel].click();
  });

  input.addEventListener('input', e => render(e.target.value));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  render();
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initProgress();
  initNav();
  initMobile();
  initReveal();
  initTilt();
});
