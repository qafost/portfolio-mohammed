(() => {
  'use strict';

  const CONTACT_EMAIL = 'your@email.com'; // Replace with your real email address.
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('#menu');
  const navigation = document.querySelector('#primary-nav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const backToTop = document.querySelector('#back-to-top');
  const themeButton = document.querySelector('#theme-toggle');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href="mailto:your@email.com"]').forEach((link) => {
    link.href = `mailto:${CONTACT_EMAIL}`;
    if (link.classList.contains('contact-email')) link.firstChild.textContent = CONTACT_EMAIL;
  });

  // Keep the portfolio in the visitor's chosen day/night mode between visits.
  const setTheme = (theme, save = true) => {
    const nextTheme = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    if (themeButton) {
      const lightModeIsActive = nextTheme === 'light';
      themeButton.setAttribute('aria-label', lightModeIsActive ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري');
      themeButton.title = lightModeIsActive ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري';
      const icon = themeButton.querySelector('.theme-toggle-icon');
      if (icon) icon.textContent = lightModeIsActive ? '☾' : '☀';
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = nextTheme === 'light' ? '#f5f7f2' : '#0b0d0d';
    if (save) {
      try { localStorage.setItem('portfolio-theme', nextTheme); } catch (_) { /* Storage may be unavailable. */ }
    }
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('portfolio-theme'); } catch (_) { /* Use the default theme. */ }
  setTheme(savedTheme === 'light' ? 'light' : 'dark', false);
  themeButton?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'فتح القائمة');
    navigation.classList.remove('is-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
    navigation?.classList.toggle('is-open', !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (navigation?.classList.contains('is-open') && !event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });

  const updateScrollUI = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle('is-scrolled', scrolled);
    backToTop?.classList.toggle('visible', window.scrollY > 520);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-32% 0px -58% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-block .section-heading, .about-content, .about-stats, .skill-card, .project-card, .project-coming, .contact-panel').forEach((element, index) => {
      element.classList.add('reveal');
      if (element.matches('.skill-card')) element.style.transitionDelay = `${(index % 6) * 45}ms`;
      revealObserver.observe(element);
    });
  }

  // Project filters gracefully work even if the portfolio currently has one item.
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  const projectCount = document.querySelector('#project-count');

  const applyProjectFilter = (filter) => {
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const technologies = (card.dataset.technologies || '').toLowerCase().split(/\s+/);
      const visible = filter === 'all' || technologies.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    const allCount = document.querySelector('[data-filter="all"] span');
    if (allCount) allCount.textContent = String(projectCards.length).padStart(2, '0');
    if (projectCount) projectCount.textContent = String(visibleCount).padStart(2, '0');
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => applyProjectFilter(button.dataset.filter || 'all'));
  });
  applyProjectFilter('all');

  const contactForm = document.querySelector('#contact-form');
  const formHint = document.querySelector('#form-hint');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`رسالة جديدة من ${name}`);
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nالرسالة:\n${message}`);

    if (!CONTACT_EMAIL || CONTACT_EMAIL === 'your@email.com') {
      if (formHint) formHint.textContent = 'أضف بريدك الحقيقي في ملف app.js لتفعيل إرسال الرسائل.';
      return;
    }

    if (formHint) formHint.textContent = 'يتم الآن فتح تطبيق البريد لإرسال رسالتك.';
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
})();
