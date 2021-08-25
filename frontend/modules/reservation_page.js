import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {

    let res = await fetch(config.backendEndpoint + '/reservations/');
    let data = await res.json()
    return data
  } catch (err) {
    return null;

  }


  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations.length)
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length > 0) {
    document.getElementById('no-reservation-banner').style.display = 'none';
    document.getElementById('reservation-table-parent').style.display = 'block';

    reservations.forEach(reservation => {
      let table = document.getElementById('reservation-table');
      let element = document.createElement('tr');
      let actionButton = document.createElement('button')
      actionButton.className = 'reservation-visit-button'
      let date = new Date(reservation.date);
      let editDate = date.toLocaleDateString("en-IN");
      let time = new Date(reservation.time).toLocaleString("en-IN", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
      element.innerHTML = `<th scope="col">${reservation.id}</th>
      <td scope="col">${reservation.name}</td>
      <td scope="col">${reservation.adventureName}</td>
      <td scope="col">${reservation.person}</td>
      <td scope="col">${editDate}</td>
      <td scope="col">${reservation.price}</td>
      <td scope="col">${time}</td>
      <td><div class="reservation-visit-button" id=${reservation.id
        }><a href="../detail/?adventure=${reservation.adventure
        }">Visit Adventure</a></div></td>`
      table.appendChild(element)
    })
    // Cannot GET /deepakkomma-me_qtripdynamic/frontend/pages/adventures/detail/&adventure=2d2f409816925595
    // http://127.0.0.1:5500/deepakkomma-me_qtripdynamic/frontend/pages/adventures/detail/?adventure=2447910730
  } else {
    document.getElementById('no-reservation-banner').style.display = 'block';
    document.getElementById("reservation-table-parent").style.display = 'none';
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
