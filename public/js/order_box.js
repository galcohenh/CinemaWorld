// var orderbox=document.getElementById('orderTicketsBox')
// var firstselect=document.getElementById('firstselect')
// var secondselect=document.getElementById('secondselect')
// var thirdselect=document.getElementById('thirdselect')
// var options=[{value:'movieA',text:'comedy'},{value:'movieB',text:'action'}]
// var today = new Date();
// var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
// var dayAfterTomorrow = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
// var nextDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

// var current = formatDate(today);
// var tomor = formatDate(tomorrow);
// var dayAfter = formatDate(dayAfterTomorrow);
// var next = formatDate(nextDate);
// console.log("current date: " + current);
// console.log("tomorrow's date: " + tomor);
// console.log("day after tomorrow's date: " + dayAfter);
// console.log("next date: " + next);

// function formatDate(date) {
//     var month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!

const selectdate = document.querySelector("#selectdate");
const today = new Date();

for (let i = 0; i <= 4; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)).toDateString();
  selectdate.appendChild(option);
}


const hours_options=[{text:'12:00'},{text:'13:00'},{text:'14:30'},{text:'16:00'},{text:'18:15'},{text:'19:00'},{text:'22:00'}]
const selecthour = document.querySelector("#selecthour");
for (let i = 0; i <hours_options.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = hours_options[i].text;
    selecthour.appendChild(option);
  }
  