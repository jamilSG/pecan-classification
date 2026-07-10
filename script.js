document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Magnetic cursor — hints that project cards are clickable and lead to a detail page
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  cursorFollower.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>Ver proyecto';
  document.body.appendChild(cursorFollower);

  let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
  let cursorActive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animateCursor() {
    curX += (mouseX - curX) * 0.22;
    curY += (mouseY - curY) * 0.22;
    cursorFollower.style.left = curX + 'px';
    cursorFollower.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => cursorFollower.classList.add('is-active'));
    card.addEventListener('mouseleave', () => cursorFollower.classList.remove('is-active'));
  });

  // Project filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const matches = filter === 'all' || tags.split(' ').includes(filter);
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  // Vertical process line fill tied to scroll progress
  const processFill = document.getElementById('processFill');
  const updateProcessLine = () => {
    if (!processFill) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    processFill.style.height = (progress * 100) + '%';
  };
  window.addEventListener('scroll', updateProcessLine, { passive: true });
  updateProcessLine();

  // Reveal sections on scroll
  const revealTargets = document.querySelectorAll('.stat-card, .timeline__item, .project-card, .skill-block');
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

});
