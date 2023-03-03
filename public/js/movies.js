const posterContainer = document.querySelector(".poster-container");
const posterIndex = Math.floor(Math.random() * 7) + 1;
var poster = document.createElement("img");
poster.src = `../assets/posters/poster${posterIndex}.png`;
poster.className = "poster";
// posterContainer.appendChild(poster);

//--------------------------------
function redirectToScreenPage(movieId, time) {
  const queryString =
    "?id=" + encodeURIComponent(movieId) + "&time=" + encodeURIComponent(time);

  window.location.href = "/screen" + queryString;
}

$(document).ready(function () {
  $(".order-tickets-form").submit(function (event) {
    event.preventDefault();

    var movieId = $("#selectmovie").val();
    var time = $("#selecthour").val();

    redirectToScreenPage(movieId, time);
  });
});

function renderDayOptions(screens) {
  Object.keys(screens).forEach((screenDay) => {
    const optionElement = document.createElement("option");
    optionElement.value = screenDay;
    optionElement.textContent = screenDay;
    $("#selectdate").append(optionElement);
  });

  $("#selectdate").change((e) => {
    const selectedDay = e.target.value;
    renderHours(screens[selectedDay]);
  });
}

function renderHours(hours) {
  hours.forEach((screenHour) => {
    const optionElement = document.createElement("option");
    optionElement.value = screenHour.fullDate;
    optionElement.textContent = screenHour.hour;
    $("#selecthour").append(optionElement);
  });
}

function onSelectMovieSearch(e) {
  let availableScreens = {};
  const selectedMovieId = e.target.value;
  $.ajax({
    url: `/api/movies/${selectedMovieId}`,
    method: "GET",
    dataType: "json",
    success: function (response) {
      response.screens.forEach((screen) => {
        const dateOfScreen = new Date(screen.time);
        const dateKey = `${dateOfScreen.getDate()}/${dateOfScreen.getMonth()}`;
        const screenHour = `${dateOfScreen.getHours()}:${dateOfScreen.getMinutes()}`;
        availableScreen = { hour: screenHour, fullDate: screen.time };
        availableScreens[dateKey] = availableScreens[dateKey]
          ? [...availableScreens[dateKey], availableScreen]
          : [availableScreen];
      });
      renderDayOptions(availableScreens);
    },
    error: function (xhr, status, error) {
      console.log("AJAX request failed: " + error);
    },
  });
}
