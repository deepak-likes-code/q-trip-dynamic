
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  let city = search.split('=')[1]

  return city
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {

    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json()

    return data
  } catch (err) {
    return null
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES

  adventures.forEach(adventure => {
    let dom = document.getElementById('data')
    let link = document.createElement('a');
    link.innerHTML = `<a href="detail/?adventure=${adventure.id}" id="${adventure.id}" class="activity-card">
    <img src="${adventure.image}">
    <div class="category-banner">${adventure.category}</div>
    <div class="adventure-page-text">
    <p>${adventure.name}</p>
    <p>${adventure.costPerHead}</p>
    </div>
    <div class="adventure-page-text">
    <p>Duration</p>
    <p>${adventure.duration} Hours</p>
    </div>
    </a>`

    dom.appendChild(link)
  })


  // 1. Populate the Adventure Cards and insert those details into the DOM


  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {

  // 1. Filter adventures based on Duration and return filtered list

  return list.filter(item => item.duration >= low && item.duration <= high)
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(item => categoryList.includes(item.category))

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {


  let filteredList = [];

  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem('filters', JSON.stringify({ duration: "", category: [] }))


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filters = localStorage.getItem('filters')
  return JSON.parse(filters)


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills

  filters['category'].forEach(item => {
    let dom = document.getElementById('category-list')
    let filterpill = document.createElement('div')
    filterpill.innerText = item
    filterpill.className = 'category-filter';
    dom.appendChild(filterpill)

  })


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
