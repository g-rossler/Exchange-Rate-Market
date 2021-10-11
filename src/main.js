/// <reference types="jquery"/>

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
    
    let resultado;
    limpiarPagina()

    let monedaBase = document.querySelector("#moneda-base").selectedOptions[0].innerText
    let monedaFuturo = document.querySelector("#moneda-futuro").selectedOptions[0].innerText
    let cantidadACotizar = document.querySelector("#importe").value
    mostrarResultados()
    let textoResultado = document.querySelector("#cuadro-resultado-cotizacion")
    let paginaWeb = `https://api.exchangerate.host/latest?base=${monedaBase}&amount=${cantidadACotizar}`


    fetch(paginaWeb)
    .then(response => response.json())
    .then(responseJSON => {
        resultado = responseJSON.rates[monedaFuturo].toFixed(2)
        objeto = responseJSON

        textoResultado.innerText = `${cantidadACotizar} ${monedaBase} son ${resultado} ${monedaFuturo}`

        console.log(responseJSON)})
    .catch(error => console.error("error", error))




}

let objeto;
let botonBorrarCantidad = document.querySelector(".bi-backspace")
let botonIntercambioMonedas = document.querySelector(".btn-outline-primary")
let botonCotizar = document.querySelector("#boton-cotizar")


botonBorrarCantidad.onclick = borrarCantidades
botonIntercambioMonedas.onclick = intercambiarMoneda
botonCotizar.onclick = controlValoresIngresados

/*
        for (const [key, value] of Object.entries(objeto.rates)) {
            console.log(`${key}: ${value}`);}
*/



/*
var d = new Date();
d.setDate(d.getDate() - 12);
console.log(d.toString());
const jsonDate = d.toJSON();
console.log(jsonDate);
console.log(jsonDate.slice(0,10))
let hola = jsonDate.slice(0,10)
console.log(hola)
*/


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