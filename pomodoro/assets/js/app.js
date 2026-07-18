// ~~~~~~~~~~~~~~~~~~~~~~ VARIABLES DE ESTADO ~~~~~~~~~~~~~~~~~~~~~~
let tiempoEnfoque = 25 * 60; // 25 minutos en segundos.
let tiempoDescanso = 5 * 60;
let repeticionesConfiguradas = 4;
let tiempoRestante = tiempoEnfoque; // Esto simplemente toma el tiempo inicial, que son 25 minutos convertidos en segundos, pero este valor si va a cambiar, porque será el tiempo restante.
let tiempoIntervalo = null;
let modoActual = 'enfoque';
let ciclosCompletados = 0;
let tiempoFin = null;

// ~~~~~~~~~~~~~~~~~~~~~~ VARIABLES DE AUDIO ~~~~~~~~~~~~~~~~~~~~~~
const sonidoControl = new Audio('./assets/sonidos/click-control.wav');
const sonidoMas = new Audio('./assets/sonidos/click-mas.wav');
const sonidoMenos = new Audio('./assets/sonidos/click-menos.wav');
const sonidoTransicion = new Audio('./assets/sonidos/inicio-descanso.wav');
const sonidoCompleto = new Audio('./assets/sonidos/finalizado.wav');

// ~~~~~~~~~~~~~~~~~~~~~~ REFERENCIAS DEL DOM ~~~~~~~~~~~~~~~~~~~~~~
const mensaje = document.getElementById('mensaje');
const circulos = document.getElementById('circulos');

const contador = document.getElementById('contador');
const btnIniciar = document.getElementById('iniciar');
const btnPausar = document.getElementById('pausar');
const btnReiniciar = document.getElementById('reiniciar');

const menosEnfoque = document.getElementById('menosEnfoque');
const masEnfoque = document.getElementById('masEnfoque');
const valorEnfoque = document.getElementById('valorEnfoque');

const menosDescanso = document.getElementById('menosDescanso');
const masDescanso = document.getElementById('masDescanso');
const valorDescanso = document.getElementById('valorDescanso');

const menosRepeticiones = document.getElementById('menosRepeticiones');
const masRepeticiones = document.getElementById('masRepeticiones');
const valorRepeticiones = document.getElementById('valorRepeticiones');

const btnModoMini = document.getElementById('btnModoMini');
const panelMini = document.getElementById('panelMini');


// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCIONES DEL CONTADOR ~~~~~~~~~~~~~~~~~~~~~~~
function actualizarContador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const tiempoFormateado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    contador.textContent = tiempoFormateado;

    let nombreModo;
    if (modoActual === 'enfoque') {
        nombreModo = 'Enfoque';
    } else {
        nombreModo = 'Descanso';
    }

    document.title = `${tiempoFormateado} ~ ${nombreModo}`;
}

function iniciar() {
    if (tiempoIntervalo !== null) {
        return;
    }
    if (ciclosCompletados >= repeticionesConfiguradas) {
        return;
    }
    sonidoControl.play();

    tiempoFin = Date.now() + tiempoRestante * 1000;

    tiempoIntervalo = setInterval(() => {
        tiempoRestante = Math.round((tiempoFin - Date.now()) / 1000);
        actualizarContador();
        if (tiempoRestante <= 0) {
            if (modoActual === 'enfoque') {
                modoActual = 'descanso';
                tiempoRestante = tiempoDescanso;
                tiempoFin = Date.now() + tiempoDescanso * 1000;
                actualizarContador();
                sonidoTransicion.play();
            } else {
                ciclosCompletados = ciclosCompletados + 1;
                actualizarCirculos();
                if (ciclosCompletados >= repeticionesConfiguradas) {
                    clearInterval(tiempoIntervalo);
                    tiempoIntervalo = null;
                    mensaje.textContent = '¡Sesión completa!';
                    sonidoCompleto.play();
                    return;
                }
                modoActual = 'enfoque';
                tiempoRestante = tiempoEnfoque;
                tiempoFin = Date.now() + tiempoEnfoque * 1000;
                actualizarContador();
                sonidoTransicion.play();
            }
        }
    }, 1000);
}

function pausar() {
    clearInterval(tiempoIntervalo);
    tiempoIntervalo = null;
    sonidoControl.play();
}

function reiniciar() {
    clearInterval(tiempoIntervalo);
    tiempoIntervalo = null;
    modoActual = 'enfoque';
    tiempoRestante = tiempoEnfoque;
    ciclosCompletados = 0;
    actualizarContador();
    actualizarCirculos();
    mensaje.textContent = '';
    sonidoControl.play();
}


// ~~~~~~~~~~~~~~~~~~~~~~~ EVENTOS DE LOS BOTONES PRINCIPALES ~~~~~~~~~~~~~~~~~~~~~~~
btnIniciar.addEventListener('click', iniciar);
btnPausar.addEventListener('click', pausar);
btnReiniciar.addEventListener('click', reiniciar);


// ~~~~~~~~~~~~~~~~~~~~~~~ FUNCIONES DE CONFIGURACIÓN ~~~~~~~~~~~~~~~~~~~~~~~
function actualizarValorEnfoque() {
    valorEnfoque.textContent = `${tiempoEnfoque / 60} min`;
}
actualizarValorEnfoque();

