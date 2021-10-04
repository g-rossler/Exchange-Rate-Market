let objeto;

fetch("http://api.exchangeratesapi.io/v1/latest?access_key=2b9ffe353611a53c200df5759283cc85")
    .then(response => response.json())
    .then(responseJSON => {
        objeto = responseJSON;
        console.log(responseJSON)})
    .catch(error => console.error("error", error))


console.log(objeto)


