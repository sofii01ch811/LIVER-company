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