function actualizarValorDescanso() {
    valorDescanso.textContent = `${tiempoDescanso / 60} min`;
}
actualizarValorDescanso();


function actualizarValorRepeticiones() {
    valorRepeticiones.textContent = `${repeticionesConfiguradas}`;
    actualizarCirculos();
}
actualizarValorRepeticiones();

function actualizarCirculos() {
    circulos.innerHTML = '';
    for (let i = 0; i < repeticionesConfiguradas; i++) {
        const punto = document.createElement('div');
        punto.classList.add('punto-ciclo');
        if (i < ciclosCompletados) {
            punto.classList.add('completado');
        }
        circulos.appendChild(punto);
    }
}
actualizarCirculos();


// ~~~~~~~~~~~~~~~~~~~~~~~ EVENTOS DE LOS STEPPERS ~~~~~~~~~~~~~~~~~~~~~~~
masEnfoque.addEventListener('click', () => {
    sonidoMas.play();
    if (tiempoEnfoque < 60 * 60) {
        tiempoEnfoque = tiempoEnfoque + 60;
        actualizarValorEnfoque();
        if (modoActual === 'enfoque') {
            if (tiempoIntervalo !== null) {
                tiempoFin = tiempoFin + 60 * 1000;
                tiempoRestante = Math.round((tiempoFin - Date.now()) / 1000);
            } else {
                tiempoRestante = tiempoRestante + 60;
            }
            actualizarContador();
        }
    }
});

menosEnfoque.addEventListener('click', () => {
    sonidoMenos.play();
    if (modoActual === 'enfoque' && tiempoRestante <= 60) {
        return;
    }
    if (tiempoEnfoque > 5 * 60) {
        tiempoEnfoque = tiempoEnfoque - 60;
        actualizarValorEnfoque();
        if (modoActual === 'enfoque') {
            if (tiempoIntervalo !== null) {
                tiempoFin = tiempoFin - 60 * 1000;
                tiempoRestante = Math.round((tiempoFin - Date.now()) / 1000);
            } else {
                tiempoRestante = tiempoRestante - 60;
            }
            actualizarContador();
        }
    }
});

masDescanso.addEventListener('click', () => {
    if (tiempoDescanso < 30 * 60) {
        sonidoMas.play();
        tiempoDescanso = tiempoDescanso + 60;
        actualizarValorDescanso();
        if (modoActual === 'descanso') {
            if (tiempoIntervalo !== null) {
                tiempoFin = tiempoFin + 60 * 1000;
                tiempoRestante = Math.round((tiempoFin - Date.now()) / 1000);
            } else {
                tiempoRestante = tiempoRestante + 60;
            }
            actualizarContador();
        }
    }
});

menosDescanso.addEventListener('click', () => {
    sonidoMenos.play();
    if (modoActual === 'descanso' && tiempoRestante <= 60) {
        return;
    }
    if (tiempoDescanso > 60) {
        tiempoDescanso = tiempoDescanso - 60;
        actualizarValorDescanso();
        if (modoActual === 'descanso') {
            if (tiempoIntervalo !== null) {
                tiempoFin = tiempoFin - 60 * 1000;
                tiempoRestante = Math.round((tiempoFin - Date.now()) / 1000);
            } else {
                tiempoRestante = tiempoRestante - 60;
            }
            actualizarContador();
        }
    }
});

masRepeticiones.addEventListener('click', () => {
    if (repeticionesConfiguradas < 5) {
        sonidoMas.play();
        repeticionesConfiguradas = repeticionesConfiguradas + 1;
        actualizarValorRepeticiones();
    }
})

menosRepeticiones.addEventListener('click', () => {
    if (repeticionesConfiguradas > 1) {
        sonidoMenos.play();
        repeticionesConfiguradas = repeticionesConfiguradas - 1;
        actualizarValorRepeticiones();
    }
})


// ~~~~~~~~~~~~~~~~~~~~~~~ MODO VENTANA FLOTANTE (PICTURE-IN-PICTURE) ~~~~~~~~~~~~~~~~~~~~~~~
async function activarModoMini() {
    sonidoControl.play();
    const pipWindow = await documentPictureInPicture.requestWindow({
        width: 300,
        height: 250,
    });

    [...document.styleSheets].forEach((hoja) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = hoja.href;
        pipWindow.document.head.appendChild(link);
    });

    pipWindow.document.body.appendChild(panelMini);
    pipWindow.document.body.style.margin = '0';
    pipWindow.document.body.style.padding = '20px';
    pipWindow.document.body.style.boxSizing = 'border-box';
    pipWindow.document.body.style.backgroundColor = 'rgb(236, 48, 63)';

    pipWindow.addEventListener('pagehide', () => {
        const contenedorAlarma = document.querySelector('.contenedor-alarma');
        const configGrupo = document.querySelector('.config-grupo');
        contenedorAlarma.insertBefore(panelMini, configGrupo);
    });
}

btnModoMini.addEventListener('click', activarModoMini);

if (!('documentPictureInPicture' in window)) {
    btnModoMini.style.display = 'none';
}





