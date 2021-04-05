//Eventos de window y document
window.onload = crearContenido()

//Hoisting
//Funciones asincronas
async function crearContenido(){
    //Bloque try / catch
    try{
        //Obtener datos de la API
        const response = await fetch('https://gateway.marvel.com/v1/public/characters?ts=1&limit=30&apikey=7e99323b2679072c3e1119052f1aca13&hash=779d449f29c113e00feddbada3e680af')
        const data = await response.json()
        const items = data.data.results

        //Obtener Div del DOM
        const contenedor = document.getElementById('marvel-row')

        //Insertar heroes en el DOM
        items.forEach((hero => {
            contenedor.appendChild(crearHeroe(hero))
        }))

    }catch(error){
        errorHandler(error)
    }
}

function crearHeroe (hero) {
    console.log(hero)
    const div = document.createElement('div')
    div.classList.add('item')

    const a = document.createElement('a')
    a.href = hero.urls[0].url
    a.target="_blank"

    const h3 = document.createElement('h3')
    h3.classList.add('title')
    h3.textContent = hero.name

    const img = document.createElement('img')
    img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`

    a.appendChild(img)
    div.appendChild(a)
    div.appendChild(h3)
    return div
}

function errorHandler(error){
    console.log(error)
}