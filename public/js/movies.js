console.log("hre");
const posterContainer = document.querySelector('.poster-container');
const posterIndex = Math.floor(Math.random() * 4) + 1;
var poster = document.createElement("img");
poster.src = `../assets/posters/poster${posterIndex}.png`
poster.className = "poster";
posterContainer.appendChild(poster);