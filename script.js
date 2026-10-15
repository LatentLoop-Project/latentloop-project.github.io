(function () {
  'use strict';
  var config = window.LATENTLOOP_CONFIG || {};
  if (config.paperUrl) {
    document.querySelectorAll('[data-paper-link]').forEach(function (link) {
      link.href = config.paperUrl;
    });
  }
  if (config.codeUrl && /^https?:\/\//i.test(config.codeUrl)) {
    document.querySelectorAll('.code-link').forEach(function (link) {
      link.href = config.codeUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
      link.querySelector('[data-code-label]').textContent = 'Code';
    });
  }
  if (config.modelUrl && /^https?:\/\//i.test(config.modelUrl)) {
    document.querySelectorAll('[data-model-link]').forEach(function (link) {
      link.href = config.modelUrl;
    });
  }

  var menuButton = document.querySelector('.menu-toggle');
  var menu = document.getElementById('nav-links');
  function closeMenu() {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', function () {
    var open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  var frameRequested = false;
  function updateProgress() {
    var length = document.documentElement.scrollHeight - window.innerHeight;
    var progress = length > 0 ? Math.min(100, Math.max(0, window.scrollY / length * 100)) : 0;
    document.documentElement.style.setProperty('--progress', progress.toFixed(2) + '%');
    if (window.scrollY < document.getElementById('abstract').offsetTop - 180) {
      menu.querySelectorAll('a[aria-current]').forEach(function (link) { link.removeAttribute('aria-current'); });
    }
    frameRequested = false;
  }
  window.addEventListener('scroll', function () {
    if (!frameRequested) { window.requestAnimationFrame(updateProgress); frameRequested = true; }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (element) { revealObserver.observe(element); });

    var navigationObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    ['abstract', 'observation', 'architecture', 'scaling'].forEach(function (id) {
      navigationObserver.observe(document.getElementById(id));
    });
  }

  var figures = {
    'learned-residuals': { title: 'Learned residual coefficients', caption: 'The first visit learns a smaller residual scale at both 1.3B and 3B. Coefficients start at one and are optimized jointly with model weights.' },
    'fixed-residuals': { title: 'Fixed residual coefficients', caption: 'Validation NLL across fixed coefficient settings. The asymmetric setting (0.25, 1) gives the lowest NLL among the tested settings at both model sizes.' },
    'architecture': { title: 'LatentLoop architecture', caption: 'Read from bottom to top: encode, compute on the latent sequence, write back the increment, and process the full sequence. MoE weights are shared across visits.' },
    'scaling-frontier': { title: 'Fitted compute-optimal frontiers', caption: 'Predicted equal-loss compute savings at NLL 1.988: 19.0% relative to MoE Base and 7.9% relative to MoE Loop. Dashed segments involve extrapolation.' }
  };
  var dialog = document.getElementById('figure-dialog');
  var dialogImage = document.getElementById('dialog-image');
  var dialogTitle = document.getElementById('dialog-title');
  var dialogCaption = document.getElementById('dialog-caption');
  var originalLink = document.getElementById('dialog-original');
  var lastTrigger = null;
  document.querySelectorAll('[data-figure]').forEach(function (button) {
    button.addEventListener('click', function () {
      var key = button.dataset.figure;
      if (!figures[key]) return;
      lastTrigger = button;
      dialogTitle.textContent = figures[key].title;
      dialogCaption.textContent = figures[key].caption;
      dialogImage.src = 'assets/figures/' + key + '.svg';
      dialogImage.alt = figures[key].caption;
      originalLink.href = 'assets/figures/' + key + '.pdf';
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        document.body.classList.add('dialog-open');
      } else {
        window.open(originalLink.href, '_blank', 'noopener');
      }
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
      var bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', function () {
    document.body.classList.remove('dialog-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });
}());
