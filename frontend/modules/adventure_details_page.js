import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search.split('=')[1])
  return search.split('=')[1]

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {

    let res = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`)
    let data = await res.json()
    console.log(data)
    return data
  } catch (err) {

    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let detailCard = document.getElementById('adventure-detail-card')
  let heading = document.getElementById('adventure-name')
  let adventureSubtitle = document.getElementById('adventure-subtitle')
  let content = document.getElementById('adventure-content')
  let photoGallery = document.getElementById('photo-gallery');
  let photosArray = adventure.images;


  photosArray.forEach(photo => {
    let img = document.createElement('img')
    img.src = photo;
    img.className = 'activity-card-image'
    photoGallery.appendChild(img)
  })

  heading.innerHTML = adventure.name;
  adventureSubtitle.innerHTML = adventure.subtitle;
  content.innerText = adventure.content



}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS

  let gallery = document.getElementById('photo-gallery')
  let carouselInner = document.createElement('div')
  carouselInner.className = 'carousel-inner'

  gallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  
  <a class="carousel-control-prev" id='carousel-prev' href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`
  console.log(images)
  images.forEach((image, index) => {
    let imgDiv = document.createElement('div')

    if (index == 0) {
      imgDiv.className = 'carousel-item active'
      imgDiv.innerHTML = `<img class="d-block w-100" src=${image} alt="First slide">`;

      carouselInner.appendChild(imgDiv)
    } else {

      imgDiv.className = 'carousel-item '
      imgDiv.innerHTML = `<img class="d-block w-100" src=${image} alt="First slide">`;

      carouselInner.appendChild(imgDiv)
    }

  })


  let aTag = document.getElementById('carousel-prev')
  let carousel = document.getElementById('carouselExampleIndicators')
  carousel.insertBefore(carouselInner, aTag)
  // gallery.appendChild(carouselInner)
  // 1. Add the bootstrap carousel to show the Adventure images


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS

  console.log(adventure)
  // 1. If the adventure is already reserved, display the sold-out message.

  if (adventure.available) {
    let soldOut = document.getElementById('reservation-panel-sold-out');
    let costPerHead = document.getElementById('reservation-person-cost');
    let reservationPanel = document.getElementById('reservation-panel-available')
    soldOut.style.display = 'none'
    reservationPanel.style.display = 'block'
    costPerHead.innerHTML = adventure.costPerHead

  } else {
    let reservationPanel = document.getElementById('reservation-panel-available')
    let soldOut = document.getElementById('reservation-panel-sold-out');

    reservationPanel.style.display = 'none'
    soldOut.style.display = 'block'
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let totalCost = document.getElementById('reservation-cost')
  totalCost.innerHTML = +costPerHead * +persons

}

// Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  let form = document.getElementById('myForm');
  $('#myForm').on("submit", (e) => {
    e.preventDefault()
    var data = $('#myForm').serialize() + "&adventure=" + adventure.id;
    let url = config.backendEndpoint + '/reservations/new'
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function (response) {
        alert("Success!");
        window.location.reload();
      },
      error: function () {
        window.alert('Failed!')
        alert('Failed!')
      }
    })
  })



  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById('reserved-banner').style.display = 'block'
  } else {
    document.getElementById('reserved-banner').style.display = 'none'
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
