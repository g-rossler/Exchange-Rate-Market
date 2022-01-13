function fechaTreintaDias(){
    let fecha = new Date();
    fecha.setDate(fecha.getDate() - 30);
    const jsonDate = fecha.toJSON();
    let fechaVieja = jsonDate.slice(0,10)
    return fechaVieja
}

function fechaHoy(){
    let fecha = new Date();
    const jsonDate = fecha.toJSON();
    let fechaHoy = jsonDate.slice(0,10)
    return fechaHoy
}

function grafico(arrayFechas, cotizacion, moneda){
    let currentChart = Chart.getChart("myChart"); 
    if (currentChart != undefined) {
        currentChart.destroy();
    }


    let max = (Math.max(...cotizacion)) * 1.005
    let min = (Math.min(...cotizacion)) * 0.995
    let labelMoneda = `1 ${moneda}`

    let data = {
        labels: arrayFechas,
        datasets: [{
            label: labelMoneda,
            fill: true,
            data: cotizacion,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }

    let config = {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                min: min,
                max: max,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    } 

    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    )
   
}


export default function crearGrafico(monedaBase, monedaFuturo) {
    let fechaFinal = fechaHoy()
    let fechaInicio = fechaTreintaDias()
    document.querySelector("#tabla-resultados").style.display = "block"

    let paginaWeb = `https://api.exchangerate.host/timeseries?start_date=${fechaInicio}&end_date=${fechaFinal}&base=${monedaBase}&symbols=${monedaFuturo}`

    let arrayFechas
    let objetoUno
    fetch(paginaWeb)
    .then(response => response.json())
    .then(responseJSON => {
        objetoUno = responseJSON;
        arrayFechas = Object.keys(objetoUno.rates);
        let cotizacion = [];
        for(let tasa of Object.values(objetoUno.rates)){
            cotizacion.push(tasa[monedaFuturo])
        }
        grafico(arrayFechas, cotizacion, monedaBase)
    })
    .catch(error => console.error("error", error))

    



}