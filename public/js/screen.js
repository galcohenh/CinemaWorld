const seatsSelected = document.getElementById("seatsSelected");
const allSeats = document.querySelector(".all-seats");
const nextBtn = document.getElementById("next-btn");

let numOfSelected = 0;

const selectSeat = (seat) => {
  seat.classList.toggle("selected");
  const selectedSeats = document.querySelectorAll(
    ".all-seats .seat.selected:not(.taken)"
  );
  numOfSelected = selectedSeats.length;
  seatsSelected.innerText = numOfSelected;
  if (numOfSelected > 0) {
    nextBtn.classList.add("next-btn");
    nextBtn.classList.remove("next-btn-disabled");
  } else {
    nextBtn.classList.remove("next-btn");
    nextBtn.classList.add("next-btn-disabled");
  }
};

const urlParams = new URLSearchParams(window.location.search);
const screenId = urlParams.get("screenId");

var socket = io("http://localhost:3000");

socket.on("connect", () => {
  socket.emit("join-screen", screenId);
});

socket.on("seat-taken", ({ row, col }) => {
  const newTakenSeat = document.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
  newTakenSeat.classList.add("taken");
});

socket.on("seat-untaken", ({ row, col }) => {
  const newTakenSeat = document.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
  newTakenSeat.classList.remove("taken");
});

var seats = document.querySelectorAll(".seat");
seats.forEach(function (seat) {
  seat.addEventListener("click", function (e) {
    var row = parseInt(this.dataset.row);
    var col = parseInt(this.dataset.col);
    if (!this.classList.contains("taken")) {
      if (!this.classList.contains("selected")) {
        socket.emit("select-seat", screenId, row, col, "tempUserId", () =>
          selectSeat(e.target)
        );
      } else {
        socket.emit("unselect-seat", screenId, row, col, "tempUserId", () =>
          selectSeat(e.target)
        );
      }
    }
  });
});
