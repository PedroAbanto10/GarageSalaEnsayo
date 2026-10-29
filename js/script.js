/* ==========================================================================
   CONFIGURACIÓN — cambia aquí tus datos (se aplican a todo el sitio)
   ========================================================================== */
const CONFIG = {
  whatsapp: '51955475301',            // número con código de país, sin + ni espacios
  whatsappTexto: '+51 955 475 301',   // cómo se muestra en pantalla
  email: 'ensayosgarage@gmail.com',
  facebook: 'https://www.facebook.com/ensayosgarage/' // pon aquí el enlace de tu página de Facebook
};

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Datos de contacto desde CONFIG ===== */
  const waUrl = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = waUrl(a.dataset.msg || 'Hola GARAGE, quisiera información.');
  });
  document.querySelectorAll('[data-wa-label]').forEach(el => { el.textContent = CONFIG.whatsappTexto; });
  document.querySelectorAll('[data-email]').forEach(a => { a.href = `mailto:${CONFIG.email}`; });
  document.querySelectorAll('[data-email-label]').forEach(el => { el.textContent = CONFIG.email; });
  document.querySelectorAll('[data-facebook]').forEach(a => { a.href = CONFIG.facebook; });

  /* ===== Año en el footer ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Header y barra de progreso ===== */
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== Menú móvil ===== */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== Animación al hacer scroll ===== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== Formulario -> WhatsApp ===== */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const servicio = document.getElementById('servicio').value;
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      const texto =
        `Hola GARAGE, mi nombre es ${nombre}.\n` +
        `Servicio: ${servicio}.\n` +
        `Correo: ${email}.\n` +
        `Mensaje: ${mensaje}`;

      formNote.textContent = 'Abriendo WhatsApp con tu mensaje...';
      window.open(waUrl(texto), '_blank');
    });
  }
});
