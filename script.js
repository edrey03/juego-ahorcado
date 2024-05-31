const palabras = ['jesucristo', 'promesa', 'salvacion', 'mesias', 'mediador', 'sacrificio', 'redimir', 'redentor', 'sufrir', 'muerte', 'resucito', 'pecados'];
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let intentosRestantes = 6;
let letrasAdivinadas = new Set();
let palabraOculta = Array(palabra.length).fill('_');

document.getElementById('palabra').innerText = palabraOculta.join(' ');

const abecedario = 'abcdefghijklmnopqrstuvwxyzñ'.split('');
const letrasDiv = document.getElementById('letras');

abecedario.forEach(letra => {
    const button = document.createElement('button');
    button.innerText = letra;
    button.id = `letra-${letra}`;
    button.onclick = () => adivinar(letra);
    letrasDiv.appendChild(button);
});

function actualizarImagenAhorcado() {
    document.getElementById('imagen-ahorcado').src = `images/ahorcado${6 - intentosRestantes}.png`;
}

function adivinar(letra) {
    if (letrasAdivinadas.has(letra)) {
        return;
    }

    letrasAdivinadas.add(letra);
    document.getElementById(`letra-${letra}`).classList.add('disabled');
    document.getElementById(`letra-${letra}`).disabled = true;

    if (palabra.includes(letra)) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                palabraOculta[i] = letra;
            }
        }
        document.getElementById('mensaje').innerText = '¡Bien hecho! La letra está en la palabra.';
    } else {
        intentosRestantes--;
        document.getElementById('mensaje').innerText = 'Lo siento, la letra no está en la palabra.';
        actualizarImagenAhorcado();
    }

    document.getElementById('palabra').innerText = palabraOculta.join(' ');
    document.getElementById('intentos').innerText = `Te quedan ${intentosRestantes} intentos.`;

    if (!palabraOculta.includes('_')) {
        document.getElementById('mensaje').innerText = '¡Felicidades! Has adivinado la palabra.';
        desactivarBotones();
    } else if (intentosRestantes === 0) {
        document.getElementById('mensaje').innerText = `Has perdido. La palabra era: ${palabra}`;
        desactivarBotones();
    }
}

function desactivarBotones() {
    abecedario.forEach(letra => {
        document.getElementById(`letra-${letra}`).disabled = true;
    });
}

function darPista() {
    let letrasDisponibles = palabra.split('').filter(letra => !letrasAdivinadas.has(letra));
    if (letrasDisponibles.length > 0) {
        let letraPista = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
        adivinar(letraPista);
    }
}
