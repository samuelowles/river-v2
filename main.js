gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(() => {
  const wrap = document.getElementById('scroll-wrap');
  if (!wrap) return;

  ScrollTrigger.create({
    trigger: '#cta-product',
    start: 'bottom top',
    onEnter: () => wrap.style.backgroundColor = '#ebeced',
    onLeaveBack: () => wrap.style.backgroundColor = 'var(--col-white)'
  });

  ScrollTrigger.create({
    trigger: '#seventy',
    start: 'top 50%',
    onEnter: () => wrap.style.backgroundColor = '#e3e5ea',
    onLeaveBack: () => wrap.style.backgroundColor = '#ebeced'
  });

  ScrollTrigger.create({
    trigger: '.why__headline',
    start: 'bottom 80%',
    onEnter: () => wrap.style.backgroundColor = 'var(--col-white)',
    onLeaveBack: () => wrap.style.backgroundColor = '#e3e5ea'
  });
})();

// ── Scroll-triggered reveal animations (OpenAI pattern) ──
(() => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (prefersReducedMotion) {
    reveals.forEach((el) => el.classList.add('is-visible'));
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
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// ── Clone Why SVGs for layered look, then animate ──
(() => {
  const container = document.querySelector('.why__drawing');
  const svgEl = container?.querySelector('svg');
  if (!svgEl) return;

  // Clone SVG twice before any animation setup
  for (let i = 0; i < 2; i++) {
    const clone = svgEl.cloneNode(true);
    container.appendChild(clone);
  }

  // Remove all <style> elements and set inline stroke on every path
  container.querySelectorAll('svg').forEach(svg => {
    const styleEl = svg.querySelector('style');
    if (styleEl) styleEl.remove();
    svg.querySelectorAll('path').forEach(p => {
      p.style.fill = 'none';
      p.style.stroke = '#000000';
      p.style.strokeMiterlimit = '10';
    });
  });

  const allPaths = container.querySelectorAll('path');

  if (prefersReducedMotion) {
    allPaths.forEach(path => { path.style.strokeDasharray = 'none'; path.style.strokeDashoffset = '0'; });
    return;
  }

  allPaths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length + 2;
    path.style.strokeDashoffset = length + 2;
  });

  gsap.to(allPaths, {
    strokeDashoffset: 0,
    duration: 4,
    ease: 'power2.inOut',
    stagger: 0.3,
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true
    }
  });
})();

// ── Gaco Dashboard SVG Instance Animation (OpenAI Stagger + DrawSVG) ──
(() => {
  const gacos = document.querySelectorAll('.gaco-instance');
  if (!gacos.length) return;

  if (prefersReducedMotion) {
    gacos.forEach(gaco => {
      gsap.set(gaco, { y: 0, scale: 1, opacity: 1 });
      gaco.querySelectorAll('.gaco-path').forEach(p => {
        gsap.set(p, { fill: '#000000', stroke: 'transparent', strokeDashoffset: 0 });
      });
    });
    return;
  }

  gacos.forEach(gaco => {
    const paths = gaco.querySelectorAll('.gaco-path');
    paths.forEach(path => {
      const length = path.getTotalLength() || 150;
      path.style.strokeDasharray = length + 2;
      path.style.strokeDashoffset = length + 2;
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.product__dashboard-container',
      start: 'top 85%',
      once: true 
    }
  });

  tl.to(gacos, {
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1
  }, 0);

  tl.to(gsap.utils.toArray('.gaco-instance .gaco-path'), {
    strokeDashoffset: 0,
    duration: 3.5,
    ease: 'power2.out', 
    stagger: { amount: 3.0 } 
  }, 0.2);

  tl.to('.gaco-instance .gaco-path', {
    fill: '#000000',
    stroke: 'transparent',
    duration: 1.2,
    ease: 'power1.inOut',
  }, "-=0.2");
})();

// ── Fixed Header Entrance Animation ─────────────────────
(() => {
  const header = document.getElementById('site-header');
  if (!header) return;

  if (prefersReducedMotion) {
    gsap.set(header, { y: 0, opacity: 1 });
    return;
  }

  gsap.fromTo(header, 
    { y: -100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    }
  );
})();

// ── Interactive Waitlist Forms ──────────────────────────
(() => {
  const forms = document.querySelectorAll('.waitlist-form');
  
  forms.forEach(form => {
    form.addEventListener('click', (e) => {
      if (form.classList.contains('is-idle')) {
        e.preventDefault();
        
        form.classList.remove('is-idle');
        form.classList.add('is-active');
        
        const input = form.querySelector('.waitlist-form__input');
        if (input) {
          setTimeout(() => input.focus(), 400);
        }
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.waitlist-form__input');
      const email = input.value;
      if (!email) return;

      form.classList.remove('is-active');
      form.classList.add('is-idle');
      input.value = '';
    });
  });

  document.addEventListener('click', (e) => {
    forms.forEach(form => {
      if (form.classList.contains('is-active') && !form.contains(e.target)) {
        form.classList.remove('is-active');
        form.classList.add('is-idle');
      }
    });
  });
})();

