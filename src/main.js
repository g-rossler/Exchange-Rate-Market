/// <reference types="jquery"/>
import crearGrafico from "./chart.js"

function borrarCantidades(){
    document.querySelector("#importe").value = ""
    document.querySelector("#importe").style.borderColor = "black"
}

function mostrarResultados(){
    document.querySelector("#cuadro-resultado").style.display = "flex"
    crearElementoResultado()
}

function borrarResultado() {
    if(document.querySelector("#cuadro-resultado-titulo")) {
        document.querySelector("#cuadro-resultado-titulo").remove()
        document.querySelector("#cuadro-resultado-cotizacion").remove()
    }

}

function crearElementoResultado(){
    let $divCuadroResultado = document.querySelector("#cuadro-resultado")
    let $divCuadroResultadoTitulo = document.createElement("div")
    $divCuadroResultadoTitulo.id = "cuadro-resultado-titulo"
    $divCuadroResultadoTitulo.innerText = "Resultado"
    $divCuadroResultado.appendChild($divCuadroResultadoTitulo)
    let $divCuadroResultadoCotizacion = document.createElement("div")
    $divCuadroResultadoCotizacion.id = "cuadro-resultado-cotizacion"
    $divCuadroResultadoCotizacion.innerText = "CARGANDO... ESPERE POR FAVOR"
    $divCuadroResultado.appendChild($divCuadroResultadoCotizacion)
}

function intercambiarMoneda() {
    let indiceMonedaBase = document.querySelector("#moneda-base").options.selectedIndex
    let indiceMonedaFuturo = document.querySelector("#moneda-futuro").options.selectedIndex
    document.querySelector("#moneda-base").options.selectedIndex = indiceMonedaFuturo
    document.querySelector("#moneda-futuro").options.selectedIndex = indiceMonedaBase
    agregarBanderaInputMonedaBase()
    agregarBanderaInputMonedaFuturo()

}

function controlValoresIngresados(){
    let cantidadIngresada = document.querySelector("#importe").value
    if(cantidadIngresada <= 0) {
        document.querySelector("#importe").style.borderColor = "red"
        document.querySelector("#error").style.display = "block"
        borrarResultado()
        document.querySelector("#cuadro-resultado").style.display = "none"
    } else {
        cotizar()
    }
}

function limpiarPagina() {
    borrarResultado()
    document.querySelector("#importe").style.borderColor = "black"
    document.querySelector("#error").style.display = "none"
}



function cotizar() {
    let objeto
    let resultado;
    limpiarPagina()

    let monedaBase = document.querySelector("#moneda-base").selectedOptions[0].innerText
    let monedaFuturo = document.querySelector("#moneda-futuro").selectedOptions[0].innerText
    let cantidadACotizar = document.querySelector("#importe").value
    crearGrafico(monedaBase, monedaFuturo)
    mostrarResultados()
    
    let textoResultado = document.querySelector("#cuadro-resultado-cotizacion")
    let paginaWeb = `https://api.exchangerate.host/latest?base=${monedaBase}&amount=${cantidadACotizar}`


    fetch(paginaWeb)
    .then(response => response.json())
    .then(responseJSON => {
        resultado = responseJSON.rates[monedaFuturo].toFixed(2)
        objeto = responseJSON
        textoResultado.innerText = `${cantidadACotizar} ${monedaBase} son ${resultado} ${monedaFuturo}`

})
    .catch(error => console.error("error", error))
}

function agregarBanderaInputMonedaFuturo() {
    if(document.querySelector("#moneda-futuro").value === "ARS") {
        document.querySelector("#moneda-futuro").className = "moneda-futuro-ars"
    } else if(document.querySelector("#moneda-futuro").value === "USD") {
        document.querySelector("#moneda-futuro").className = "moneda-futuro-usd"
    } else {
        document.querySelector("#moneda-futuro").className = "moneda-futuro-eur"
    }
}

function agregarBanderaInputMonedaBase() {
    if(document.querySelector("#moneda-base").value === "ARS") {
        document.querySelector("#moneda-base").className = "moneda-base-ars"
    } else if(document.querySelector("#moneda-base").value === "USD") {
        document.querySelector("#moneda-base").className = "moneda-base-usd"
    } else {
        document.querySelector("#moneda-base").className = "moneda-base-eur"
    }
}


let botonBorrarCantidad = document.querySelector(".bi-backspace")
let botonIntercambioMonedas = document.querySelector(".btn-outline-primary")
let botonCotizar = document.querySelector("#boton-cotizar")
document.querySelector("#moneda-futuro").onchange = agregarBanderaInputMonedaFuturo
document.querySelector("#moneda-base").onchange = agregarBanderaInputMonedaBase


botonBorrarCantidad.onclick = borrarCantidades
botonIntercambioMonedas.onclick = intercambiarMoneda
botonCotizar.onclick = controlValoresIngresados

