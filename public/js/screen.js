const seatsSelected = document.getElementById('seatsSelected');
const allSeats = document.querySelector('.all-seats');
const nextBtn = document.getElementById('next-btn');

let numOfSelected = 0;

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
