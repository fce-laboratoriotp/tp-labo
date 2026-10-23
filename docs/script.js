const slides = document.querySelectorAll('.slide');
let actual = 0;
let esLanding = false;

function actualizarSlides() {
  if (esLanding) return;
  slides.forEach((s, i) => {
    s.classList.toggle('activa', i === actual);
  });
  document.getElementById('contador').textContent = `${actual + 1} / ${slides.length}`;
  document.getElementById('barra').style.width = `${((actual + 1) / slides.length) * 100}%`;
}

// Función para avanzar: revela elementos .paso uno por uno o cambia de slide
function siguientePasoOSlide() {
  if (esLanding) return;
  const slideActual = slides[actual];
  const pasosOcultos = slideActual.querySelectorAll('.paso:not(.visto)');

  if (pasosOcultos.length > 0) {
    pasosOcultos[0].classList.add('visto');
  } else {
    if (actual < slides.length - 1) {
      actual++;
      actualizarSlides();
    }
  }
}

// Función para retroceder
function anteriorSlide() {
  if (esLanding) return;
  if (actual > 0) {
    actual--;
    const pasosActuales = slides[actual].querySelectorAll('.paso');
    pasosActuales.forEach(p => p.classList.remove('visto'));
    actualizarSlides();
  }
}

document.getElementById('btn-sig').addEventListener('click', siguientePasoOSlide);
document.getElementById('btn-ant').addEventListener('click', anteriorSlide);

// Navegación con teclado
window.addEventListener('keydown', (e) => {
  if (esLanding) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
    e.preventDefault();
    siguientePasoOSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    anteriorSlide();
  }
});

// Botón para alternar modo Diapositivas / Landing Page
const btnModo = document.getElementById('btn-modo');
if (btnModo) {
  btnModo.addEventListener('click', () => {
    esLanding = !esLanding;
    document.body.classList.toggle('modo-landing', esLanding);
    document.body.classList.toggle('modo-slides', !esLanding);

    if (esLanding) {
      btnModo.textContent = "🖥️ Ver como Diapositivas";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      btnModo.textContent = "📄 Ver como Landing Page";
      actualizarSlides();
    }
  });
}

// Escalamiento responsive tipo slide deck
function escalarEscenario() {
  const esc = document.getElementById('escenario');
  if (!esc) return;
  const w = window.innerWidth, h = window.innerHeight;
  const sx = w / 1500, sy = h / 850;
  const sc = Math.min(sx, sy);
  
  if (w > 850 && !esLanding) {
    esc.style.setProperty('--escala', sc);
  } else {
    esc.style.setProperty('--escala', 1);
  }
}

window.addEventListener('resize', escalarEscenario);
escalarEscenario();
actualizarSlides();
