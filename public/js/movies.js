const selectdate = document.querySelector("#selectdate");
const today = new Date();

for (let i = 0; i <= 4; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = new Date(
    today.getTime() + i * 24 * 60 * 60 * 1000
  ).toDateString();
  selectdate.appendChild(option);
}

const hours_options = [
  { text: "12:00" },
  { text: "13:00" },
  { text: "14:30" },
  { text: "16:00" },
  { text: "18:15" },
  { text: "19:00" },
  { text: "22:00" },
];
const selecthour = document.querySelector("#selecthour");
for (let i = 0; i < hours_options.length; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = hours_options[i].text;
  selecthour.appendChild(option);
}
const posterContainer = document.querySelector(".poster-container");
const posterIndex = Math.floor(Math.random() * 7) + 1;
var poster = document.createElement("img");
poster.src = `../assets/posters/poster${posterIndex}.png`;
poster.className = "poster";
posterContainer.appendChild(poster);

//--------------------------------
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
  hours.forEach((hour) => {
    const optionElement = document.createElement("option");
    optionElement.value = hour;
    optionElement.textContent = hour;
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
        availableScreens[dateKey] = availableScreens[dateKey]
          ? [...availableScreens[dateKey], screenHour]
          : [screenHour];
      });
      renderDayOptions(availableScreens);
    },
    error: function (xhr, status, error) {
      console.log("AJAX request failed: " + error);
    },
  });
}
