import { fases, tarjetas as tarjetasBase } from './datos.js';
import { tarjetas as tarjetasFase1 } from './datos_fase1.js';

const tarjetas = [...tarjetasBase, ...tarjetasFase1];
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

renderizarMenu();
