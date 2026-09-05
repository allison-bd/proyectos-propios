import { fases, tarjetas as tarjetasBase } from './datos.js';
import { tarjetas as tarjetasFase1 } from './datos_fase1.js';
import { tarjetas as tarjetasFase2 } from './datos_fase2.js';
import { tarjetas as tarjetasFase3 } from './datos_fase3.js';
import { tarjetas as tarjetasFase4 } from './datos_fase4.js';
import { tarjetas as tarjetasFase5 } from './datos_fase5.js';
import { tarjetas as tarjetasFase6 } from './datos_fase6.js';
import { tarjetas as tarjetasFase7 } from './datos_fase7.js';
import { tarjetas as tarjetasFase8 } from './datos_fase8.js';
import { tarjetas as tarjetasFase9 } from './datos_fase9.js';
import { tarjetas as tarjetasFase10 } from './datos_fase10.js';

const tarjetas = [...tarjetasBase, ...tarjetasFase1, ...tarjetasFase2, ...tarjetasFase3, ...tarjetasFase4, ...tarjetasFase5, ...tarjetasFase6, ...tarjetasFase7, ...tarjetasFase8, ...tarjetasFase9, ...tarjetasFase10];
const vistaMenu = document.getElementById('vista-menu');
const vistaEstudio = document.getElementById('vista-estudio');
const navFases = document.getElementById('nav-fases');
const headerFase = document.getElementById('header-fase');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

let faseActiva = null;
let tarjetaActiva = null;
let pasoActual = 0;

const iconos = {
  wrench: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>',
  cube: '<path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>',
  globe: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/>',
  bolt: '<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>',
  layers: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"/>',
  database: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>',
  shield: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>',
  document: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>',
  link: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>',
  upload: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 7.5m0 0L7.5 12m4.5-4.5v13.5"/>',
  server: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"/>',
};

const flechaIzq = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>';
const flechaDer = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>';
const iconoCheck = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';

function renderizarIcono(nombre) {
  return `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">${iconos[nombre] || iconos.cube}</svg>`;
}

function mostrarMenu() {
  vistaEstudio.classList.add('hidden');
  vistaMenu.classList.remove('hidden');
  renderizarMenu();
  window.scrollTo(0, 0);
}

function mostrarEstudio() {
  vistaMenu.classList.add('hidden');
  vistaEstudio.classList.remove('hidden');
}

