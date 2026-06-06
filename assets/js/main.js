/* ============================================================
   MWANGA DIGITAL SOLUTIONS — Shared JavaScript
   ============================================================ */

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');

if(cursor && trail){
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    trail.style.left  = e.clientX + 'px';
    trail.style.top   = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,.service-card,.portfolio-card,.blog-card,.faq-q,.pricing-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px'; cursor.style.height = '20px';
      cursor.style.background = 'rgba(255,208,0,0.6)';
      trail.style.width = '50px'; trail.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px';
      cursor.style.background = 'var(--gold)';
      trail.style.width = '36px'; trail.style.height = '36px';
    });
  });
}

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
if(navbar){
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ===== ACTIVE NAV LINK (multi-page) ===== */
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if(href === path) a.classList.add('active');
  });
})();

/* ===== MOBILE MENU ===== */
function toggleMobileMenu(){
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mob-overlay');
  const hamburger = document.querySelector('.nav-hamburger');
  if(!menu) return;
  if(menu.classList.contains('open')){ closeMobileMenu(); return; }
  if(overlay){ overlay.style.display='block'; requestAnimationFrame(()=>overlay.classList.add('open')); }
  menu.classList.add('open');
  hamburger?.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeMobileMenu(){
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mob-overlay');
  const hamburger = document.querySelector('.nav-hamburger');
  if(menu) menu.classList.remove('open');
  hamburger?.classList.remove('open');
  document.body.style.overflow='';
  if(overlay){ overlay.classList.remove('open'); setTimeout(()=>{ overlay.style.display='none'; },350); }
}
function toggleServicesMenu(){
  document.querySelector('.mob-svc-toggle')?.classList.toggle('svc-open');
  document.querySelector('.mob-svc-panel')?.classList.toggle('open');
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMobileMenu(); });

/* ===== DROPDOWN — close on outside click (touch devices) ===== */
document.addEventListener('click', e => {
  document.querySelectorAll('.has-dropdown.open').forEach(el => {
    if(!el.contains(e.target)) el.classList.remove('open');
  });
});
document.querySelectorAll('.has-dropdown').forEach(el => {
  el.querySelector('a')?.addEventListener('click', e => {
    if(window.innerWidth <= 900) return; // let mobile menu handle it
    e.stopPropagation();
    const wasOpen = el.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(d => d.classList.remove('open'));
    el.classList.toggle('open', !wasOpen);
  });
});

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); closeMobileMenu(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

/* ===== FADE-UP OBSERVER ===== */
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.12});
document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, suffix){
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if(!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val + suffix;
    if(progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix || '');
      statsObs.unobserve(el);
    }
  });
}, {threshold:0.5});
document.querySelectorAll('.stat-num[data-target]').forEach(el => statsObs.observe(el));

/* ===== FAQ ACCORDION ===== */
function toggleFaq(el){
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => { if(i !== item) i.classList.remove('open'); });
  item.classList.toggle('open', !isOpen);
}

/* ===== CONTACT FORM SUBMIT ===== */
function handleFormSubmit(btn){
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
      btn.closest('form')?.reset();
    }, 3000);
  }, 1600);
}
