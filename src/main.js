/// <reference types="jquery"/>

function borrarCantidades(){
    document.querySelector("#importe").value = ""
}

function mostrarResultados(){
    document.querySelector("#cuadro-resultado").style.display = "flex"

    crearElementoResultado()
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
}


function cotizar() {
    let resultado;
    
    let monedaBase = document.querySelector("#moneda-base").selectedOptions[0].innerText
    let monedaFuturo = document.querySelector("#moneda-futuro").selectedOptions[0].innerText
    let cantidadACotizar = document.querySelector("#importe").value
    mostrarResultados()
    let textoResultado = document.querySelector("#cuadro-resultado-cotizacion")
    let paginaWeb = `https://api.exchangerate.host/latest?base=${monedaBase}&amount=${cantidadACotizar}`


    fetch(paginaWeb)
    .then(response => response.json())
    .then(responseJSON => {
        resultado = responseJSON.rates[monedaFuturo]

        textoResultado.innerText = `${cantidadACotizar} ${monedaBase} son ${resultado} ${monedaFuturo}`
        console.log(responseJSON)})
    .catch(error => console.error("error", error))




}

let botonBorrarCantidad = document.querySelector(".bi-backspace")
let botonIntercambioMonedas = document.querySelector(".btn-outline-primary")
let botonCotizar = document.querySelector("#boton-cotizar")


botonBorrarCantidad.onclick = borrarCantidades
botonIntercambioMonedas.onclick = intercambiarMoneda
botonCotizar.onclick = cotizar










/*
let objeto;

fetch("https://api.exchangerate.host/convert?from=USD&to=EUR")
    .then(response => response.json())
    .then(responseJSON => {
        objeto = responseJSON;
        console.log(responseJSON)})
    .catch(error => console.error("error", error))


console.log(objeto)

*/


/*let objeto;

fetch("http://api.exchangeratesapi.io/v1/latest?access_key=2b9ffe353611a53c200df5759283cc85")
    .then(response => response.json())
    .then(responseJSON => {
        objeto = responseJSON;
        console.log(responseJSON)})
    .catch(error => console.error("error", error))


console.log(objeto)
*/

/*
var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}

*/