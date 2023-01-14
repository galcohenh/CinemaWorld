const seatsSelected = document.getElementById('seatsSelected');
const allSeats = document.querySelector('.all-seats');
const nextBtn = document.getElementById('next-btn');

let numOfSelected = 0;

createTable(5, 10);

const selectSeat = (seat) => {
  seat.classList.toggle('selected');
  const selectedSeats = document.querySelectorAll(
    '.all-seats .seat.selected:not(.taken)'
  );
  numOfSelected = selectedSeats.length;
  seatsSelected.innerText = numOfSelected;
  if (numOfSelected > 0) {
    nextBtn.classList.add('next-btn')
    nextBtn.classList.remove('next-btn-disabled')
  }
  else {
    nextBtn.classList.remove('next-btn')
    nextBtn.classList.add('next-btn-disabled')
  }
};

allSeats.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('taken')
  ) {
    selectSeat(e.target);
  }
});

function createTable(width, length) {
  allSeats.classList.add("all-seats");
  const screen = document.createElement("div");
  screen.classList.add("screen");
  allSeats.appendChild(screen);

  for (let i = 0; i < width; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < length; j++) {
          const seat = document.createElement("div");
          seat.classList.add("seat");
          // seat.classList.add("taken");
          row.appendChild(seat);
      }
      allSeats.appendChild(row);
  }
}