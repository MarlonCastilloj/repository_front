/**
 * script.js — Portafolio Marlon Castillo
 * Interactividad básica con manipulación del DOM
 * --------------------------------------------------
 *  1. Mensaje de bienvenida al cargar la página
 *  2. Cambio de texto en el párrafo del hero
 *  3. Mostrar/ocultar el panel de habilidades
 *  + Menú hamburguesa para móviles
 */

/* ============================================================
   UTILIDAD: Seleccionar elementos de forma segura
============================================================ */
/**
 * Selecciona un elemento por su ID.
 * @param {string} id - ID del elemento.
 * @returns {HTMLElement|null}
 */
function getById(id) {
  return document.getElementById(id);
}

/* ============================================================
   1. MENSAJE DE BIENVENIDA
   Muestra un banner al cargar la página y permite cerrarlo.
============================================================ */
(function initWelcomeBanner() {
  const banner = getById('welcome-banner');
  const closeBtn = getById('close-banner');

  if (!banner || !closeBtn) return; // guard: elementos no encontrados

  // Mostrar el banner quitando la clase "hidden"
  banner.classList.remove('hidden');

  // Cerrar el banner al hacer clic en el botón ✕
  closeBtn.addEventListener('click', function () {
    banner.classList.add('hidden');
  });
})();

/* ============================================================
   2. CAMBIO DE TEXTO EN EL PÁRRAFO DEL HERO
   Alterna entre dos textos al hacer clic en "Conóceme más".
============================================================ */
(function initTextToggle() {
  const btn = getById('btn-cambiar-texto');
  const heroBio = getById('hero-bio');

  if (!btn || !heroBio) return;

  // Textos alternativos
  const textos = [
    'Diseño y construyo experiencias digitales con código limpio y buenas prácticas.',
    'Siempre buscando aprender algo nuevo: actualmente explorando JavaScript.',
    'Mi objetivo: crear interfaces accesibles, rápidas y que la gente disfrute usar.'
  ];

  let indice = 0; // índice del texto actual

  btn.addEventListener('click', function () {
    // Avanzar al siguiente texto (ciclo circular)
    indice = (indice + 1) % textos.length;

    // Animación de fade-out → cambio → fade-in
    heroBio.style.opacity = '0';
    heroBio.style.transition = 'opacity 0.3s ease';

    setTimeout(function () {
      heroBio.textContent = textos[indice];
      heroBio.style.opacity = '1';
    }, 300);

    // Cambiar el texto del botón según el estado
    btn.textContent = indice === 0 ? 'Conóceme más' : 'Siguiente dato →';
  });
})();

/* ============================================================
   3. MOSTRAR / OCULTAR PANEL DE HABILIDADES
   El botón "Ver habilidades" despliega u oculta el panel.
============================================================ */
(function initSkillsToggle() {
  const btn = getById('btn-toggle-skills');
  const skillsPanel = getById('skills-panel');

  if (!btn || !skillsPanel) return;

  let visible = false; // estado inicial: oculto

  btn.addEventListener('click', function () {
    visible = !visible; // alternar estado

    if (visible) {
      // Mostrar el panel
      skillsPanel.classList.remove('hidden');
      btn.textContent = 'Ocultar habilidades ↑';
      // Desplazarse suavemente hacia el panel
      skillsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Ocultar el panel
      skillsPanel.classList.add('hidden');
      btn.textContent = 'Ver habilidades';
    }
  });
})();

/* ============================================================
   MENÚ HAMBURGUESA (móvil)
   Abre y cierra el menú de navegación en pantallas pequeñas.
============================================================ */
(function initHamburger() {
  const toggle = getById('nav-toggle');
  const nav = getById('main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    // Actualizar atributo ARIA para accesibilidad
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cerrar el menú al hacer clic en un enlace (mejora UX en móvil)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ============================================================
   MODO OSCURO / CLARO
   Cambia el tema del sitio y persiste la elección.
============================================================ */
(function initThemeToggle() {
  const toggle = getById('theme-toggle');
  const logoImg = document.querySelector('.logo img');
  if (!toggle) return;

  // Al cargar, verificar preferencia guardada
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
    if (logoImg) logoImg.src = 'images/logo.webp';
  }

  toggle.addEventListener('change', function () {
    const isDark = toggle.checked;
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (logoImg) {
      logoImg.src = isDark ? 'images/logo.webp' : 'images/logo_2.webp';
    }
  });
})();
