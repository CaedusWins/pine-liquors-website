const ageGate = document.getElementById('age-gate');
const site = document.getElementById('site');
const blockedMsg = document.getElementById('age-blocked');

document.getElementById('age-yes').addEventListener('click', () => {
  ageGate.hidden = true;
  site.hidden = false;
  initSite();
});

document.getElementById('age-no').addEventListener('click', () => {
  document.querySelector('.age-gate__actions').hidden = true;
  blockedMsg.hidden = false;
});

function initSite() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  initHeaderScroll();
  initScrollReveal();
  initCountUp();
  if (!reduceMotion && canHover) {
    initHeroSpotlight();
    initCardTilt();
    initMagneticButtons();
  }
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollReveal() {
  const revealTargets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => observer.observe(el));
}

function initCountUp() {
  const targets = document.querySelectorAll('[data-count-to]');
  if (!targets.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(1);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => { el.textContent = el.dataset.countTo; });
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  targets.forEach((el) => observer.observe(el));
}

function initHeroSpotlight() {
  const hero = document.querySelector('.hero');
  const spotlight = document.querySelector('.hero__spotlight');
  if (!hero || !spotlight) return;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--sx', `${x}%`);
    spotlight.style.setProperty('--sy', `${y}%`);
  });
}

function initCardTilt() {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--ry', `${px * 8}deg`);
      card.style.setProperty('--rx', `${py * -8}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

function initMagneticButtons() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3 - 2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