function renderizarMenu() {
  navFases.innerHTML = fases.map((fase) => {
    const tarjetasDeFase = tarjetas.filter((t) => t.fase === fase.id);
    const tieneTarjetas = tarjetasDeFase.length > 0;
    const esFaseActiva = faseActiva === fase.id;

    let subItems = '';
    if (esFaseActiva && tieneTarjetas) {
      subItems = `
        <div class="px-4 pb-4 pt-3 space-y-2 border-t border-verde-oscuro/5">
          ${tarjetasDeFase.map((t, idx) => `
            <button
              data-tarjeta-nav="${idx}"
              class="tarjeta-nav-btn w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl bg-crema border border-verde-oscuro/5 text-sm transition-all
                text-verde-oscuro/80 hover:border-verde-node/30 hover:bg-verde-node/5"
            >
              <span class="w-6 h-6 rounded-full bg-verde-node text-white text-[0.65rem] font-bold flex items-center justify-center shrink-0">${String(idx + 1).padStart(2, '0')}</span>
              <span>${t.menuTitulo || t.titulo}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="bg-white rounded-xl border border-verde-oscuro/10 overflow-hidden">
        <button
          data-fase="${fase.id}"
          class="fase-btn w-full flex items-center gap-3 p-4 text-left transition-colors
            ${esFaseActiva ? 'bg-verde-node/5' : 'hover:bg-verde-oscuro/[0.02]'}"
        >
          <div class="w-10 h-10 rounded-xl ${esFaseActiva ? 'bg-verde-node/15 text-verde-node' : 'bg-verde-oscuro/5 text-verde-oscuro/50'} flex items-center justify-center shrink-0">
            ${renderizarIcono(fase.icono)}
          </div>
          <span class="leading-snug flex-1 min-w-0">
            <span class="block text-xs ${esFaseActiva ? 'text-verde-node/60' : 'text-verde-oscuro/40'} font-semibold">Fase ${fase.id}</span>
            <span class="block font-titulo font-semibold text-sm ${esFaseActiva ? 'text-verde-node' : 'text-verde-oscuro'}">${fase.titulo}</span>
            <span class="block text-xs text-verde-oscuro/40 font-normal mt-0.5 leading-relaxed">${fase.descripcion}</span>
          </span>
          ${!tieneTarjetas
            ? '<span class="text-[0.6rem] bg-amarillo text-amarillo-texto px-1.5 py-0.5 rounded-full font-semibold shrink-0">Pronto</span>'
            : `<svg class="w-4 h-4 shrink-0 transition-transform ${esFaseActiva ? 'rotate-90' : ''} text-verde-oscuro/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>`
          }
        </button>
        ${subItems}
      </div>
    `;
  }).join('');
}

function totalPasos(tarjeta) {
  return tarjeta.capas.length + (tarjeta.ejercicio ? 1 : 0);
}

function obtenerTarjetasDeFase() {
  return tarjetas.filter((t) => t.fase === faseActiva);
}

function actualizarVista() {
  const tarjetasDeFase = obtenerTarjetasDeFase();
  const tarjeta = tarjetasDeFase[tarjetaActiva];
  const total = totalPasos(tarjeta);
  const esEjercicio = tarjeta.ejercicio && pasoActual === tarjeta.capas.length;
  const esUltimoDeUltima = tarjetaActiva === tarjetasDeFase.length - 1 && pasoActual === total - 1;
  const nombreCapa = esEjercicio ? 'Ponlo a prueba' : tarjeta.capas[pasoActual].nombre;

  headerFase.innerHTML = `
    <div class="flex items-center gap-2 px-4 py-3">
      <button class="btn-retroceder w-10 h-10 rounded-full border border-verde-oscuro/20 flex items-center justify-center transition-colors hover:bg-verde-oscuro/5 shrink-0">
        ${flechaIzq}
      </button>
      <div class="flex items-center gap-1.5 flex-1 mx-2">
        ${Array.from({ length: total }, (_, i) => `
          <div class="flex-1 h-2.5 rounded-full transition-colors ${i <= pasoActual ? 'bg-verde-node' : 'bg-verde-oscuro/15'}"></div>
        `).join('')}
      </div>
      ${esUltimoDeUltima
        ? `<button class="btn-avanzar w-10 h-10 rounded-full bg-amarillo text-amarillo-texto flex items-center justify-center shrink-0">${iconoCheck}</button>`
        : `<button class="btn-avanzar w-10 h-10 rounded-full bg-verde-node text-white flex items-center justify-center transition-colors hover:bg-verde-node/90 shrink-0">${flechaDer}</button>`
      }
    </div>
    <div class="text-center pb-3">
      <h3 class="font-titulo font-bold text-base text-verde-oscuro">${tarjeta.titulo}</h3>
      <p class="text-xs font-semibold text-verde-node">${nombreCapa}</p>
    </div>
  `;

  if (esEjercicio) {
    contenedorTarjetas.innerHTML = `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        ${renderizarEjercicio(tarjeta.ejercicio, 0)}
      </div>
    `;
  } else {
    contenedorTarjetas.innerHTML = `
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div class="contenido-capa capa-contenido">
          ${tarjeta.capas[pasoActual].contenido}
        </div>
      </div>
    `;
  }

  contenedorTarjetas.scrollTop = 0;
  agregarBotonesCopiar();
}

function avanzar() {
  const tarjetasDeFase = obtenerTarjetasDeFase();
  const tarjeta = tarjetasDeFase[tarjetaActiva];
  const total = totalPasos(tarjeta);

  if (pasoActual < total - 1) {
    pasoActual++;
    actualizarVista();
  } else if (tarjetaActiva < tarjetasDeFase.length - 1) {
    tarjetaActiva++;
    pasoActual = 0;
    actualizarVista();
  } else {
    mostrarMenu();
  }
}

function retroceder() {
  if (pasoActual > 0) {
    pasoActual--;
    actualizarVista();
  } else if (tarjetaActiva > 0) {
    tarjetaActiva--;
    const tarjetasDeFase = obtenerTarjetasDeFase();
    const tarjetaAnterior = tarjetasDeFase[tarjetaActiva];
    pasoActual = totalPasos(tarjetaAnterior) - 1;
    actualizarVista();
  } else {
    mostrarMenu();
  }
}

function renderizarEjercicio(ejercicio, tarjetaIdx) {
  if (ejercicio.tipo === 'opcion_multiple' || ejercicio.tipo === 'que_resultado') {
    return `
      <div class="ejercicio-contenedor capa-contenido">
        <p class="ejercicio-pregunta">${ejercicio.pregunta}</p>
        ${ejercicio.codigoBase ? `<pre class="bloque-codigo mb-4"><code>${ejercicio.codigoBase}</code></pre>` : ''}
        <div class="ejercicio-opciones" data-ejercicio="${tarjetaIdx}" data-correcta="${ejercicio.respuestaCorrecta}">
          ${ejercicio.opciones.map((opcion, i) => `
            <button class="ejercicio-opcion" data-opcion="${i}">
              <span class="opcion-icono"></span>
              <span>${opcion}</span>
            </button>
          `).join('')}
        </div>
        <div id="retro-${tarjetaIdx}"></div>
      </div>
    `;
  }

  if (ejercicio.tipo === 'completa_codigo') {
    let codigo = ejercicio.codigoBase;
    for (const hueco of ejercicio.huecos) {
      codigo = codigo.replace(
        '___',
        `<input type="text" class="hueco-codigo" data-hueco="${hueco.id}" data-respuesta="${hueco.respuesta}" placeholder="..." />`
      );
    }
    return `
      <div class="ejercicio-contenedor capa-contenido">
        <p class="ejercicio-pregunta">${ejercicio.pregunta}</p>
        <pre class="bloque-codigo mb-4"><code>${codigo}</code></pre>
        <button class="btn-verificar-huecos px-4 py-2 text-sm font-semibold rounded-lg bg-verde-node text-white hover:bg-verde-node/90 transition-colors" data-ejercicio="${tarjetaIdx}">
          Verificar
        </button>
        <div id="retro-${tarjetaIdx}"></div>
      </div>
    `;
  }

  return '';
}

function manejarRespuestaEjercicio(opcionIdx) {
  const tarjetasDeFase = obtenerTarjetasDeFase();
  const tarjeta = tarjetasDeFase[tarjetaActiva];
  if (!tarjeta || !tarjeta.ejercicio) return;

  const ejercicio = tarjeta.ejercicio;
  const contenedorOpciones = document.querySelector('[data-ejercicio="0"]');
  const opciones = contenedorOpciones.querySelectorAll('.ejercicio-opcion');
  const retroArea = document.getElementById('retro-0');
  const esCorrecta = opcionIdx === ejercicio.respuestaCorrecta;

  opciones.forEach((btn) => {
    btn.classList.remove('opcion-correcta', 'opcion-incorrecta', 'opcion-resaltada');
    btn.querySelector('.opcion-icono').textContent = '';
  });

  const opcionElegida = opciones[opcionIdx];

  if (esCorrecta) {
    opcionElegida.classList.add('opcion-correcta');
    opcionElegida.querySelector('.opcion-icono').textContent = '✓';
    retroArea.innerHTML = `
      <div class="ejercicio-retroalimentacion retro-correcta">
        ${ejercicio.retroalimentacion.correcta}
      </div>
    `;
  } else {
    opcionElegida.classList.add('opcion-incorrecta');
    opcionElegida.querySelector('.opcion-icono').textContent = '✗';
    opciones[ejercicio.respuestaCorrecta].classList.add('opcion-resaltada');
    retroArea.innerHTML = `
      <div class="ejercicio-retroalimentacion retro-incorrecta">
        ${ejercicio.retroalimentacion.incorrecta}
      </div>
    `;
  }
}

function agregarBotonesCopiar() {
  document.querySelectorAll('pre.bloque-codigo').forEach((pre) => {
    if (pre.querySelector('.btn-copiar')) return;

    const btn = document.createElement('button');
    btn.className = 'btn-copiar';
    btn.textContent = 'Copiar';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const texto = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(texto).then(() => {
        btn.textContent = '¡Copiado!';
        setTimeout(() => { btn.textContent = 'Copiar'; }, 1500);
      });
    });
    pre.appendChild(btn);
  });
}

navFases.addEventListener('click', (e) => {
  const btnTarjeta = e.target.closest('.tarjeta-nav-btn');
  if (btnTarjeta) {
    const idx = parseInt(btnTarjeta.dataset.tarjetaNav, 10);
    tarjetaActiva = idx;
    pasoActual = 0;
    mostrarEstudio();
    actualizarVista();
    return;
  }

  const btn = e.target.closest('.fase-btn');
  if (!btn) return;
  const faseId = parseInt(btn.dataset.fase, 10);

  const tarjetasDeFase = tarjetas.filter((t) => t.fase === faseId);
  if (tarjetasDeFase.length === 0) return;

  if (faseActiva === faseId) {
    faseActiva = null;
  } else {
    faseActiva = faseId;
  }
  tarjetaActiva = null;
  renderizarMenu();
});

headerFase.addEventListener('click', (e) => {
  if (e.target.closest('.btn-retroceder')) retroceder();
  if (e.target.closest('.btn-avanzar')) avanzar();
});

contenedorTarjetas.addEventListener('click', (e) => {
  const btnOpcion = e.target.closest('.ejercicio-opcion');
  if (btnOpcion) {
    const opcionIdx = parseInt(btnOpcion.dataset.opcion, 10);
    manejarRespuestaEjercicio(opcionIdx);
  }
});

window.seleccionarVersion = function(tipo) {
  const cajas = document.querySelectorAll('.version-box');
  const etiquetas = document.querySelectorAll('.version-label');
  const desc = document.getElementById('version-desc');

  cajas.forEach(c => {
    c.classList.remove('version-activa-major', 'version-activa-minor', 'version-activa-patch');
  });
  etiquetas.forEach(e => e.classList.add('opacity-0'));

  const caja = document.querySelector('[data-version="' + tipo + '"]');
  const etiqueta = document.querySelector('[data-label="' + tipo + '"]');

  caja.classList.add('version-activa-' + tipo);
  etiqueta.classList.remove('opacity-0');

  const textos = {
    major: 'Si este número sube, algo cambió tanto que tu código actual podría dejar de funcionar.',
    minor: 'Se agregaron funciones nuevas, pero todo lo anterior sigue funcionando.',
    patch: 'Se corrigieron errores o fallas de seguridad. Nada cambió en el comportamiento.'
  };

  desc.innerHTML = '<strong>' + tipo.toUpperCase() + ':</strong> ' + textos[tipo];
  desc.classList.remove('opacity-0');
};

window.toggleSimbolo = function(simbolo) {
  const btnCaret = document.getElementById('btn-caret');
  const btnTilde = document.getElementById('btn-tilde');
  const items = document.querySelectorAll('.version-item');
  const textoSimbolo = document.getElementById('texto-simbolo');

  if (simbolo === 'caret') {
    btnCaret.classList.add('simbolo-activo');
    btnCaret.classList.remove('simbolo-inactivo');
    btnTilde.classList.remove('simbolo-activo');
    btnTilde.classList.add('simbolo-inactivo');
    textoSimbolo.textContent = 'Permite MINOR y PATCH. Bloquea MAJOR.';
  } else {
    btnTilde.classList.add('simbolo-activo');
    btnTilde.classList.remove('simbolo-inactivo');
    btnCaret.classList.remove('simbolo-activo');
    btnCaret.classList.add('simbolo-inactivo');
    textoSimbolo.textContent = 'Solo permite PATCH. Bloquea MINOR y MAJOR.';
  }

  const reglas = {
    caret: { '4.16.2': true, '4.17.0': true, '5.0.0': false },
    tilde: { '4.16.2': true, '4.17.0': false, '5.0.0': false }
  };

  items.forEach(item => {
    const ver = item.dataset.ver;
    const acepta = reglas[simbolo][ver];
    const icono = item.querySelector('.vi-icono');
    const texto = item.querySelector('.vi-texto');

    item.classList.remove('vi-aceptada', 'vi-rechazada');
    item.classList.add(acepta ? 'vi-aceptada' : 'vi-rechazada');
    icono.textContent = acepta ? '✓' : '✗';
    texto.textContent = acepta ? 'Se instala' : 'No se instala';
  });
};

window.revelarPrediccion = function(respuesta) {
  const resultado = document.getElementById('prediccion-resultado');
  const botones = document.querySelectorAll('.prediccion-btn');

  botones.forEach(b => {
    b.style.opacity = '0.5';
    b.style.pointerEvents = 'none';
  });

  const esCorrecta = respuesta === 'no';

  let html = '';
  if (esCorrecta) {
    html = '<div class="ejercicio-retroalimentacion retro-correcta">Correcto: el <code>^</code> bloquea cambios de MAJOR. Pasar de 4.x.x a 5.0.0 es un salto de MAJOR, así que el gestor NO lo instala automáticamente.</div>';
  } else {
    html = '<div class="ejercicio-retroalimentacion retro-incorrecta">No exactamente. El <code>^</code> permite MINOR y PATCH, pero bloquea MAJOR. Pasar de 4.x.x a 5.0.0 es un cambio de MAJOR, así que NO se instala.</div>';
    html += '<button class="prediccion-btn" style="margin-top:0.75rem;" onclick="reiniciarPrediccion()">Intentar de nuevo</button>';
  }

  resultado.innerHTML = html;
  resultado.classList.remove('hidden');
};

window.reiniciarPrediccion = function() {
  const resultado = document.getElementById('prediccion-resultado');
  const botones = document.querySelectorAll('.prediccion-btn:not(#prediccion-resultado .prediccion-btn)');

  resultado.innerHTML = '';
  resultado.classList.add('hidden');

  botones.forEach(b => {
    b.style.opacity = '1';
    b.style.pointerEvents = 'auto';
  });
};

// --- Tarjeta: Gestor de paquetes — revelar librería ---
window.revelarLibreria = function(idx) {
  const celda = document.querySelector('[data-lib="' + idx + '"]');
  celda.classList.remove('lib-oculta');
  celda.classList.add('lib-revelada');
  celda.textContent = celda.dataset.nombre;
};

window.revelarTodasLibrerias = function() {
  document.querySelectorAll('.lib-oculta').forEach(c => {
    c.classList.remove('lib-oculta');
    c.classList.add('lib-revelada');
    c.textContent = c.dataset.nombre;
  });
};

// --- Tarjeta: Gestor de paquetes — cadena de dependencias ---
window.simularCadena = function(gestor) {
  const items = document.querySelectorAll('.cadena-item');
  const resultado = document.getElementById('cadena-resultado');
  const btnNpm = document.getElementById('btn-cadena-npm');
  const btnPnpm = document.getElementById('btn-cadena-pnpm');

  items.forEach(item => {
    item.classList.remove('hidden');
    item.style.animation = 'aparecerCapa 0.4s ease-out';
  });

  btnNpm.classList.toggle('simbolo-activo', gestor === 'npm');
  btnNpm.classList.toggle('simbolo-inactivo', gestor !== 'npm');
  btnPnpm.classList.toggle('simbolo-activo', gestor === 'pnpm');
  btnPnpm.classList.toggle('simbolo-inactivo', gestor !== 'pnpm');

  if (gestor === 'npm') {
    resultado.innerHTML = '<div class="recuadro-resaltado" style="border-left:3px solid #DC6B6B;">Puedes usar A, B y C en tu código, aunque solo pediste A. Si B desaparece en una actualización, tu proyecto se rompe.</div>';
  } else {
    resultado.innerHTML = '<div class="recuadro-resaltado" style="border-left:3px solid #339933;">Solo puedes usar A. B y C están aisladas. Si las necesitas, las instalas explícitamente.</div>';
  }
};

// --- Tarjeta: package.json — campo clickeable ---
window.mostrarCampo = function(campo) {
  const lineas = document.querySelectorAll('.json-linea');
  const desc = document.getElementById('campo-desc');

  lineas.forEach(l => l.classList.remove('json-linea-activa'));
  const linea = document.querySelector('[data-campo="' + campo + '"]');
  if (linea) linea.classList.add('json-linea-activa');

  const descripciones = {
    name: 'Nombre del proyecto. Sin espacios, en minúsculas. Lo eliges tú al crearlo.',
    version: 'Versión de TU proyecto (no de las librerías). Formato semver: MAJOR.MINOR.PATCH.',
    type: '"module" activa ESM (import/export). Sin esta línea, Node usa CommonJS (require).',
    scripts: 'Atajos de comandos para la terminal. "start" es el más importante: arranca tu servidor.',
    dependencies: 'Lista de librerías que tu proyecto necesita. Se agregan solas con pnpm add.'
  };

  desc.textContent = descripciones[campo] || '';
  desc.classList.remove('opacity-0');
};

// --- Tarjeta: Scripts — simulador de ejecución ---
window.simularScript = function(tipo) {
  const terminal = document.getElementById('terminal-script');
  const btnDirecto = document.getElementById('btn-directo');
  const btnScript = document.getElementById('btn-script');

  btnDirecto.classList.toggle('simbolo-activo', tipo === 'directo');
  btnDirecto.classList.toggle('simbolo-inactivo', tipo !== 'directo');
  btnScript.classList.toggle('simbolo-activo', tipo === 'script');
  btnScript.classList.toggle('simbolo-inactivo', tipo !== 'script');

  if (tipo === 'directo') {
    terminal.innerHTML = '<span class="code-comment">// Necesitas saber la ruta exacta del archivo</span>\n<span style="color:#EAD9B8;">$</span> <span class="code-method">node</span> <span class="code-string">./bin/www</span>\n\n<span style="color:#A6C58C;">Servidor corriendo en puerto 3000...</span>';
  } else {
    terminal.innerHTML = '<span class="code-comment">// Solo necesitas recordar el nombre del atajo</span>\n<span style="color:#EAD9B8;">$</span> <span class="code-method">pnpm start</span>\n\n<span class="code-comment">// pnpm lee package.json → encuentra "start" → ejecuta "node ./bin/www"</span>\n<span style="color:#A6C58C;">Servidor corriendo en puerto 3000...</span>';
  }
};

// --- Tarjeta: Lockfile — simulación con/sin lockfile ---
window.simularLockfile = function(conLock) {
  const btnCon = document.getElementById('btn-con-lock');
  const btnSin = document.getElementById('btn-sin-lock');
  const resultado = document.getElementById('lock-resultado');

  btnCon.classList.toggle('simbolo-activo', conLock);
  btnCon.classList.toggle('simbolo-inactivo', !conLock);
  btnSin.classList.toggle('simbolo-activo', !conLock);
  btnSin.classList.toggle('simbolo-inactivo', conLock);

  if (conLock) {
    resultado.innerHTML = '<div style="display:flex;flex-direction:column;gap:0.5rem;"><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><code style="flex:1;">express</code><span style="font-family:\'JetBrains Mono\',monospace;font-size:0.85rem;">4.21.0</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><code style="flex:1;">express</code><span style="font-family:\'JetBrains Mono\',monospace;font-size:0.85rem;">4.21.0</span></div></div><p class="text-center mt-3" style="font-size:0.85rem;color:#2D5A1E;font-weight:600;">Mismo resultado para los dos. El proyecto funciona igual.</p>';
  } else {
    resultado.innerHTML = '<div style="display:flex;flex-direction:column;gap:0.5rem;"><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><code style="flex:1;">express (tú)</code><span style="font-family:\'JetBrains Mono\',monospace;font-size:0.85rem;">4.21.0</span></div><div class="version-item vi-rechazada"><span class="vi-icono">✗</span><code style="flex:1;">express (compañero)</code><span style="font-family:\'JetBrains Mono\',monospace;font-size:0.85rem;">4.21.1</span></div></div><p class="text-center mt-3" style="font-size:0.85rem;color:#8B3A3A;font-weight:600;">Versiones diferentes. A tu compañero le puede fallar algo que a ti no.</p>';
  }
};

// --- Tarjeta: node_modules — flujo paso a paso ---
window.avanzarFlujo = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta: Express Generator — selector de motor ---
window.elegirMotor = function(motor) {
  const btns = document.querySelectorAll('.motor-btn');
  const resultado = document.getElementById('motor-resultado');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  document.querySelector('[data-motor="' + motor + '"]').classList.add('simbolo-activo');
  document.querySelector('[data-motor="' + motor + '"]').classList.remove('simbolo-inactivo');

  const resultados = {
    ejs: '<div class="text-center"><p style="font-weight:600;color:#33402A;margin-bottom:0.5rem;">Monolito</p><p style="font-size:0.85rem;">El servidor genera HTML completo y lo envía al navegador. El usuario ve la página directamente.</p><pre class="bloque-codigo mt-3"><code><span class="code-comment">// El servidor responde con HTML</span>\nres.<span class="code-method">render</span>(<span class="code-string">\'index\'</span>, { titulo: <span class="code-string">\'Bienvenido\'</span> });</code></pre></div>',
    none: '<div class="text-center"><p style="font-weight:600;color:#33402A;margin-bottom:0.5rem;">API REST</p><p style="font-size:0.85rem;">El servidor solo devuelve datos JSON. Una app separada (React, app móvil) se encarga de mostrarlos.</p><pre class="bloque-codigo mt-3"><code><span class="code-comment">// El servidor responde con JSON</span>\nres.<span class="code-method">json</span>({ titulo: <span class="code-string">\'Bienvenido\'</span> });</code></pre></div>'
  };

  resultado.innerHTML = resultados[motor] || '';
};

// --- Tarjeta: Node.js — revelar capacidades ---
window.revelarCapacidad = function(id) {
  const item = document.querySelector('[data-cap="' + id + '"]');
  const icono = item.querySelector('.cap-icono');
  const texto = item.querySelector('.cap-texto');
  item.classList.add('cap-revelada');
  icono.textContent = '✓';
  texto.style.color = '#33402A';
};

// --- Tarjeta: Node vs Navegador — toggle entorno ---
window.toggleEntorno = function(entorno) {
  const btnNav = document.getElementById('btn-navegador');
  const btnNode = document.getElementById('btn-node');
  const contenido = document.getElementById('entorno-contenido');

  btnNav.classList.toggle('simbolo-activo', entorno === 'navegador');
  btnNav.classList.toggle('simbolo-inactivo', entorno !== 'navegador');
  btnNode.classList.toggle('simbolo-activo', entorno === 'node');
  btnNode.classList.toggle('simbolo-inactivo', entorno !== 'node');

  if (entorno === 'navegador') {
    contenido.innerHTML = '<div style="display:flex;flex-direction:column;gap:0.5rem;"><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">DOM y document</span><span class="vi-texto">Modifica el HTML</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">window</span><span class="vi-texto">Objeto global</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">fetch</span><span class="vi-texto">Peticiones HTTP</span></div><div class="version-item vi-rechazada"><span class="vi-icono">✗</span><span style="flex:1;font-weight:600;">Sistema de archivos</span><span class="vi-texto">Prohibido</span></div><div class="version-item vi-rechazada"><span class="vi-icono">✗</span><span style="flex:1;font-weight:600;">Crear servidores</span><span class="vi-texto">Prohibido</span></div><div class="version-item vi-rechazada"><span class="vi-icono">✗</span><span style="flex:1;font-weight:600;">process.env</span><span class="vi-texto">No existe</span></div></div>';
  } else {
    contenido.innerHTML = '<div style="display:flex;flex-direction:column;gap:0.5rem;"><div class="version-item vi-rechazada"><span class="vi-icono">✗</span><span style="flex:1;font-weight:600;">DOM y document</span><span class="vi-texto">No existe</span></div><div class="version-item vi-rechazada"><span class="vi-icono">✗</span><span style="flex:1;font-weight:600;">window</span><span class="vi-texto">No existe</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">fetch</span><span class="vi-texto">Disponible</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">Sistema de archivos (fs)</span><span class="vi-texto">Acceso total</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">Crear servidores (http)</span><span class="vi-texto">Acceso total</span></div><div class="version-item vi-aceptada"><span class="vi-icono">✓</span><span style="flex:1;font-weight:600;">process.env</span><span class="vi-texto">Variables del sistema</span></div></div>';
  }
};

// --- Tarjeta: CommonJS vs ESM — toggle código ---
window.toggleModulo = function(sistema) {
  const btnCjs = document.getElementById('btn-cjs');
  const btnEsm = document.getElementById('btn-esm');
  const codigo = document.getElementById('modulo-codigo');

  btnCjs.classList.toggle('simbolo-activo', sistema === 'cjs');
  btnCjs.classList.toggle('simbolo-inactivo', sistema !== 'cjs');
  btnEsm.classList.toggle('simbolo-activo', sistema === 'esm');
  btnEsm.classList.toggle('simbolo-inactivo', sistema !== 'esm');

  if (sistema === 'cjs') {
    codigo.innerHTML = '<span class="code-comment">// CommonJS — archivo: utils.js</span>\n<span class="code-keyword">const</span> saludar = (nombre) => <span class="code-string">`Hola, ${nombre}`</span>;\n\n<span class="code-keyword">module.exports</span> = { saludar };\n\n<span class="code-comment">// CommonJS — archivo: app.js</span>\n<span class="code-keyword">const</span> { saludar } = <span class="code-method">require</span>(<span class="code-string">\'./utils\'</span>);\n\nconsole.<span class="code-method">log</span>(saludar(<span class="code-string">\'Ana\'</span>));';
  } else {
    codigo.innerHTML = '<span class="code-comment">// ESM — archivo: utils.js</span>\n<span class="code-keyword">const</span> saludar = (nombre) => <span class="code-string">`Hola, ${nombre}`</span>;\n\n<span class="code-keyword">export</span> { saludar };\n\n<span class="code-comment">// ESM — archivo: app.js</span>\n<span class="code-keyword">import</span> { saludar } <span class="code-keyword">from</span> <span class="code-string">\'./utils.js\'</span>;\n\nconsole.<span class="code-method">log</span>(saludar(<span class="code-string">\'Ana\'</span>));';
  }
};

// --- Tarjeta: Módulos nativos — consola interactiva ---
window.probarModulo = function(modulo) {
  const btns = document.querySelectorAll('.mod-btn, [data-mod]');
  const codigoEl = document.getElementById('mod-codigo');
  const consolaEl = document.getElementById('mod-consola');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const btnActivo = document.querySelector('[data-mod="' + modulo + '"]');
  if (btnActivo) {
    btnActivo.classList.add('simbolo-activo');
    btnActivo.classList.remove('simbolo-inactivo');
  }

  const datos = {
    path: {
      codigo: '<span class="code-comment">// Importamos el módulo "path" (viene con Node, no se instala)</span>\n<span class="code-keyword">import</span> path <span class="code-keyword">from</span> <span class="code-string">\'node:path\'</span>;\n\n<span class="code-comment">// path.join une carpetas en una ruta válida para cualquier sistema operativo</span>\n<span class="code-comment">// En Windows usaría \\ y en Mac/Linux usaría /</span>\n<span class="code-keyword">const</span> ruta = path.<span class="code-method">join</span>(<span class="code-string">\'logs\'</span>, <span class="code-string">\'seguridad\'</span>, <span class="code-string">\'archivo.log\'</span>);\n\nconsole.<span class="code-method">log</span>(ruta);',
      consola: '<span style="color:#A6C58C;">logs/seguridad/archivo.log</span>\n\n<span class="code-comment">// path armó la ruta uniendo las 3 carpetas con /</span>\n<span class="code-comment">// Tú no te preocupas de si es Windows o Linux</span>'
    },
    fs: {
      codigo: '<span class="code-comment">// Importamos "fs" con promesas (para usar await)</span>\n<span class="code-keyword">import</span> fs <span class="code-keyword">from</span> <span class="code-string">\'node:fs/promises\'</span>;\n\n<span class="code-comment">// writeFile crea un archivo en el disco con el texto que le des</span>\n<span class="code-comment">// Primer argumento: nombre del archivo</span>\n<span class="code-comment">// Segundo argumento: contenido que se escribe dentro</span>\n<span class="code-keyword">await</span> fs.<span class="code-method">writeFile</span>(<span class="code-string">\'nota.txt\'</span>, <span class="code-string">\'Hola mundo\'</span>);\n\nconsole.<span class="code-method">log</span>(<span class="code-string">\'Archivo creado\'</span>);',
      consola: '<span style="color:#A6C58C;">Archivo creado</span>\n\n<span class="code-comment">// Se creó un archivo llamado "nota.txt" en el disco</span>\n<span class="code-comment">// con el texto "Hola mundo" adentro</span>'
    },
    os: {
      codigo: '<span class="code-comment">// Importamos "os" para consultar info del computador</span>\n<span class="code-keyword">import</span> os <span class="code-keyword">from</span> <span class="code-string">\'node:os\'</span>;\n\n<span class="code-comment">// platform() devuelve en qué sistema operativo estás</span>\nconsole.<span class="code-method">log</span>(<span class="code-string">\'Sistema:\'</span>, os.<span class="code-method">platform</span>());\n\n<span class="code-comment">// freemem() devuelve cuánta RAM libre tiene tu computador (en bytes)</span>\n<span class="code-comment">// Lo dividimos para convertirlo a megabytes</span>\nconsole.<span class="code-method">log</span>(<span class="code-string">\'RAM libre:\'</span>, os.<span class="code-method">freemem</span>() / <span class="code-number">1024</span> / <span class="code-number">1024</span>, <span class="code-string">\'MB\'</span>);',
      consola: '<span style="color:#A6C58C;">Sistema: linux</span>\n<span style="color:#A6C58C;">RAM libre: 2048 MB</span>'
    }
  };

  codigoEl.innerHTML = datos[modulo].codigo;
  consolaEl.innerHTML = datos[modulo].consola;
};

// --- Process.argv: con explicación más clara ---
// REEMPLAZA la función window.simularArgv por esta:

window.simularArgv = function(comando) {
  const resultado = document.getElementById('argv-resultado');
  const terminal = document.getElementById('argv-terminal');

  if (comando === 'basico') {
    terminal.innerHTML = '<span style="color:#EAD9B8;">$</span> <span class="code-method">node</span> <span class="code-string">app.js</span>';
    resultado.innerHTML = '<span style="color:#A6C58C;">[\n  <span class="code-string">\'/usr/bin/node\'</span>,      <span class="code-comment">// [0] ruta de Node (siempre)</span>\n  <span class="code-string">\'/home/usuario/app.js\'</span> <span class="code-comment">// [1] ruta de tu archivo (siempre)</span>\n]</span>\n\n<span class="code-comment">// Solo 2 elementos. No escribiste nada extra después de app.js</span>';
  } else {
    terminal.innerHTML = '<span style="color:#EAD9B8;">$</span> <span class="code-method">node</span> <span class="code-string">app.js</span> <span style="color:#E6B980;">--port=4000</span> <span style="color:#E6B980;">produccion</span>';
    resultado.innerHTML = '<span style="color:#A6C58C;">[\n  <span class="code-string">\'/usr/bin/node\'</span>,      <span class="code-comment">// [0] ruta de Node (siempre)</span>\n  <span class="code-string">\'/home/usuario/app.js\'</span>, <span class="code-comment">// [1] ruta de tu archivo (siempre)</span>\n  <span style="color:#E6B980;">\'--port=4000\'</span>,        <span class="code-comment">// [2] tu primer argumento</span>\n  <span style="color:#E6B980;">\'produccion\'</span>          <span class="code-comment">// [3] tu segundo argumento</span>\n]</span>\n\n<span class="code-comment">// Tus argumentos siempre empiezan desde el índice [2]</span>\n<span class="code-comment">// process.argv[2] → \'--port=4000\'</span>';
  }
};

// --- Sync vs Async: cada línea en línea nueva ---
// REEMPLAZA la función window.ejecutarCodigo por esta:

window.ejecutarCodigo = function(tipo) {
  const btnSync = document.getElementById('btn-sync');
  const btnAsync = document.getElementById('btn-async');
  const codigo = document.getElementById('async-codigo');
  const consola = document.getElementById('async-consola');

  btnSync.classList.toggle('simbolo-activo', tipo === 'sync');
  btnSync.classList.toggle('simbolo-inactivo', tipo !== 'sync');
  btnAsync.classList.toggle('simbolo-activo', tipo === 'async');
  btnAsync.classList.toggle('simbolo-inactivo', tipo !== 'async');

  if (tipo === 'sync') {
    codigo.innerHTML = 'console.<span class="code-method">log</span>(<span class="code-string">\'1. Inicio\'</span>);\n\n<span class="code-comment">// Lectura SÍNCRONA: bloquea todo hasta terminar</span>\n<span class="code-keyword">const</span> datos = fs.<span class="code-method">readFileSync</span>(<span class="code-string">\'archivo.txt\'</span>);\n\nconsole.<span class="code-method">log</span>(<span class="code-string">\'2. Archivo leído\'</span>);\nconsole.<span class="code-method">log</span>(<span class="code-string">\'3. Fin\'</span>);';
    consola.innerHTML = '<span style="color:#A6C58C;">1. Inicio</span>\n<span style="color:#E6B980;">   ... esperando lectura del archivo ...</span>\n<span style="color:#A6C58C;">2. Archivo leído</span>\n<span style="color:#A6C58C;">3. Fin</span>\n\n<span class="code-comment">// Todo en orden: 1, 2, 3</span>\n<span class="code-comment">// Pero nada más pudo pasar mientras leía el archivo</span>';
  } else {
    codigo.innerHTML = 'console.<span class="code-method">log</span>(<span class="code-string">\'1. Inicio\'</span>);\n\n<span class="code-comment">// Lectura ASÍNCRONA: no bloquea, sigue adelante</span>\nfs.<span class="code-method">readFile</span>(<span class="code-string">\'archivo.txt\'</span>, () => {\n  console.<span class="code-method">log</span>(<span class="code-string">\'2. Archivo leído\'</span>);\n});\n\nconsole.<span class="code-method">log</span>(<span class="code-string">\'3. Fin\'</span>);';
    consola.innerHTML = '<span style="color:#A6C58C;">1. Inicio</span>\n<span style="color:#A6C58C;">3. Fin</span>\n<span style="color:#E6B980;">   ... el archivo se lee en segundo plano ...</span>\n<span style="color:#A6C58C;">2. Archivo leído</span>\n\n<span class="code-comment">// ¡El 3 sale ANTES que el 2!</span>\n<span class="code-comment">// Node no esperó: siguió adelante y volvió cuando terminó</span>';
  }
};

// --- Promesas: con código y comentarios ---
// REEMPLAZA la función window.simularPromesa por esta:

window.simularPromesa = function(resultado) {
  const estados = document.querySelectorAll('.promesa-estado');
  const salida = document.getElementById('promesa-salida');
  const codigo = document.getElementById('promesa-codigo');

  estados.forEach(e => {
    e.classList.remove('promesa-activa-pending', 'promesa-activa-fulfilled', 'promesa-activa-rejected');
  });

  if (resultado === 'pending') {
    document.querySelector('[data-estado="pending"]').classList.add('promesa-activa-pending');
    codigo.innerHTML = '<span class="code-comment">// Iniciamos una petición al servidor (tarda unos segundos)</span>\n<span class="code-keyword">const</span> promesa = <span class="code-method">fetch</span>(<span class="code-string">\'https://api.ejemplo.com/usuarios\'</span>);\n\n<span class="code-comment">// En este momento, la promesa está en estado PENDING</span>\n<span class="code-comment">// porque la petición todavía no terminó</span>\nconsole.<span class="code-method">log</span>(promesa);';
    salida.innerHTML = '<span style="color:#E6B980;">Promise { &lt;pending&gt; }</span>\n\n<span class="code-comment">// El servidor todavía no respondió</span>\n<span class="code-comment">// La promesa está "en espera"</span>';
  } else if (resultado === 'fulfilled') {
    document.querySelector('[data-estado="fulfilled"]').classList.add('promesa-activa-fulfilled');
    codigo.innerHTML = '<span class="code-comment">// El servidor respondió con éxito</span>\n<span class="code-keyword">const</span> respuesta = <span class="code-keyword">await</span> <span class="code-method">fetch</span>(<span class="code-string">\'https://api.ejemplo.com/usuarios\'</span>);\n<span class="code-keyword">const</span> datos = <span class="code-keyword">await</span> respuesta.<span class="code-method">json</span>();\n\n<span class="code-comment">// La promesa se "cumplió" (fulfilled) y contiene los datos</span>\nconsole.<span class="code-method">log</span>(datos);';
    salida.innerHTML = '<span style="color:#A6C58C;">{ usuarios: ["Ana", "Luis"] }</span>\n\n<span class="code-comment">// Promesa resuelta con éxito</span>\n<span class="code-comment">// El await recibió los datos y los guardó en la variable</span>';
  } else {
    document.querySelector('[data-estado="rejected"]').classList.add('promesa-activa-rejected');
    codigo.innerHTML = '<span class="code-comment">// El servidor no respondió (está caído, o la URL no existe)</span>\n<span class="code-keyword">try</span> {\n  <span class="code-keyword">const</span> respuesta = <span class="code-keyword">await</span> <span class="code-method">fetch</span>(<span class="code-string">\'https://api.ejemplo.com/usuarios\'</span>);\n} <span class="code-keyword">catch</span> (error) {\n  <span class="code-comment">// La promesa fue "rechazada" (rejected)</span>\n  <span class="code-comment">// El error cae aquí dentro del catch</span>\n  console.<span class="code-method">log</span>(error.message);\n}';
    salida.innerHTML = '<span style="color:#DC6B6B;">Error: "No se pudo conectar al servidor"</span>\n\n<span class="code-comment">// Promesa rechazada</span>\n<span class="code-comment">// El catch capturó el error para que la app no se rompa</span>';
  }
};

// --- Tarjeta: URL interactiva ---
window.mostrarParteUrl = function(parte) {
  const partes = document.querySelectorAll('.url-parte');
  const desc = document.getElementById('url-desc');

  partes.forEach(p => {
    p.style.background = 'transparent';
    p.style.padding = '0.15rem 0.1rem';
  });

  const seleccionada = document.querySelector('[data-url="' + parte + '"]');
  seleccionada.style.background = 'rgba(255,255,255,0.15)';
  seleccionada.style.padding = '0.15rem 0.4rem';

  const descripciones = {
    protocolo: '<strong style="color:#C9A0DC;">Protocolo</strong> — Las reglas de comunicación. <code>https</code> significa que los datos viajan cifrados (seguros). <code>http</code> sin la "s" es sin cifrar.',
    dominio: '<strong style="color:#A6C58C;">Dominio</strong> — El nombre del servidor al que te conectas. El navegador lo traduce a una dirección IP numérica para encontrar el computador en internet.',
    ruta: '<strong style="color:#E6B980;">Ruta (path)</strong> — La dirección interna dentro del servidor. Le dice qué recurso o función ejecutar. Es lo que Express lee para decidir qué hacer.',
    params: '<strong style="color:#D4976C;">Query params</strong> — Datos extra para filtrar o modificar la petición. Van después del <code>?</code> como pares <code>clave=valor</code> separados por <code>&</code>.'
  };

  desc.innerHTML = descripciones[parte] || '';
  desc.classList.remove('opacity-0');
};

// --- Tarjeta: Códigos de estado ---
window.mostrarCodigo = function(codigo) {
  const desc = document.getElementById('codigo-desc');

  const codigos = {
    200: { color: '#339933', nombre: '200 OK', texto: 'Todo bien. El servidor procesó la petición y devuelve los datos.', ejemplo: 'Abres tu perfil de Instagram → el servidor responde con tu información.' },
    201: { color: '#339933', nombre: '201 Created', texto: 'Se creó un recurso nuevo con éxito.', ejemplo: 'Publicas una foto → el servidor la guarda y confirma con 201.' },
    301: { color: '#5B8BD4', nombre: '301 Moved Permanently', texto: 'El recurso se movió a otra URL. El navegador redirige automáticamente.', ejemplo: 'Una tienda cambia de dominio → te redirige al nuevo sin que hagas nada.' },
    400: { color: '#E6B980', nombre: '400 Bad Request', texto: 'La petición tiene algo mal: datos incompletos, formato inválido.', ejemplo: 'Envías un formulario de registro sin completar el email → el servidor rechaza.' },
    404: { color: '#E6B980', nombre: '404 Not Found', texto: 'El recurso que pediste no existe en el servidor.', ejemplo: 'Escribes una URL con un error de tipeo → la página no existe.' },
    500: { color: '#DC6B6B', nombre: '500 Internal Server Error', texto: 'El servidor falló internamente. El problema no es tuyo, es del servidor.', ejemplo: 'El servidor pierde conexión con la base de datos → no puede procesar tu petición.' }
  };

  const c = codigos[codigo];
  desc.innerHTML = '<div style="border-left:3px solid ' + c.color + ';padding:0.75rem 1rem;border-radius:0 0.5rem 0.5rem 0;background:white;"><p style="font-weight:700;color:' + c.color + ';margin-bottom:0.25rem;">' + c.nombre + '</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">' + c.texto + '</p><p style="font-size:0.8rem;opacity:0.7;font-style:italic;">' + c.ejemplo + '</p></div>';
};

// --- Tarjeta: Content-Type ---
window.mostrarContentType = function(tipo) {
  const resultado = document.getElementById('content-type-resultado');

  const tipos = {
    html: { header: 'text/html', desc: 'El navegador recibe HTML y lo renderiza como una página web visual: botones, texto, imágenes.', ejemplo: '<pre class="bloque-codigo mt-2"><code>res.<span class="code-method">setHeader</span>(<span class="code-string">\'Content-Type\'</span>, <span class="code-string">\'text/html\'</span>);\nres.<span class="code-method">end</span>(<span class="code-string">\'&lt;h1&gt;Hola&lt;/h1&gt;\'</span>);</code></pre>' },
    json: { header: 'application/json', desc: 'El navegador recibe datos estructurados (JSON). No los muestra como página: los procesa con JavaScript.', ejemplo: '<pre class="bloque-codigo mt-2"><code>res.<span class="code-method">setHeader</span>(<span class="code-string">\'Content-Type\'</span>, <span class="code-string">\'application/json\'</span>);\nres.<span class="code-method">end</span>(JSON.<span class="code-method">stringify</span>({ nombre: <span class="code-string">\'Ana\'</span> }));</code></pre>' },
    plain: { header: 'text/plain', desc: 'El navegador muestra texto sin formato, tal cual. Sin colores, sin estructura, sin botones.', ejemplo: '<pre class="bloque-codigo mt-2"><code>res.<span class="code-method">setHeader</span>(<span class="code-string">\'Content-Type\'</span>, <span class="code-string">\'text/plain\'</span>);\nres.<span class="code-method">end</span>(<span class="code-string">\'OK\'</span>);</code></pre>' }
  };

  const t = tipos[tipo];
  resultado.innerHTML = '<div style="text-align:center;"><p style="font-weight:700;font-family:\'JetBrains Mono\',monospace;margin-bottom:0.5rem;">' + t.header + '</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">' + t.desc + '</p>' + t.ejemplo + '</div>';
};

// --- Tarjeta: Servidor http — piezas del código ---
window.explicarPieza = function(pieza) {
  const desc = document.getElementById('pieza-desc');

  const piezas = {
    createServer: '<strong><code>http.createServer(callback)</code></strong><br>Crea una instancia de un servidor web. Recibe una función (callback) que se ejecutará automáticamente <strong>cada vez</strong> que un cliente haga una petición.',
    req: '<strong><code>req</code></strong> (request / petición)<br>Un objeto que contiene toda la información que el cliente envió: la URL que pidió, el método HTTP (GET, POST...), las cabeceras y el cuerpo si lo hay.',
    res: '<strong><code>res</code></strong> (response / respuesta)<br>Un objeto vacío que Node te da para que <strong>construyas</strong> la respuesta: fijar el código de estado, las cabeceras y el contenido.',
    end: '<strong><code>res.end(texto)</code></strong><br>Envía el contenido al cliente y <strong>cierra la conexión</strong>. Si no lo llamas, el navegador se queda esperando indefinidamente.',
    listen: '<strong><code>server.listen(puerto, callback)</code></strong><br>Pone al servidor a escuchar peticiones en ese puerto. El callback se ejecuta una sola vez cuando el servidor arranca correctamente.'
  };

  desc.innerHTML = '<div style="text-align:left;font-size:0.85rem;line-height:1.6;padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);">' + piezas[pieza] + '</div>';
};

// --- Tarjeta: JSON — stringify y parse ---
window.simularJson = function(metodo) {
  const codigo = document.getElementById('json-codigo');
  const resultado = document.getElementById('json-resultado');

  if (metodo === 'stringify') {
    codigo.innerHTML = '<span class="code-comment">// Tienes un objeto JavaScript en memoria</span>\n<span class="code-keyword">const</span> usuario = {\n  nombre: <span class="code-string">\'Ana\'</span>,\n  edad: <span class="code-number">25</span>,\n  activo: <span class="code-keyword">true</span>\n};\n\n<span class="code-comment">// Lo conviertes a texto JSON para enviarlo por la red</span>\n<span class="code-keyword">const</span> texto = JSON.<span class="code-method">stringify</span>(usuario);\nconsole.<span class="code-method">log</span>(texto);';
    resultado.innerHTML = '<span style="color:#A6C58C;">\'{"nombre":"Ana","edad":25,"activo":true}\'</span>\n\n<span class="code-comment">// Ahora es un string (texto). Puede viajar por HTTP.</span>\n<span class="code-comment">// Las claves tienen comillas dobles obligatorias.</span>';
  } else {
    codigo.innerHTML = '<span class="code-comment">// Recibes texto JSON del servidor</span>\n<span class="code-keyword">const</span> texto = <span class="code-string">\'{"nombre":"Ana","edad":25,"activo":true}\'</span>;\n\n<span class="code-comment">// Lo conviertes a objeto JavaScript para poder usarlo</span>\n<span class="code-keyword">const</span> usuario = JSON.<span class="code-method">parse</span>(texto);\nconsole.<span class="code-method">log</span>(usuario.nombre);';
    resultado.innerHTML = '<span style="color:#A6C58C;">Ana</span>\n\n<span class="code-comment">// Ahora es un objeto. Puedes acceder a .nombre, .edad, etc.</span>\n<span class="code-comment">// Sin parse, usuario.nombre daría undefined.</span>';
  }
};

// --- Tarjeta: ¿Qué es Express? — revelar problemas ---
window.revelarExpress = function(idx) {
  const item = document.querySelector('[data-cap="e' + idx + '"]');
  const icono = item.querySelector('.cap-icono');
  item.classList.add('cap-revelada');
  icono.textContent = '✓';
  item.querySelector('.cap-texto').style.color = '#33402A';

  const detalle = document.getElementById('express-detalle');
  const detalles = [
    '<div style="font-size:0.85rem;line-height:1.6;padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><strong>node:http:</strong> programar if/else manual para cada URL y cada método.<br><strong>Express:</strong> una línea: <code>app.get(\'/usuarios\', fn)</code></div>',
    '<div style="font-size:0.85rem;line-height:1.6;padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><strong>node:http:</strong> capturar bytes fragmentados, unirlos y convertirlos a JSON manualmente.<br><strong>Express:</strong> una línea: <code>app.use(express.json())</code> y los datos están en <code>req.body</code></div>',
    '<div style="font-size:0.85rem;line-height:1.6;padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><strong>node:http:</strong> fijar statusCode, setHeader, end() todo a mano.<br><strong>Express:</strong> una línea: <code>res.json(datos)</code> (fija headers, status y cierra)</div>',
    '<div style="font-size:0.85rem;line-height:1.6;padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><strong>node:http:</strong> copiar y pegar la validación dentro de cada if/else.<br><strong>Express:</strong> <code>app.use(miMiddleware)</code> se ejecuta para todas las rutas automáticamente</div>'
  ];
  detalle.innerHTML = detalles[idx];
};

// --- Tarjeta: Servidor Express — comparar con node:http ---
window.compararServidor = function(tipo) {
  const btnNativo = document.getElementById('btn-nativo');
  const btnExpress = document.getElementById('btn-express');
  const codigo = document.getElementById('comparar-codigo');

  btnNativo.classList.toggle('simbolo-activo', tipo === 'nativo');
  btnNativo.classList.toggle('simbolo-inactivo', tipo !== 'nativo');
  btnExpress.classList.toggle('simbolo-activo', tipo === 'express');
  btnExpress.classList.toggle('simbolo-inactivo', tipo !== 'express');

  if (tipo === 'nativo') {
    codigo.innerHTML = '<span class="code-keyword">import</span> http <span class="code-keyword">from</span> <span class="code-string">\'node:http\'</span>;\n\n<span class="code-keyword">const</span> server = http.<span class="code-method">createServer</span>((req, res) => {\n  <span class="code-comment">// Tienes que verificar la URL manualmente</span>\n  <span class="code-keyword">if</span> (req.url === <span class="code-string">\'/\'</span> && req.method === <span class="code-string">\'GET\'</span>) {\n    res.statusCode = <span class="code-number">200</span>;\n    res.<span class="code-method">setHeader</span>(<span class="code-string">\'Content-Type\'</span>, <span class="code-string">\'text/plain\'</span>);\n    res.<span class="code-method">end</span>(<span class="code-string">\'Hola\'</span>);\n  }\n});\n\nserver.<span class="code-method">listen</span>(<span class="code-number">3000</span>);';
  } else {
    codigo.innerHTML = '<span class="code-keyword">import</span> express <span class="code-keyword">from</span> <span class="code-string">\'express\'</span>;\n\n<span class="code-keyword">const</span> app = <span class="code-method">express</span>();\n\n<span class="code-comment">// Express filtra método + URL automáticamente</span>\napp.<span class="code-method">get</span>(<span class="code-string">\'/\'</span>, (req, res) => {\n  res.<span class="code-method">send</span>(<span class="code-string">\'Hola\'</span>);\n});\n\napp.<span class="code-method">listen</span>(<span class="code-number">3000</span>);';
  }
};

// --- Tarjeta: Rutas — comparar params vs query ---
window.compararParams = function(tipo) {
  const btnParams = document.getElementById('btn-params');
  const btnQuery = document.getElementById('btn-query');
  const codigo = document.getElementById('params-codigo');
  const resultado = document.getElementById('params-resultado');

  btnParams.classList.toggle('simbolo-activo', tipo === 'params');
  btnParams.classList.toggle('simbolo-inactivo', tipo !== 'params');
  btnQuery.classList.toggle('simbolo-activo', tipo === 'query');
  btnQuery.classList.toggle('simbolo-inactivo', tipo !== 'query');

  if (tipo === 'params') {
    codigo.innerHTML = '<span class="code-comment">// Los :id en la ruta son variables (obligatorias)</span>\napp.<span class="code-method">get</span>(<span class="code-string">\'/productos/:id\'</span>, (req, res) => {\n  <span class="code-comment">// Express captura el valor que el cliente puso en esa posición</span>\n  <span class="code-keyword">const</span> id = req.params.id;\n  res.<span class="code-method">send</span>(<span class="code-string">`Producto con ID: ${id}`</span>);\n});';
    resultado.innerHTML = '<span class="code-comment">// Cliente visita: /productos/45</span>\n<span style="color:#A6C58C;">req.params → { id: \'45\' }</span>\n\n<span class="code-comment">// El valor siempre llega como string</span>\n<span class="code-comment">// Si necesitas un número, usa parseInt(req.params.id)</span>';
  } else {
    codigo.innerHTML = '<span class="code-comment">// La ruta es fija. Los filtros van después del ?</span>\napp.<span class="code-method">get</span>(<span class="code-string">\'/productos\'</span>, (req, res) => {\n  <span class="code-comment">// Express extrae los pares clave=valor del ? automáticamente</span>\n  <span class="code-keyword">const</span> color = req.query.color;\n  <span class="code-keyword">const</span> orden = req.query.orden;\n  res.<span class="code-method">send</span>(<span class="code-string">`Filtrando por ${color}, orden ${orden}`</span>);\n});';
    resultado.innerHTML = '<span class="code-comment">// Cliente visita: /productos?color=rojo&orden=precio</span>\n<span style="color:#A6C58C;">req.query → { color: \'rojo\', orden: \'precio\' }</span>\n\n<span class="code-comment">// Son opcionales: si el cliente no los envía, son undefined</span>';
  }
};

// --- Tarjeta: Middlewares — cadena paso a paso ---
window.avanzarCadena = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta: EJS — mostrar etiquetas ---
window.mostrarEjs = function(tipo) {
  const btnSalida = document.getElementById('btn-ejs-salida');
  const btnControl = document.getElementById('btn-ejs-control');
  const ejemplo = document.getElementById('ejs-ejemplo');

  btnSalida.classList.toggle('simbolo-activo', tipo === 'salida');
  btnSalida.classList.toggle('simbolo-inactivo', tipo !== 'salida');
  btnControl.classList.toggle('simbolo-activo', tipo === 'control');
  btnControl.classList.toggle('simbolo-inactivo', tipo !== 'control');

  if (tipo === 'salida') {
    ejemplo.innerHTML = '<p style="font-weight:600;margin-bottom:0.5rem;">Etiqueta de salida: <code>&lt;%= %&gt;</code></p><p style="font-size:0.85rem;margin-bottom:0.75rem;">Evalúa la expresión y la <strong>imprime</strong> en el HTML final.</p><pre class="bloque-codigo"><code><span class="code-comment">&lt;!-- En perfil.ejs (servidor) --&gt;</span>\n&lt;h1&gt;Bienvenido, <span style="color:#E6B980;">&lt;%= nombre %&gt;</span>&lt;/h1&gt;</code></pre><div class="consola-simulada mt-3"><div class="consola-header">HTML que recibe el navegador</div><pre style="margin:0;background:transparent;padding:0;font-size:inherit;line-height:inherit;"><span style="color:#A6C58C;">&lt;h1&gt;Bienvenido, Carlos&lt;/h1&gt;</span>\n\n<span class="code-comment">// El navegador nunca ve &lt;%= %&gt;</span>\n<span class="code-comment">// Solo recibe HTML puro con el dato ya insertado</span></pre></div>';
  } else {
    ejemplo.innerHTML = '<p style="font-weight:600;margin-bottom:0.5rem;">Etiqueta de control: <code>&lt;% %&gt;</code></p><p style="font-size:0.85rem;margin-bottom:0.75rem;">Ejecuta lógica (if, for) pero <strong>no imprime nada</strong> en el HTML.</p><pre class="bloque-codigo"><code><span class="code-comment">&lt;!-- En perfil.ejs (servidor) --&gt;</span>\n<span style="color:#E6B980;">&lt;% if (nombre) { %&gt;</span>\n  &lt;p&gt;Usuario autenticado&lt;/p&gt;\n<span style="color:#E6B980;">&lt;% } %&gt;</span></code></pre><div class="consola-simulada mt-3"><div class="consola-header">HTML que recibe el navegador</div><pre style="margin:0;background:transparent;padding:0;font-size:inherit;line-height:inherit;"><span style="color:#A6C58C;">&lt;p&gt;Usuario autenticado&lt;/p&gt;</span>\n\n<span class="code-comment">// El if desaparece completamente</span>\n<span class="code-comment">// Solo llega el HTML que la condición decidió incluir</span></pre></div>';
  }
};

// --- Tarjeta: Manejo de errores — flujo de orden ---
window.avanzarOrdenError = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Event Loop: flujo paso a paso ---
window.avanzarEventLoop = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Hilo principal vs Thread Pool ---
window.compararHilos = function(tipo) {
  const btnPrincipal = document.getElementById('btn-hilo-principal');
  const btnPool = document.getElementById('btn-thread-pool');
  const resultado = document.getElementById('hilos-resultado');

  btnPrincipal.classList.toggle('simbolo-activo', tipo === 'principal');
  btnPrincipal.classList.toggle('simbolo-inactivo', tipo !== 'principal');
  btnPool.classList.toggle('simbolo-activo', tipo === 'pool');
  btnPool.classList.toggle('simbolo-inactivo', tipo !== 'pool');

  if (tipo === 'principal') {
    resultado.innerHTML = '<div style="text-align:center;padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Hilo principal</p><p style="font-size:0.85rem;">Ejecuta todo tu código JavaScript y tus rutas de Express, <strong>de forma secuencial</strong>, una línea a la vez.</p><p style="font-size:0.8rem;opacity:0.7;margin-top:0.5rem;">Si aquí se bloquea algo, se bloquea toda la aplicación.</p></div>';
  } else {
    resultado.innerHTML = '<div style="text-align:center;padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Thread Pool</p><p style="font-size:0.85rem;">Hilos auxiliares (administrados por <strong>libuv</strong>) que corren en paralelo, fuera del hilo principal, para tareas pesadas como <code>crypto</code> o ciertas operaciones de <code>fs</code>.</p><p style="font-size:0.8rem;opacity:0.7;margin-top:0.5rem;">Al terminar, avisan al Event Loop para que ponga el callback en la cola.</p></div>';
  }
};

// --- Callback Hell: mostrar solución ---
window.mostrarSolucion = function(tipo) {
  const btnPromesas = document.getElementById('btn-promesas');
  const btnAsync = document.getElementById('btn-asyncawait');
  const codigo = document.getElementById('solucion-codigo');

  btnPromesas.classList.toggle('simbolo-activo', tipo === 'promesas');
  btnPromesas.classList.toggle('simbolo-inactivo', tipo !== 'promesas');
  btnAsync.classList.toggle('simbolo-activo', tipo === 'asyncawait');
  btnAsync.classList.toggle('simbolo-inactivo', tipo !== 'asyncawait');

  if (tipo === 'promesas') {
    codigo.innerHTML = '<span class="code-comment">// Cadena plana con .then(), un solo .catch() al final</span>\n<span class="code-method">buscarUsuario</span>(id)\n  .<span class="code-method">then</span>(usuario => <span class="code-method">obtenerPermisos</span>(usuario.rol))\n  .<span class="code-method">then</span>(permisos => <span class="code-method">consultarHistorial</span>(id))\n  .<span class="code-method">then</span>(historial => <span class="code-method">guardarLog</span>(id))\n  .<span class="code-method">then</span>(() => console.<span class="code-method">log</span>(<span class="code-string">\'Listo\'</span>))\n  .<span class="code-method">catch</span>(err => <span class="code-method">manejarError</span>(err));';
  } else {
    codigo.innerHTML = '<span class="code-comment">// Se lee como código síncrono normal</span>\n<span class="code-keyword">async function</span> <span class="code-method">procesar</span>(id) {\n  <span class="code-keyword">try</span> {\n    <span class="code-keyword">const</span> usuario = <span class="code-keyword">await</span> <span class="code-method">buscarUsuario</span>(id);\n    <span class="code-keyword">const</span> permisos = <span class="code-keyword">await</span> <span class="code-method">obtenerPermisos</span>(usuario.rol);\n    <span class="code-keyword">const</span> historial = <span class="code-keyword">await</span> <span class="code-method">consultarHistorial</span>(id);\n    <span class="code-keyword">await</span> <span class="code-method">guardarLog</span>(id);\n    console.<span class="code-method">log</span>(<span class="code-string">\'Listo\'</span>);\n  } <span class="code-keyword">catch</span> (err) {\n    <span class="code-method">manejarError</span>(err);\n  }\n}';
  }
};

// --- Partials, layouts, helpers ---
window.mostrarPlantilla = function(tipo) {
  const btns = document.querySelectorAll('[data-plantilla]');
  const desc = document.getElementById('plantilla-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-plantilla="' + tipo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    partial: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Partial</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">Un fragmento de HTML reutilizable. Se guarda una sola vez y se inserta donde se necesite.</p><p style="font-size:0.8rem;opacity:0.7;">Ejemplos típicos: <code>header.hbs</code>, <code>footer.hbs</code></p></div>',
    layout: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Layout</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">La estructura completa del documento (&lt;html&gt;, &lt;head&gt;, enlaces a CSS). Cada vista se inyecta automáticamente dentro de él.</p><p style="font-size:0.8rem;opacity:0.7;">Evita repetir el esqueleto HTML en cada página.</p></div>',
    helper: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Helper</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">Una función de JavaScript que registras en el motor de plantillas para llamarla directamente desde el HTML de la vista.</p><p style="font-size:0.8rem;opacity:0.7;">Ejemplo: una función que convierte texto a mayúsculas antes de mostrarlo.</p></div>'
  };

  desc.innerHTML = datos[tipo];
};

// --- Joi: probar validación ---
window.probarJoi = function(caso) {
  const resultado = document.getElementById('joi-resultado');

  const casos = [
    { valido: true, mensaje: 'Válido. Todos los campos cumplen las reglas: nombre tiene al menos 2 caracteres, email tiene formato válido, edad es un número entero ≥ 18.', status: '201 Created' },
    { valido: false, mensaje: 'Rechazado. El campo "email" no tiene formato de correo válido (falta el @ y dominio esperado por .email()).', status: '400 Bad Request' },
    { valido: false, mensaje: 'Rechazado. El campo "edad" es 15, pero el schema exige .min(18).', status: '400 Bad Request' }
  ];

  const c = casos[caso];
  const color = c.valido ? '#339933' : '#DC6B6B';
  const bg = c.valido ? 'rgba(51,153,51,0.08)' : 'rgba(220,107,107,0.08)';

  resultado.innerHTML = '<div style="border-left:3px solid ' + color + ';padding:0.75rem 1rem;background:' + bg + ';border-radius:0 0.5rem 0.5rem 0;"><p style="font-weight:700;color:' + color + ';margin-bottom:0.35rem;">' + c.status + '</p><p style="font-size:0.85rem;">' + c.mensaje + '</p></div>';
};

// --- axios vs fetch ---
window.compararAxios = function(tipo) {
  const btnFetch = document.getElementById('btn-fetch');
  const btnAxios = document.getElementById('btn-axios');
  const codigo = document.getElementById('axios-codigo');

  btnFetch.classList.toggle('simbolo-activo', tipo === 'fetch');
  btnFetch.classList.toggle('simbolo-inactivo', tipo !== 'fetch');
  btnAxios.classList.toggle('simbolo-activo', tipo === 'axios');
  btnAxios.classList.toggle('simbolo-inactivo', tipo !== 'axios');

  if (tipo === 'fetch') {
    codigo.innerHTML = '<span class="code-keyword">const</span> response = <span class="code-keyword">await</span> <span class="code-method">fetch</span>(url);\n\n<span class="code-comment">// fetch NO revisa el código de estado por ti</span>\n<span class="code-keyword">if</span> (!response.ok) {\n  <span class="code-comment">// tienes que verificarlo manualmente</span>\n  <span class="code-keyword">throw new</span> Error(<span class="code-string">\'Algo falló\'</span>);\n}\n\n<span class="code-comment">// segundo paso obligatorio para obtener los datos</span>\n<span class="code-keyword">const</span> datos = <span class="code-keyword">await</span> response.<span class="code-method">json</span>();';
  } else {
    codigo.innerHTML = '<span class="code-keyword">const</span> response = <span class="code-keyword">await</span> axios.<span class="code-method">get</span>(url);\n\n<span class="code-comment">// Si el código NO es 2xx, la promesa se rechaza sola</span>\n<span class="code-comment">// (cae directo al catch, sin código extra)</span>\n\n<span class="code-comment">// Los datos ya vienen parseados, listos para usar</span>\n<span class="code-keyword">const</span> datos = response.data;';
  }
};

// --- Tarjeta 2: writeFileSync / readFileSync ---
window.mostrarFsMetodo = function(metodo) {
  const btnWrite = document.getElementById('btn-write');
  const btnRead = document.getElementById('btn-read');
  const desc = document.getElementById('fs-metodo-desc');

  btnWrite.classList.toggle('simbolo-activo', metodo === 'write');
  btnWrite.classList.toggle('simbolo-inactivo', metodo !== 'write');
  btnRead.classList.toggle('simbolo-activo', metodo === 'read');
  btnRead.classList.toggle('simbolo-inactivo', metodo !== 'read');

  if (metodo === 'write') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;line-height:1.6;"><p style="font-weight:700;margin-bottom:0.5rem;font-family:\'JetBrains Mono\',monospace;">fs.writeFileSync(path, data, options)</p><ul style="padding-left:1.1rem;list-style:disc;"><li><code>path</code>: la ruta donde se crea o sobrescribe el archivo</li><li><code>data</code>: el texto a guardar (normalmente el resultado de JSON.stringify)</li><li><code>options</code>: la codificación, típicamente \'utf8\'</li></ul><p style="margin-top:0.5rem;opacity:0.7;">Devuelve <code>undefined</code>. Si el archivo no existe, lo crea. Si existe, reemplaza TODO su contenido.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;line-height:1.6;"><p style="font-weight:700;margin-bottom:0.5rem;font-family:\'JetBrains Mono\',monospace;">fs.readFileSync(path, options)</p><ul style="padding-left:1.1rem;list-style:disc;"><li><code>path</code>: la ruta del archivo a leer</li><li><code>options</code>: \'utf8\' para obtener texto legible</li></ul><p style="margin-top:0.5rem;opacity:0.7;">Sin \'utf8\', devuelve un <strong>Buffer</strong> (datos binarios), no texto. Con \'utf8\', devuelve un <strong>string</strong> que hay que pasar por JSON.parse() para volver a tener un objeto.</p></div>';
  }
};

// --- Tarjeta 3: ciclo CRUD ---
window.avanzarCicloCrud = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta 3: las 4 operaciones CRUD ---
window.mostrarCrudArchivo = function(op) {
  const btns = document.querySelectorAll('[data-crud]');
  const codigo = document.getElementById('crud-archivo-codigo');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-crud="' + op + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const codigos = {
    create: '<span class="code-keyword">const</span> usuarios = <span class="code-method">obtenerDatos</span>();\n<span class="code-keyword">const</span> nuevo = { id: <span class="code-number">3</span>, nombre: <span class="code-string">\'Laura\'</span> };\n\nusuarios.<span class="code-method">push</span>(nuevo);        <span class="code-comment">// modificación en memoria</span>\n<span class="code-method">guardarDatos</span>(usuarios);  <span class="code-comment">// escritura en disco</span>',
    read: '<span class="code-keyword">const</span> usuarios = <span class="code-method">obtenerDatos</span>();\n<span class="code-keyword">const</span> encontrado = usuarios.<span class="code-method">find</span>(u => u.id === <span class="code-number">3</span>);\n\n<span class="code-comment">// encontrado = el objeto, o undefined si no existe</span>\n<span class="code-comment">// find() no modifica el archivo, solo busca</span>',
    update: '<span class="code-keyword">const</span> usuarios = <span class="code-method">obtenerDatos</span>();\n<span class="code-keyword">const</span> aEditar = usuarios.<span class="code-method">find</span>(u => u.id === <span class="code-number">3</span>);\n\n<span class="code-keyword">if</span> (aEditar) {\n  aEditar.rol = <span class="code-string">\'diseñadora\'</span>;  <span class="code-comment">// modifica por referencia</span>\n  <span class="code-method">guardarDatos</span>(usuarios);   <span class="code-comment">// guarda el arreglo completo</span>\n}',
    delete: '<span class="code-keyword">const</span> usuarios = <span class="code-method">obtenerDatos</span>();\n\n<span class="code-comment">// filter crea un arreglo NUEVO sin el id buscado</span>\n<span class="code-keyword">const</span> filtrados = usuarios.<span class="code-method">filter</span>(u => u.id !== <span class="code-number">3</span>);\n\n<span class="code-method">guardarDatos</span>(filtrados);  <span class="code-comment">// sobrescribe con el arreglo limpio</span>'
  };

  codigo.innerHTML = codigos[op];
};

// --- Tarjeta 4: unlinkSync vs appendFileSync ---
window.mostrarUnlinkAppend = function(metodo) {
  const btns = document.querySelectorAll('[data-metodo2]');
  const desc = document.getElementById('unlink-append-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-metodo2="' + metodo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  if (metodo === 'unlink') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;line-height:1.6;"><p style="font-weight:700;margin-bottom:0.5rem;">fs.unlinkSync(path)</p><p>Elimina el archivo <strong>de forma permanente e irreversible</strong> del disco.</p><p style="margin-top:0.5rem;opacity:0.7;">Siempre verifica con fs.existsSync() antes, o lanzará ENOENT si el archivo ya no existe.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;line-height:1.6;"><p style="font-weight:700;margin-bottom:0.5rem;">fs.appendFileSync(path, data)</p><p>Agrega texto <strong>al final</strong> del archivo, sin borrar lo que ya había. Si el archivo no existe, lo crea.</p><p style="margin-top:0.5rem;opacity:0.7;">Es la base de los sistemas de logs: cada evento nuevo se suma, nunca reemplaza al anterior.</p></div>';
  }
};

// --- Tarjeta 6: sync vs async en un servidor ---
window.compararSyncServidor = function(tipo) {
  const btnSync = document.getElementById('btn-sync-servidor');
  const btnAsync = document.getElementById('btn-async-servidor');
  const resultado = document.getElementById('sync-servidor-resultado');

  btnSync.classList.toggle('simbolo-activo', tipo === 'sync');
  btnSync.classList.toggle('simbolo-inactivo', tipo !== 'sync');
  btnAsync.classList.toggle('simbolo-activo', tipo === 'async');
  btnAsync.classList.toggle('simbolo-inactivo', tipo !== 'async');

  if (tipo === 'sync') {
    resultado.innerHTML = '<div style="padding:1rem;background:rgba(220,107,107,0.06);border-radius:0.5rem;border:1px solid rgba(220,107,107,0.2);font-size:0.85rem;line-height:1.7;"><p>1. Cliente A pide un archivo de 50MB con <code>readFileSync</code></p><p>2. El Event Loop se <strong style="color:#DC6B6B;">congela por completo</strong> hasta que termine</p><p>3. Clientes B, C y D llegan mientras tanto</p><p style="margin-top:0.5rem;color:#8B3A3A;font-weight:600;">→ B, C y D esperan en cola. Sufren latencia extrema o timeout.</p></div>';
  } else {
    resultado.innerHTML = '<div style="padding:1rem;background:rgba(51,153,51,0.06);border-radius:0.5rem;border:1px solid rgba(51,153,51,0.2);font-size:0.85rem;line-height:1.7;"><p>1. Cliente A pide el mismo archivo con <code>await fs.promises.readFile()</code></p><p>2. Node delega la lectura al <strong>Worker Pool</strong> (libuv) y el Event Loop queda libre</p><p>3. Clientes B, C y D llegan mientras tanto</p><p style="margin-top:0.5rem;color:#2D5A1E;font-weight:600;">→ B, C y D se atienden de inmediato. Cuando el disco termina, A recibe su respuesta.</p></div>';
  }
};

// --- Tarjeta 6: comparar sintaxis sync vs fs.promises ---
window.compararCodigoFs = function(tipo) {
  const btnSync = document.getElementById('btn-codigo-sync');
  const btnAsync = document.getElementById('btn-codigo-async');
  const codigo = document.getElementById('fs-comparar-codigo');

  btnSync.classList.toggle('simbolo-activo', tipo === 'sync');
  btnSync.classList.toggle('simbolo-inactivo', tipo !== 'sync');
  btnAsync.classList.toggle('simbolo-activo', tipo === 'async');
  btnAsync.classList.toggle('simbolo-inactivo', tipo !== 'async');

  if (tipo === 'sync') {
    codigo.innerHTML = '<span class="code-keyword">import</span> fs <span class="code-keyword">from</span> <span class="code-string">\'node:fs\'</span>;\n\n<span class="code-keyword">try</span> {\n  <span class="code-comment">// El hilo se congela aquí hasta terminar de leer</span>\n  <span class="code-keyword">const</span> texto = fs.<span class="code-method">readFileSync</span>(<span class="code-string">\'./config.json\'</span>, <span class="code-string">\'utf8\'</span>);\n  <span class="code-keyword">const</span> config = JSON.<span class="code-method">parse</span>(texto);\n  console.<span class="code-method">log</span>(config);\n} <span class="code-keyword">catch</span> (error) {\n  console.<span class="code-method">error</span>(error.message);\n}';
  } else {
    codigo.innerHTML = '<span class="code-keyword">import</span> fs <span class="code-keyword">from</span> <span class="code-string">\'node:fs/promises\'</span>;\n\n<span class="code-keyword">async function</span> <span class="code-method">cargarConfig</span>() {\n  <span class="code-keyword">try</span> {\n    <span class="code-comment">// El hilo queda libre mientras el disco trabaja</span>\n    <span class="code-keyword">const</span> texto = <span class="code-keyword">await</span> fs.<span class="code-method">readFile</span>(<span class="code-string">\'./config.json\'</span>, <span class="code-string">\'utf8\'</span>);\n    <span class="code-keyword">const</span> config = JSON.<span class="code-method">parse</span>(texto);\n    console.<span class="code-method">log</span>(config);\n  } <span class="code-keyword">catch</span> (error) {\n    console.<span class="code-method">error</span>(error.message);\n  }\n}\n\n<span class="code-method">cargarConfig</span>();';
  }
};

// --- Tarjeta 1: Client vs Pool ---
window.compararClientPool = function(tipo) {
  const btnClient = document.getElementById('btn-client');
  const btnPool = document.getElementById('btn-pool');
  const resultado = document.getElementById('client-pool-resultado');

  btnClient.classList.toggle('simbolo-activo', tipo === 'client');
  btnClient.classList.toggle('simbolo-inactivo', tipo !== 'client');
  btnPool.classList.toggle('simbolo-activo', tipo === 'pool');
  btnPool.classList.toggle('simbolo-inactivo', tipo !== 'pool');

  if (tipo === 'client') {
    resultado.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Client</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">Un único canal de conexión. Abres con <code>.connect()</code>, consultas, cierras con <code>.end()</code>.</p><p style="font-size:0.8rem;color:#8B3A3A;">Problema: crear y destruir una conexión TCP en cada petición HTTP es costoso. Además, no atiende peticiones en paralelo.</p></div>';
  } else {
    resultado.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.5rem;">Pool</p><p style="font-size:0.85rem;margin-bottom:0.5rem;">Mantiene varias conexiones activas. Cada consulta toma prestado un cliente y lo devuelve al terminar.</p><p style="font-size:0.8rem;color:#2D5A1E;">Ventaja: evita el costo de crear conexiones nuevas constantemente, y limita cuántas conexiones simultáneas se abren.</p></div>';
  }
};

// --- Tarjeta 2: propiedades del objeto Result ---
window.mostrarResultProp = function(prop) {
  const btns = document.querySelectorAll('[data-result]');
  const desc = document.getElementById('result-prop-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-result="' + prop + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    rows: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;font-family:\'JetBrains Mono\',monospace;">result.rows</p><p>Un arreglo de objetos. Cada objeto es una fila, y sus propiedades son los nombres de las columnas que pediste en el SELECT.</p></div>',
    rowCount: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;font-family:\'JetBrains Mono\',monospace;">result.rowCount</p><p>Un número: cuántas filas devolvió el SELECT, o cuántas se modificaron con INSERT/UPDATE/DELETE.</p></div>',
    fields: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;font-family:\'JetBrains Mono\',monospace;">result.fields</p><p>Metadatos de las columnas: nombre, tipo de dato en PostgreSQL, etc. Se usa poco en el día a día.</p></div>'
  };

  desc.innerHTML = datos[prop];
};

// --- Tarjeta 3: comparar concatenación vs parametrizada ---
window.compararInjection = function(tipo) {
  const btnVuln = document.getElementById('btn-vulnerable');
  const btnSeg = document.getElementById('btn-segura');
  const codigo = document.getElementById('injection-codigo');
  const resultado = document.getElementById('injection-resultado');

  btnVuln.classList.toggle('simbolo-activo', tipo === 'vulnerable');
  btnVuln.classList.toggle('simbolo-inactivo', tipo !== 'vulnerable');
  btnSeg.classList.toggle('simbolo-activo', tipo === 'segura');
  btnSeg.classList.toggle('simbolo-inactivo', tipo !== 'segura');

  if (tipo === 'vulnerable') {
    codigo.innerHTML = '<span class="code-comment">// El valor se concatena directo dentro del SQL</span>\n<span class="code-keyword">const</span> query = \'SELECT * FROM usuarios WHERE email = \\\'\' + email + \'\\\'\';\n<span class="code-keyword">const</span> resultado = <span class="code-keyword">await</span> pool.<span class="code-method">query</span>(query);';
    resultado.innerHTML = '<div style="padding:0.75rem 1rem;background:rgba(220,107,107,0.08);border-left:3px solid #DC6B6B;border-radius:0 0.5rem 0.5rem 0;font-size:0.85rem;">Si alguien escribe <code>x@test.com\' OR \'1\'=\'1</code> como email, la consulta final se vuelve: <code>WHERE email = \'x@test.com\' OR \'1\'=\'1\'</code>. Eso es siempre verdadero: <strong>devuelve TODOS los usuarios</strong>.</div>';
  } else {
    codigo.innerHTML = '<span class="code-comment">// El valor viaja separado, nunca se mezcla con el SQL</span>\n<span class="code-keyword">const</span> query = \'SELECT * FROM usuarios WHERE email = $1\';\n<span class="code-keyword">const</span> resultado = <span class="code-keyword">await</span> pool.<span class="code-method">query</span>(query, [email]);';
    resultado.innerHTML = '<div style="padding:0.75rem 1rem;background:rgba(51,153,51,0.08);border-left:3px solid #339933;border-radius:0 0.5rem 0.5rem 0;font-size:0.85rem;">Aunque alguien escriba <code>x@test.com\' OR \'1\'=\'1</code>, PostgreSQL lo trata como <strong>un solo valor literal</strong>. Busca ese texto exacto como email y no encuentra nada.</div>';
  }
};

// --- Tarjeta 4: INSERT, UPDATE, DELETE ---
window.mostrarSqlOp = function(op) {
  const btns = document.querySelectorAll('[data-sql]');
  const codigo = document.getElementById('sql-op-codigo');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-sql="' + op + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const codigos = {
    insert: '<span class="code-keyword">const</span> query = \'INSERT INTO tokens_sesion (token, expiracion) VALUES ($1, $2)\';\n<span class="code-keyword">const</span> valores = [\'token_abc123\', \'2026-09-04 23:59:59\'];\n\n<span class="code-keyword">await</span> pool.<span class="code-method">query</span>(query, valores);',
    update: '<span class="code-comment">// Siempre con WHERE, o se actualizan TODOS los registros</span>\n<span class="code-keyword">const</span> query = \'UPDATE tokens_sesion SET activo = $1 WHERE id = $2\';\n<span class="code-keyword">const</span> valores = [<span class="code-keyword">false</span>, <span class="code-number">45</span>];\n\n<span class="code-keyword">await</span> pool.<span class="code-method">query</span>(query, valores);',
    delete: '<span class="code-keyword">const</span> query = \'DELETE FROM tokens_sesion WHERE id = $1\';\n\n<span class="code-keyword">await</span> pool.<span class="code-method">query</span>(query, [<span class="code-number">45</span>]);'
  };

  codigo.innerHTML = codigos[op];
};

// --- Tarjeta 5: ACID ---
window.mostrarAcid = function(letra) {
  const btns = document.querySelectorAll('[data-acid]');
  const desc = document.getElementById('acid-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-acid="' + letra + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    a: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.4rem;">Atomicidad</p><p style="font-size:0.85rem;">O se aplican todas las consultas del bloque, o no se aplica ninguna. Todo o nada.</p></div>',
    c: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.4rem;">Consistencia</p><p style="font-size:0.85rem;">La transacción solo lleva la base de datos de un estado válido a otro, respetando todas las reglas del esquema.</p></div>',
    i: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.4rem;">Aislamiento</p><p style="font-size:0.85rem;">Una transacción en curso no interfiere ni es visible para otras transacciones que corren al mismo tiempo.</p></div>',
    d: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);"><p style="font-weight:700;margin-bottom:0.4rem;">Durabilidad</p><p style="font-size:0.85rem;">Una vez confirmada (COMMIT), los cambios sobreviven incluso si el servidor se cae justo después.</p></div>'
  };

  desc.innerHTML = datos[letra];
};

// --- Tarjeta 5: flujo de transacción ---
window.avanzarTransaccion = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta 6: backoff progresivo ---
window.mostrarBackoff = function(intento) {
  const resultado = document.getElementById('backoff-resultado');
  const tiempos = { 1: '1 segundo', 2: '2 segundos', 3: '4 segundos', 4: '8 segundos' };
  const colores = { 1: '#E6B980', 2: '#E6B980', 3: '#DC6B6B', 4: '#DC6B6B' };

  resultado.innerHTML = '<span style="color:' + colores[intento] + ';">Intento ' + intento + ' falla → se espera ' + tiempos[intento] + ' antes del siguiente</span>';
};

// --- Tarjeta 1: pg puro vs Sequelize ---
window.compararOrm = function(tipo) {
  const btnPg = document.getElementById('btn-pg');
  const btnSeq = document.getElementById('btn-sequelize');
  const codigo = document.getElementById('orm-codigo');

  btnPg.classList.toggle('simbolo-activo', tipo === 'pg');
  btnPg.classList.toggle('simbolo-inactivo', tipo !== 'pg');
  btnSeq.classList.toggle('simbolo-activo', tipo === 'sequelize');
  btnSeq.classList.toggle('simbolo-inactivo', tipo !== 'sequelize');

  if (tipo === 'pg') {
    codigo.innerHTML = '<span class="code-keyword">const</span> query = \'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *\';\n<span class="code-keyword">const</span> res = <span class="code-keyword">await</span> pool.<span class="code-method">query</span>(query, [\'Luis\', \'luis@example.com\']);\n<span class="code-keyword">const</span> nuevoUsuario = res.rows;';
  } else {
    codigo.innerHTML = '<span class="code-keyword">const</span> nuevoUsuario = <span class="code-keyword">await</span> Usuario.<span class="code-method">create</span>({\n  nombre: \'Luis\',\n  email: \'luis@example.com\'\n});\n\n<span class="code-comment">// Sequelize genera el SQL parametrizado por ti</span>';
  }
};

// --- Tarjeta 2: conceptos de clases ---
window.mostrarConceptoClase = function(concepto) {
  const btns = document.querySelectorAll('[data-clase]');
  const desc = document.getElementById('clase-concepto-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-clase="' + concepto + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    class: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">class</p><p>Una plantilla que define qué propiedades y métodos tendrá un objeto. No es un objeto en sí, es el plano para crearlos.</p></div>',
    constructor: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">constructor</p><p>Se ejecuta una sola vez al crear el objeto con new. Recibe parámetros iniciales y los asigna como propiedades.</p></div>',
    extends: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">extends</p><p>Permite que una clase hija herede propiedades y métodos de una clase padre, sin duplicar código.</p></div>',
    super: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">super()</p><p>Llama al constructor de la clase padre. Debe ser la primera línea del constructor de la clase hija.</p></div>'
  };

  desc.innerHTML = datos[concepto];
};

// --- Tarjeta 3: define() vs class+init() ---
window.compararDefinicionModelo = function(forma) {
  const btnDefine = document.getElementById('btn-define');
  const btnInit = document.getElementById('btn-init');
  const desc = document.getElementById('definicion-modelo-desc');

  btnDefine.classList.toggle('simbolo-activo', forma === 'define');
  btnDefine.classList.toggle('simbolo-inactivo', forma !== 'define');
  btnInit.classList.toggle('simbolo-activo', forma === 'init');
  btnInit.classList.toggle('simbolo-inactivo', forma !== 'init');

  if (forma === 'define') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">sequelize.define(nombre, atributos)</p><p>Enfoque funcional: Sequelize crea la clase por ti automáticamente.</p><p style="margin-top:0.4rem;opacity:0.7;">Ideal para: prototipos rápidos, proyectos pequeños, sin lógica de negocio compleja.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">class X extends Model + X.init()</p><p>Enfoque orientado a objetos: tú defines la clase, y la enlazas con init().</p><p style="margin-top:0.4rem;opacity:0.7;">Ideal para: proyectos medianos/grandes, cuando necesitas métodos personalizados, getters, setters.</p></div>';
  }
};

// --- Tarjeta 4: CRUD con Sequelize + SQL generado ---
window.mostrarCrudSequelize = function(metodo) {
  const btns = document.querySelectorAll('[data-crud2]');
  const codigo = document.getElementById('crud-sequelize-codigo');
  const sql = document.getElementById('crud-sequelize-sql');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-crud2="' + metodo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    create: {
      codigo: '<span class="code-keyword">const</span> nuevo = <span class="code-keyword">await</span> Usuario.<span class="code-method">create</span>({\n  nombre: \'Elena\',\n  email: \'elena@correo.com\'\n});',
      sql: '<span style="color:#A6C58C;">INSERT INTO usuarios (nombre, email, "createdAt", "updatedAt")\nVALUES ($1, $2, $3, $4) RETURNING *;</span>'
    },
    findAll: {
      codigo: '<span class="code-keyword">const</span> usuarios = <span class="code-keyword">await</span> Usuario.<span class="code-method">findAll</span>();',
      sql: '<span style="color:#A6C58C;">SELECT id, nombre, email, "createdAt", "updatedAt" FROM usuarios;</span>'
    },
    findByPk: {
      codigo: '<span class="code-keyword">const</span> usuario = <span class="code-keyword">await</span> Usuario.<span class="code-method">findByPk</span>(<span class="code-number">1</span>);',
      sql: '<span style="color:#A6C58C;">SELECT id, nombre, email, "createdAt", "updatedAt"\nFROM usuarios WHERE id = $1;</span>'
    },
    update: {
      codigo: '<span class="code-keyword">const</span> [filasAfectadas] = <span class="code-keyword">await</span> Usuario.<span class="code-method">update</span>(\n  { nombre: \'Elena Sofía\' },\n  { where: { id: <span class="code-number">1</span> } }\n);',
      sql: '<span style="color:#A6C58C;">UPDATE usuarios SET nombre = $1, "updatedAt" = $2 WHERE id = $3;</span>'
    },
    destroy: {
      codigo: '<span class="code-keyword">const</span> filasEliminadas = <span class="code-keyword">await</span> Usuario.<span class="code-method">destroy</span>({\n  where: { id: <span class="code-number">1</span> }\n});',
      sql: '<span style="color:#A6C58C;">DELETE FROM usuarios WHERE id = $1;</span>'
    }
  };

  codigo.innerHTML = datos[metodo].codigo;
  sql.innerHTML = datos[metodo].sql;
};

// --- Tarjeta 5: hasOne, hasMany, belongsTo ---
window.mostrarRelacion = function(tipo) {
  const btns = document.querySelectorAll('[data-rel]');
  const desc = document.getElementById('relacion-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-rel="' + tipo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    hasOne: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">hasOne</p><p>Relación 1:1. Se declara en el modelo padre para indicar que el modelo hijo contiene la referencia.</p></div>',
    hasMany: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">hasMany</p><p>Relación 1:N. Se declara en el modelo padre para indicar que puede tener múltiples registros asociados.</p></div>',
    belongsTo: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">belongsTo</p><p>Se declara en el modelo hijo para establecer el enlace de retorno hacia el padre. Aquí vive la clave foránea.</p></div>'
  };

  desc.innerHTML = datos[tipo];
};

// --- Tarjeta 6: métodos autogenerados ---
window.mostrarMetodoAuto = function(metodo) {
  const btns = document.querySelectorAll('[data-metodoauto]');
  const desc = document.getElementById('metodo-auto-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-metodoauto="' + metodo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    add: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">addCurso()</p><p>Inserta una fila nueva en la tabla intermedia para asociar la instancia actual con el registro dado.</p></div>',
    get: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">getCursos()</p><p>Consulta y devuelve todos los registros relacionados a través de la tabla intermedia.</p></div>',
    remove: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">removeCurso()</p><p>Elimina la fila de la tabla intermedia que conecta ambas instancias, sin borrar los registros originales.</p></div>'
  };

  desc.innerHTML = datos[metodo];
};

// --- Tarjeta 1: los 5 principios de REST ---
window.mostrarPrincipioRest = function(principio) {
  const btns = document.querySelectorAll('[data-rest]');
  const desc = document.getElementById('principio-rest-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-rest="' + principio + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    cliente: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Cliente-Servidor</p><p>Separación total: el cliente (interfaz) y el servidor (lógica y datos) evolucionan de forma independiente. React o Flutter pueden consumir el mismo backend Express sin que este sepa cómo se ve la pantalla.</p></div>',
    stateless: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Stateless</p><p>El servidor no recuerda nada entre peticiones. Cada petición trae toda la información necesaria (como un token JWT). Esto permite escalar a múltiples servidores sin problemas.</p></div>',
    cache: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Cacheable</p><p>Las respuestas se marcan explícitamente como cacheables o no (Cache-Control). Esto permite reutilizar respuestas sin repetir el viaje completo al servidor.</p></div>',
    uniforme: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Interfaz Uniforme</p><p>Todas las rutas siguen el mismo patrón predecible: mismos verbos HTTP, mismas convenciones de URL, mismos códigos de estado. Es el principio más crítico de REST.</p></div>',
    capas: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Sistema de Capas</p><p>El cliente no sabe (ni necesita saber) si habla directo con tu servidor o si hay un balanceador, un proxy o un firewall en el medio.</p></div>'
  };

  desc.innerHTML = datos[principio];
};

// --- Tarjeta 2: versionamiento URL vs Header ---
window.compararVersionamiento = function(tipo) {
  const btnUrl = document.getElementById('btn-version-url');
  const btnHeader = document.getElementById('btn-version-header');
  const desc = document.getElementById('version-comparar-desc');

  btnUrl.classList.toggle('simbolo-activo', tipo === 'url');
  btnUrl.classList.toggle('simbolo-inactivo', tipo !== 'url');
  btnHeader.classList.toggle('simbolo-activo', tipo === 'header');
  btnHeader.classList.toggle('simbolo-inactivo', tipo !== 'header');

  if (tipo === 'url') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;font-family:\'JetBrains Mono\',monospace;">/api/v1/usuarios</p><p style="color:#2D5A1E;margin-bottom:0.3rem;">✓ Fácil de implementar con express.Router()</p><p style="color:#2D5A1E;margin-bottom:0.3rem;">✓ Fácil de cachear (ruta física única por versión)</p><p style="color:#8B3A3A;">✗ Trata el mismo recurso como dos URIs distintas</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;font-family:\'JetBrains Mono\',monospace;">/api/usuarios + header Accept</p><p style="color:#2D5A1E;margin-bottom:0.3rem;">✓ Más fiel a la teoría pura de REST</p><p style="color:#8B3A3A;margin-bottom:0.3rem;">✗ Más complejo de implementar (middleware de interceptación)</p><p style="color:#8B3A3A;">✗ No se puede probar cambiando solo la barra de direcciones</p></div>';
  }
};

// --- Tarjeta 3: query params por caso de uso ---
window.mostrarQueryParam = function(caso) {
  const btns = document.querySelectorAll('[data-qp]');
  const desc = document.getElementById('query-param-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-qp="' + caso + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    filtrado: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>GET /servidores?estado=activo</code><p style="margin-top:0.4rem;opacity:0.7;">→ WHERE estado = \'activo\'</p></div>',
    busqueda: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>GET /usuarios?buscar=Andres</code><p style="margin-top:0.4rem;opacity:0.7;">→ búsqueda de texto en uno o varios campos</p></div>',
    orden: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>GET /logs?ordenarPor=fecha&orden=desc</code><p style="margin-top:0.4rem;opacity:0.7;">→ ORDER BY fecha DESC</p></div>',
    paginacion: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>GET /productos?pagina=2&limite=50</code><p style="margin-top:0.4rem;opacity:0.7;">→ LIMIT 50 OFFSET 50</p></div>'
  };

  desc.innerHTML = datos[caso];
};

// --- Tarjeta 4: routes vs controllers ---
window.compararRoutesControllers = function(tipo) {
  const btnRoutes = document.getElementById('btn-routes');
  const btnControllers = document.getElementById('btn-controllers');
  const desc = document.getElementById('routes-controllers-desc');

  btnRoutes.classList.toggle('simbolo-activo', tipo === 'routes');
  btnRoutes.classList.toggle('simbolo-inactivo', tipo !== 'routes');
  btnControllers.classList.toggle('simbolo-activo', tipo === 'controllers');
  btnControllers.classList.toggle('simbolo-inactivo', tipo !== 'controllers');

  if (tipo === 'routes') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">/routes</p><p>El mapa de la aplicación. Declara qué URLs existen, qué verbo HTTP las gobierna, y hacia qué controlador dirigir la petición.</p><p style="margin-top:0.4rem;opacity:0.7;">No sabe nada de la base de datos ni de la lógica de negocio.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">/controllers</p><p>Donde vive la lógica real: recibe req y res, consulta la base de datos, maneja errores y construye la respuesta JSON final.</p></div>';
  }
};

// --- Tarjeta 5: 400 vs 422 ---
window.comparar400422 = function(codigo) {
  const btn400 = document.getElementById('btn-400');
  const btn422 = document.getElementById('btn-422');
  const desc = document.getElementById('comparar-400-422-desc');

  btn400.classList.toggle('simbolo-activo', codigo === '400');
  btn400.classList.toggle('simbolo-inactivo', codigo !== '400');
  btn422.classList.toggle('simbolo-activo', codigo === '422');
  btn422.classList.toggle('simbolo-inactivo', codigo !== '422');

  if (codigo === '400') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">400 Bad Request</p><p>Error <strong>sintáctico</strong>. El servidor ni siquiera puede interpretar la petición: un JSON malformado, cabeceras corruptas.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">422 Unprocessable Entity</p><p>Error <strong>semántico</strong>. El JSON se parseó perfecto, pero los valores no cumplen las reglas de negocio (edad negativa, email vacío).</p></div>';
  }
};

// --- Tarjeta 5: respuesta estandarizada exito/error ---
window.mostrarRespuestaEstandar = function(tipo) {
  const btnExito = document.getElementById('btn-resp-exito');
  const btnError = document.getElementById('btn-resp-error');
  const codigo = document.getElementById('respuesta-estandar-codigo');

  btnExito.classList.toggle('simbolo-activo', tipo === 'exito');
  btnExito.classList.toggle('simbolo-inactivo', tipo !== 'exito');
  btnError.classList.toggle('simbolo-activo', tipo === 'error');
  btnError.classList.toggle('simbolo-inactivo', tipo !== 'error');

  if (tipo === 'exito') {
    codigo.innerHTML = '{\n  <span class="code-string">"status"</span>: <span class="code-string">"success"</span>,\n  <span class="code-string">"code"</span>: <span class="code-number">201</span>,\n  <span class="code-string">"data"</span>: { <span class="code-string">"id"</span>: <span class="code-number">105</span>, <span class="code-string">"email"</span>: <span class="code-string">"dev@ejemplo.com"</span> },\n  <span class="code-string">"message"</span>: <span class="code-string">"Usuario registrado exitosamente."</span>\n}';
  } else {
    codigo.innerHTML = '{\n  <span class="code-string">"status"</span>: <span class="code-string">"error"</span>,\n  <span class="code-string">"code"</span>: <span class="code-number">422</span>,\n  <span class="code-string">"data"</span>: { <span class="code-string">"email"</span>: <span class="code-string">"Formato de correo inválido."</span> },\n  <span class="code-string">"message"</span>: <span class="code-string">"Errores en los campos de entrada."</span>\n}';
  }
};

// --- Tarjeta 6: consola servidor vs cliente ---
window.compararAudienciaError = function(audiencia) {
  const btnServidor = document.getElementById('btn-consola-server');
  const btnCliente = document.getElementById('btn-cliente-api');
  const desc = document.getElementById('audiencia-error-desc');

  btnServidor.classList.toggle('simbolo-activo', audiencia === 'servidor');
  btnServidor.classList.toggle('simbolo-inactivo', audiencia !== 'servidor');
  btnCliente.classList.toggle('simbolo-activo', audiencia === 'cliente');
  btnCliente.classList.toggle('simbolo-inactivo', audiencia !== 'cliente');

  if (audiencia === 'servidor') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">console.error(err.stack)</p><p>Contiene la traza completa: archivo, línea exacta, módulos involucrados. Solo va a la consola del servidor, nunca al cliente.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Respuesta JSON genérica</p><p>Solo status, code y un mensaje legible de negocio. Exponer err.stack al cliente es una vulnerabilidad: revela rutas internas y estructura del servidor.</p></div>';
  }
};

// --- Tarjeta 2: propiedades de req.files ---
window.mostrarPropArchivo = function(prop) {
  const btns = document.querySelectorAll('[data-archivo]');
  const desc = document.getElementById('prop-archivo-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-archivo="' + prop + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    name: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">El nombre original del archivo. Ejemplo: <code>documento.pdf</code></div>',
    data: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">El buffer crudo: los bytes del archivo en memoria, antes de guardarlo en disco.</div>',
    size: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">El peso del archivo en bytes. Se usa para validar límites de tamaño.</div>',
    mimetype: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">El formato del archivo. Ejemplo: <code>image/png</code>, <code>application/pdf</code>.</div>'
  };

  desc.innerHTML = datos[prop];
};

// --- Tarjeta 3: las 3 validaciones ---
window.mostrarValidacionArchivo = function(tipo) {
  const btns = document.querySelectorAll('[data-valfile]');
  const desc = document.getElementById('validacion-archivo-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-valfile="' + tipo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    presencia: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Presencia</p><p>¿req.files existe y tiene al menos una clave? Sin esto, tu código podría lanzar TypeError al intentar leer algo indefinido.</p></div>',
    tipo: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Tipo (MIME)</p><p>¿archivo.mimetype está en tu lista de formatos permitidos? Bloquea scripts ejecutables disfrazados de imágenes.</p></div>',
    tamano: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Tamaño</p><p>¿archivo.size es menor al límite configurado? Evita agotar el disco o la memoria del servidor.</p></div>'
  };

  desc.innerHTML = datos[tipo];
};

// --- Tarjeta 4: Date.now() vs path.extname() ---
window.mostrarPiezaRenombrado = function(pieza) {
  const btnDate = document.getElementById('btn-datenow');
  const btnExt = document.getElementById('btn-extname');
  const desc = document.getElementById('pieza-renombrado-desc');

  btnDate.classList.toggle('simbolo-activo', pieza === 'datenow');
  btnDate.classList.toggle('simbolo-inactivo', pieza !== 'datenow');
  btnExt.classList.toggle('simbolo-activo', pieza === 'extname');
  btnExt.classList.toggle('simbolo-inactivo', pieza !== 'extname');

  if (pieza === 'datenow') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Date.now()</p><p>Milisegundos desde 1970. Cada instante es único, así que agregarlo al nombre casi garantiza que no se repita.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">path.extname()</p><p>Extrae solo la extensión de un nombre de archivo. path.extname(\'foto.jpg\') devuelve \'.jpg\'. Así el archivo renombrado conserva su tipo.</p></div>';
  }
};

// --- Tarjeta 6: partes de la regex /\s+/g ---
window.mostrarParteRegex = function(parte) {
  const btns = document.querySelectorAll('[data-regex]');
  const desc = document.getElementById('parte-regex-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-regex="' + parte + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    s: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>\\s</code>: cualquier espacio en blanco (espacio, tabulación, salto de línea).</div>',
    mas: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>+</code>: "uno o más" seguidos. Agrupa varios espacios consecutivos como una sola coincidencia.</div>',
    g: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>g</code> (global): reemplaza TODAS las coincidencias del string, no solo la primera.</div>'
  };

  desc.innerHTML = datos[parte];
};

// --- Tarjeta 6: existsSync vs access ---
window.compararExistsAccess = function(tipo) {
  const btnSync = document.getElementById('btn-existssync');
  const btnAsync = document.getElementById('btn-accessasync');
  const desc = document.getElementById('exists-access-desc');

  btnSync.classList.toggle('simbolo-activo', tipo === 'sync');
  btnSync.classList.toggle('simbolo-inactivo', tipo !== 'sync');
  btnAsync.classList.toggle('simbolo-activo', tipo === 'async');
  btnAsync.classList.toggle('simbolo-inactivo', tipo !== 'async');

  if (tipo === 'sync') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">fs.existsSync()</p><p>Bloquea el hilo de Node mientras consulta el disco. Devuelve true/false directamente.</p><p style="margin-top:0.4rem;color:#8B3A3A;">En rutas con mucho tráfico, congela a todos los demás clientes mientras consulta.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">fs.access()</p><p>Asíncrono, devuelve una promesa. El servidor sigue atendiendo otras peticiones mientras espera la respuesta del disco.</p><p style="margin-top:0.4rem;color:#2D5A1E;">Preferido en producción por no bloquear el Event Loop.</p></div>';
  }
};

// --- Tarjeta 1: flujo de JWT ---
window.avanzarFlujoJwt = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta 2: las 3 partes del JWT ---
window.mostrarParteJwt = function(parte) {
  const btns = document.querySelectorAll('[data-jwt]');
  const desc = document.getElementById('parte-jwt-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-jwt="' + parte + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    header: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Header</p><p>Metadatos: typ ("JWT") y alg (el algoritmo de firma, como HS256). Le dice al servidor cómo procesar el token.</p></div>',
    payload: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Payload</p><p>Los datos del usuario: sub (a quién pertenece), iat (cuándo se creó), exp (cuándo expira). Es público, cualquiera puede leerlo.</p></div>',
    signature: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Signature</p><p>El sello criptográfico. Se genera con el header + payload + una clave secreta. Si algo cambia, la firma deja de coincidir.</p></div>'
  };

  desc.innerHTML = datos[parte];
};

// --- Tarjeta 3: parámetros de jwt.sign() ---
window.mostrarParamSign = function(param) {
  const btns = document.querySelectorAll('[data-signparam]');
  const desc = document.getElementById('param-sign-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-signparam="' + param + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    payload: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">payload</p><p>Los datos a incluir (id, rol). Nunca contraseñas ni datos sensibles: es legible por cualquiera.</p></div>',
    secret: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">secretOrPrivateKey</p><p>La clave que firma el token. Va en variables de entorno (.env), nunca en el código ni en Git.</p></div>',
    options: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">options</p><p>Configuración como expiresIn ("15m"). Un tiempo corto limita el daño si el token es robado.</p></div>'
  };

  desc.innerHTML = datos[param];
};

// --- Tarjeta 4: pasos del middleware ---
window.avanzarMiddlewareJwt = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta 5: opciones de almacenamiento ---
window.mostrarStorage = function(tipo) {
  const btns = document.querySelectorAll('[data-storage]');
  const desc = document.getElementById('storage-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-storage="' + tipo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    local: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">localStorage</p><p>Persiste incluso si se cierra el navegador. Accesible por cualquier JavaScript de la página.</p></div>',
    session: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">sessionStorage</p><p>Igual que localStorage, pero se borra al cerrar la pestaña.</p></div>',
    cookie: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Cookies</p><p>El navegador las adjunta automáticamente en cada petición al dominio. Con HttpOnly, JavaScript no puede leerlas.</p></div>'
  };

  desc.innerHTML = datos[tipo];
};

// --- Tarjeta 5: XSS vs CSRF ---
window.compararXssCsrf = function(tipo) {
  const btnXss = document.getElementById('btn-xss');
  const btnCsrf = document.getElementById('btn-csrf');
  const desc = document.getElementById('xss-csrf-desc');

  btnXss.classList.toggle('simbolo-activo', tipo === 'xss');
  btnXss.classList.toggle('simbolo-inactivo', tipo !== 'xss');
  btnCsrf.classList.toggle('simbolo-activo', tipo === 'csrf');
  btnCsrf.classList.toggle('simbolo-inactivo', tipo !== 'csrf');

  if (tipo === 'xss') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">XSS (Cross-Site Scripting)</p><p>Un script malicioso se ejecuta en tu página y lee localStorage.getItem(\'token\'), robándolo directamente.</p><p style="margin-top:0.4rem;opacity:0.7;">Afecta a: localStorage y sessionStorage.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">CSRF (Cross-Site Request Forgery)</p><p>Un sitio malicioso hace que tu navegador envíe una petición a tu API. El navegador adjunta la cookie automáticamente, sin que tú lo notes.</p><p style="margin-top:0.4rem;opacity:0.7;">Afecta a: Cookies (incluso con HttpOnly).</p></div>';
  }
};

// --- Tarjeta 1: escalabilidad vertical vs horizontal ---
window.compararEscalabilidad = function(tipo) {
  const btnV = document.getElementById('btn-vertical');
  const btnH = document.getElementById('btn-horizontal');
  const desc = document.getElementById('escalabilidad-desc');

  btnV.classList.toggle('simbolo-activo', tipo === 'vertical');
  btnV.classList.toggle('simbolo-inactivo', tipo !== 'vertical');
  btnH.classList.toggle('simbolo-activo', tipo === 'horizontal');
  btnH.classList.toggle('simbolo-inactivo', tipo !== 'horizontal');

  if (tipo === 'vertical') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Vertical (Scaling Up)</p><p>Más RAM, más CPU, mejor disco en el MISMO servidor.</p><p style="margin-top:0.4rem;color:#8B3A3A;">Límite: techo físico y económico. Punto único de fallo: si ese servidor cae, todo cae.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Horizontal (Scaling Out)</p><p>Agregar MÁS servidores trabajando en paralelo.</p><p style="margin-top:0.4rem;color:#2D5A1E;">Sin límite real. Si uno cae, los demás siguen atendiendo (con arquitectura stateless).</p></div>';
  }
};

// --- Tarjeta 1: algoritmos de balanceo ---
window.mostrarAlgoritmoBalanceo = function(algo) {
  const btns = document.querySelectorAll('[data-algo]');
  const desc = document.getElementById('algoritmo-balanceo-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-algo="' + algo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    round: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Round Robin</p><p>Reparte por turnos: servidor 1, 2, 3, 1, 2, 3... Ideal si todos los servidores y peticiones son equivalentes.</p></div>',
    least: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Least Connections</p><p>Envía la petición al servidor con menos conexiones activas en ese momento. Ideal cuando las peticiones tardan tiempos muy distintos.</p></div>',
    iphash: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">IP Hash</p><p>La IP del cliente siempre va al mismo servidor. Se usa cuando se necesitan sesiones "pegajosas" (sticky sessions), no siempre compatible con stateless puro.</p></div>'
  };

  desc.innerHTML = datos[algo];
};

// --- Tarjeta 2: piezas del módulo cluster ---
window.mostrarPiezaCluster = function(pieza) {
  const btns = document.querySelectorAll('[data-cluster]');
  const desc = document.getElementById('pieza-cluster-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-cluster="' + pieza + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    isprimary: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">cluster.isPrimary</p><p>true en el proceso principal, false en los workers. Permite separar el código: el principal solo crea y vigila workers.</p></div>',
    fork: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">cluster.fork()</p><p>Clona el proceso actual, creando un worker con su propio Event Loop y espacio de memoria.</p></div>',
    cpus: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">os.cpus().length</p><p>Cuántos núcleos tiene el procesador. Se usa para saber cuántos workers crear (uno por núcleo).</p></div>',
    pid: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">process.pid</p><p>El identificador único del proceso, asignado por el sistema operativo. Útil para saber qué worker atendió cada petición.</p></div>'
  };

  desc.innerHTML = datos[pieza];
};

// --- Tarjeta 3: riesgos de node/nodemon en producción ---
window.mostrarRiesgoProduccion = function(riesgo) {
  const btns = document.querySelectorAll('[data-riesgo]');
  const desc = document.getElementById('riesgo-produccion-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-riesgo="' + riesgo + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    crash: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Caída sin recuperación</p><p>Si el proceso se cae, con "node app.js" nadie lo reinicia. La API queda apagada hasta que alguien intervenga manualmente.</p></div>',
    reinicio: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Vulnerabilidad a reinicios</p><p>Si el servidor físico se reinicia, tu proceso de Node no vuelve a arrancar solo.</p></div>',
    mononucleo: '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">Un solo núcleo</p><p>"node app.js" solo usa un núcleo de CPU. Para usar los demás, tendrías que programar clustering manualmente.</p></div>'
  };

  desc.innerHTML = datos[riesgo];
};

// --- Tarjeta 3: comandos de PM2 ---
window.mostrarComandoPm2 = function(cmd) {
  const btns = document.querySelectorAll('[data-pm2cmd]');
  const desc = document.getElementById('comando-pm2-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-pm2cmd="' + cmd + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    start: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>pm2 start app.js --name api -i max</code><p style="margin-top:0.4rem;opacity:0.7;">Arranca la app con clustering automático en todos los núcleos.</p></div>',
    stop: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>pm2 stop api</code><p style="margin-top:0.4rem;opacity:0.7;">Detiene el proceso de forma ordenada, liberando puerto y memoria.</p></div>',
    list: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>pm2 list</code><p style="margin-top:0.4rem;opacity:0.7;">Panel con todos los procesos activos: estado, CPU, memoria, reinicios.</p></div>',
    restart: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><code>pm2 restart api</code><p style="margin-top:0.4rem;opacity:0.7;">Detiene y vuelve a arrancar. Útil para aplicar cambios de configuración.</p></div>'
  };

  desc.innerHTML = datos[cmd];
};

// --- Tarjeta 4: SIGINT vs SIGTERM ---
window.compararSenales = function(senal) {
  const btnInt = document.getElementById('btn-sigint');
  const btnTerm = document.getElementById('btn-sigterm');
  const desc = document.getElementById('senales-desc');

  btnInt.classList.toggle('simbolo-activo', senal === 'sigint');
  btnInt.classList.toggle('simbolo-inactivo', senal !== 'sigint');
  btnTerm.classList.toggle('simbolo-activo', senal === 'sigterm');
  btnTerm.classList.toggle('simbolo-inactivo', senal !== 'sigterm');

  if (senal === 'sigint') {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">SIGINT</p><p>Se dispara cuando presionas Ctrl+C en la terminal. Por defecto, detiene el proceso de inmediato.</p></div>';
  } else {
    desc.innerHTML = '<div style="padding:1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;"><p style="font-weight:700;margin-bottom:0.4rem;">SIGTERM</p><p>La envía un gestor de procesos (como PM2) o un orquestador para pedir un apagado planificado, con tiempo de gracia.</p></div>';
  }
};

// --- Tarjeta 4: flujo de apagado seguro ---
window.avanzarApagado = function(paso) {
  const pasos = document.querySelectorAll('.flujo-paso');
  pasos.forEach((p, i) => {
    if (i < paso) {
      p.classList.add('flujo-completado');
      p.classList.remove('flujo-pendiente', 'flujo-activo');
    } else if (i === paso) {
      p.classList.add('flujo-activo');
      p.classList.remove('flujo-pendiente', 'flujo-completado');
    } else {
      p.classList.add('flujo-pendiente');
      p.classList.remove('flujo-activo', 'flujo-completado');
    }
  });
};

// --- Tarjeta 5: decodificar errores comunes ---
window.mostrarErrorComun = function(err) {
  const btns = document.querySelectorAll('[data-err]');
  const desc = document.getElementById('error-comun-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-err="' + err + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    module: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">No encuentra el archivo o paquete importado. Suele ser una ruta mal escrita o un paquete no instalado.</div>',
    eaddr: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">El puerto que intentas usar ya está ocupado por otro proceso.</div>',
    syntax: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Tu código tiene un error gramatical: falta cerrar una llave, paréntesis o comilla.</div>',
    ref: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Estás usando una variable o función que nunca fue declarada.</div>',
    enoent: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Intentas leer, escribir o eliminar un archivo que no existe en esa ruta.</div>'
  };

  desc.innerHTML = datos[err];
};

// --- Tarjeta 6: comandos de terminal ---
window.mostrarComandoTerminal = function(cmd) {
  const btns = document.querySelectorAll('[data-termcmd]');
  const desc = document.getElementById('comando-terminal-desc');

  btns.forEach(b => {
    b.classList.remove('simbolo-activo');
    b.classList.add('simbolo-inactivo');
  });
  const activo = document.querySelector('[data-termcmd="' + cmd + '"]');
  activo.classList.add('simbolo-activo');
  activo.classList.remove('simbolo-inactivo');

  const datos = {
    jobs: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Lista los procesos en segundo plano de la sesión de terminal ACTUAL.</div>',
    fg: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Trae un proceso de background de vuelta al primer plano.</div>',
    psaux: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Lista TODOS los procesos del sistema, filtrados por "node". Encuentra procesos huérfanos de cualquier sesión.</div>',
    kill: '<div style="padding:0.75rem 1rem;background:white;border-radius:0.5rem;border:1px solid rgba(51,64,42,0.1);font-size:0.85rem;">Envía una señal de terminación a ese proceso específico por su PID.</div>'
  };

  desc.innerHTML = datos[cmd];
};

renderizarMenu();
