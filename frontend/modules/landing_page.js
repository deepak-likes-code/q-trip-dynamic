import config from "../conf/index.js";



// DOM Elements





async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  // Updates the DOM with the cities
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {

  try {
    const res = await fetch(config.backendEndpoint + '/cities');
    const data = await res.json()
    return data
  }
  catch (err) {
    return null
  }

  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let element = document.createElement('div')
  let img = document.createElement('img')
  let cityEl = document.createElement('div')
  let link = document.createElement('a');
  link.href = `pages/adventures/?city=${id}`

  cityEl.innerHTML = `<h4>${city}</h4>
  <h6>${description}</h6>`
  cityEl.classList.add('tile-text')
  img.src = image;
  element.appendChild(img);
  element.appendChild(cityEl)
  element.classList.add('tile')
  link.setAttribute('id', id)

  link.appendChild(element)
  document.querySelector('.container .row').appendChild(link)

}

export { init, fetchCities, addCityToDOM };
