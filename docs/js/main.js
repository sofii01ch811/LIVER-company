(function () {
  // sticky header shrink on scroll
  const header = document.querySelector('header.site');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // hamburger nav drawer
  const navToggle = document.getElementById('navToggle');
  const navDrawer = document.getElementById('navDrawer');
  if (navToggle && navDrawer) {
    const openDrawer = () => {
      navDrawer.classList.add('is-open');
      navDrawer.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'メニューを閉じる');
      document.body.classList.add('nav-locked');
    };
    const closeDrawer = () => {
      navDrawer.classList.remove('is-open');
      navDrawer.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      document.body.classList.remove('nav-locked');
    };
    navToggle.addEventListener('click', () => {
      if (navDrawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });
    navDrawer.querySelectorAll('[data-nav-close]').forEach(el => {
      el.addEventListener('click', closeDrawer);
    });
    navDrawer.querySelectorAll('.nav-drawer-nav a, .nav-drawer-cta').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) closeDrawer();
    });
  }

  // voices carousel (LP only — elements absent on company.html)
  const track = document.getElementById('voicesTrack');
  const dotsWrap = document.getElementById('voicesDots');
  if (track && dotsWrap) {
    const total = track.children.length;
    let idx = 0;
    const dots = dotsWrap.querySelectorAll('i');
    const go = (n) => {
      idx = (n + total) % total;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    };
    const prev = document.getElementById('voicesPrev');
    const next = document.getElementById('voicesNext');
    if (prev) prev.addEventListener('click', () => go(idx - 1));
    if (next) next.addEventListener('click', () => go(idx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  }

  // smooth anchor scroll with ease-in-out cubic (slow + soft accel/decel)
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function easeInOutCubic(t){return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2;}
  function smoothScrollTo(targetY, duration){
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;
    const startTime = performance.now();
    function step(now){
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('a[href^="#"], button[data-href^="#"]').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href') || el.getAttribute('data-href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (prefersReduced) { target.scrollIntoView(); return; }
      const headerH = (document.querySelector('header.site')?.offsetHeight) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - (headerH + 16);
      smoothScrollTo(top, 1200);
    });
  });

  // fade-in via IntersectionObserver, with fallback
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.fade-in').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
  }
})();
