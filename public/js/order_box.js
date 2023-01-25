var orderbox=document.getElementById('box')
var firstselect=document.getElementById('firstselect')
var secondselect=document.getElementById('secondselect')
var thirdselect=document.getElementById('thirdselect')
var options=[{value:'movieA',text:'comedy'},{value:'movieB',text:'action'}]
var today = new Date();
var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
var dayAfterTomorrow = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
var nextDate = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

var current = formatDate(today);
var tomor = formatDate(tomorrow);
var dayAfter = formatDate(dayAfterTomorrow);
var next = formatDate(nextDate);
console.log("current date: " + current);
console.log("tomorrow's date: " + tomor);
console.log("day after tomorrow's date: " + dayAfter);
console.log("next date: " + next);

function formatDate(date) {
    var month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var day = String(date.getDate()).padStart(2, '0');
    var year = date.getFullYear();
    return month + '/' + day + '/' + year;
}

var dateoptions=[{text:current},{text:tomor},{text:dayAfter},{text:next}]

var select = document.createElement("select");

var defaultOption = document.createElement("option");
defaultOption.text = "choose a movie please";
defaultOption.value = "";
defaultOption.disabled = true;
defaultOption.selected = true;
select.appendChild(defaultOption);

for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i].value;
    option.text = options[i].text;
    select.appendChild(option);
}
firstselect.appendChild(select)

var select2=document.createElement("select")
var datedefaultOption = document.createElement("option");
datedefaultOption.text = " ";
datedefaultOption.disabled = true;
datedefaultOption.selected = true;
select2.appendChild(datedefaultOption);
for (var i=0;i<dateoptions.length;i++){
    var option2=document.createElement("option")
    option2.text=dateoptions[i].text;
    select2.appendChild(option2)
}
secondselect.appendChild(select2)

hours_options=[{text:'12:00'},{text:'13:00'},{text:'14:30'},{text:'16:00'},{text:'18:15'},{text:'19:00'},{text:'22:00'}]

var select3=document.createElement("select")

var hourdefaultOption = document.createElement("option");
hourdefaultOption.text = " ";
hourdefaultOption.disabled = true;
hourdefaultOption.selected = true;
select3.appendChild(hourdefaultOption);

for (var i=0;i<hours_options.length;i++){
    var option3=document.createElement("option")
    option3.text=hours_options[i].text;
    select3.appendChild(option3)
}
thirdselect.appendChild(select3)

select2.disabled=true;
select3.disabled=true;
select.addEventListener('change',function(){
select2.disabled=false;
datedefaultOption.text="choose a date please"
})
select2.addEventListener('change',function(){
    select3.disabled=false;
    hourdefaultOption.text="choose time please"
    })