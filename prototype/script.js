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
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
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
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
}
