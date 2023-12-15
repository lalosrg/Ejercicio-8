let hojaEstiloActual = 'estilos.css'
const btnRecordarEstilos = document.querySelector("#btnRecordarEstilos");
const selectCambiarEstilos = document.querySelector("#selectCambiarEstilos");
const radioBtns = document.querySelectorAll('input[name="estilo"]');

document.addEventListener('DOMContentLoaded', function () {
    const estiloGuardado = localStorage.getItem('estilo')
    if (estiloGuardado) {
        cambiarEstilo(estiloGuardado)
        btnRecordarEstilos.classList.add('presionado')
    }

    cambiarEstilo(hojaEstiloActual)


})

selectCambiarEstilos.addEventListener('change', (e) => {
    cambiarEstilo(e.target.value)
})


radioBtns.forEach(radio => {
    radio.addEventListener('click', (e) => {
        // console.log(e.target.value)
        cambiarEstilo(e.target.value)

    })
})

document.querySelector("#btnCambiarEstilos").addEventListener('click', () => {

    if (hojaEstiloActual == 'estilos.css') {
        cambiarEstilo('estilos-retro.css')
    } else if (hojaEstiloActual == 'estilos-retro.css') {
        cambiarEstilo('estilos.css')
    }
})

document.querySelector("#btnCambiarEstilosRandom").addEventListener('click', () => {

    const random = Math.floor(Math.random() * 3)

    if (random == 0) {
        cambiarEstilo('')
    } else if (random == 1) {
        cambiarEstilo('estilos.css')
    } else if (random == 2) {
        cambiarEstilo('estilos-retro.css')
    }
})

btnRecordarEstilos.addEventListener('click', () => {
    const estiloGuardado = localStorage.getItem('estilo')
    if (estiloGuardado) {
        btnRecordarEstilos.classList.remove('presionado')
        localStorage.removeItem('estilo');
    } else {
        btnRecordarEstilos.classList.add('presionado')
        recordarEstilo(hojaEstiloActual)
        // localStorage.setItem('estilo', hojaEstiloActual);
    }
})

document.addEventListener('focusout', (e) => {
    if (e.target) {
        if (e.target.matches('.elemento')) {
            e.target.style.background = "white"
            e.target.parentElement.parentElement.classList.remove("activo")
        }
    }

}, true);

document.addEventListener('focus', (e) => {
    if (e.target) {
        if (e.target.matches('.elemento')) {
            if (hojaEstiloActual == 'estilos.css') {
                e.target.style.background = "#4e6963"
            } else if (hojaEstiloActual == 'estilos-retro.css') {
                e.target.style.background = "#BB3F02"
            }
            e.target.parentElement.parentElement.classList.add("activo")
        }
    }

}, true);

function cambiarEstilo(nuevoEstilo) {
    hojaEstiloActual = nuevoEstilo;
    document.getElementById("estilo").href = `css/${nuevoEstilo}`;
    selectCambiarEstilos.value = nuevoEstilo

    radioBtns.forEach(radio => {
        if (radio.value == nuevoEstilo) {
            radio.setAttribute("checked", "checked")
        } else {
            radio.removeAttribute("checked")
        }
    })

    if (btnRecordarEstilos.matches('.presionado')) {
        recordarEstilo(nuevoEstilo)
    }
}

function recordarEstilo(estilo) {
    localStorage.setItem('estilo', estilo);
}