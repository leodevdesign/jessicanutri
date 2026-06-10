import Swup from 'https://unpkg.com/swup@4?module';
import SwupHeadPlugin from 'https://unpkg.com/@swup/head-plugin@2?module';
import SwupA11yPlugin from 'https://unpkg.com/@swup/a11y-plugin@5?module';
import SwupPreloadPlugin from 'https://unpkg.com/@swup/preload-plugin@3?module';

const specialtyLinkSelector = [
  'a.servico-link[href]',
  'a.btn-outra[href]',
  'a.footer-link[href*="emagrecimento-saudavel.html"]',
  'a.footer-link[href*="reeducacao-alimentar.html"]',
  'a.footer-link[href*="saude-metabolica.html"]',
  'a.footer-link[href*="nutricao-esportiva.html"]'
].join(', ');

const swup = new Swup({
  containers: ['#swup'],
  animationSelector: '[class*="swup-transition-"]',
  linkSelector: specialtyLinkSelector,
  plugins: [
    new SwupHeadPlugin({ awaitAssets: true }),
    new SwupA11yPlugin(),
    new SwupPreloadPlugin()
  ]
});

window.__jessicaSwup = swup;

document.addEventListener('click', (event) => {
  const link = event.target.closest(specialtyLinkSelector);
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  const targetUrl = new URL(link.href, window.location.href);
  if (targetUrl.origin !== window.location.origin || link.target === '_blank') {
    return;
  }

  const currentPath = window.location.pathname.replace(/\/$/, '/index.html');
  const targetPath = targetUrl.pathname.replace(/\/$/, '/index.html');
  if (currentPath === targetPath && window.location.hash === targetUrl.hash) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  swup.navigate(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
}, true);

if (window.gsap) {
  swup.hooks.replace('animation:out:await', () => {
    return new Promise((resolve) => {
      window.gsap.to('#swup', {
        autoAlpha: 0,
        y: 32,
        scale: 0.985,
        filter: 'blur(5px)',
        duration: 0.46,
        ease: 'power2.inOut',
        onComplete: resolve
      });
    });
  });

  swup.hooks.replace('animation:in:await', () => {
    return new Promise((resolve) => {
      window.gsap.fromTo(
        '#swup',
        {
          autoAlpha: 0,
          y: -18,
          scale: 0.99,
          filter: 'blur(5px)'
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.58,
          ease: 'power3.out',
          onComplete: resolve
        }
      );
    });
  });
}

const refreshPageMotion = () => {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh(true);
  }

  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
};

swup.hooks.on('page:view', refreshPageMotion);
