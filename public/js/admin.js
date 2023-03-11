const onCreateMovie = () => {
    const name = document.getElementById('name').value;
    const releaseDate = document.getElementById('release-date').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const imgUrl = document.getElementById('img-url').value;

    const time = document.getElementById('time').value;
    const hall = document.getElementById('hall').value;
    // const screens = document.getElementById('screens').value;


    const data = {
        name,
        releaseDate,
        genre: genre.split(','),
        duration: parseInt(duration),
        img: imgUrl,
        screens: [{
            time: time,
            hall: { number: parseInt(hall) },
            takenSeats: [{}]
        }]
    }

    fetch('http://localhost:8080/api/movies', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        }
    })
    // console.log({name, releaseDate, genre, duration, imgUrl, screens})
}

let movies = [];
$.ajax({
    url: `/api/movies`,
    method: "GET",
    dataType: "json",
    success: function (response) {
        movies = response;
    },
    error: function (xhr, status, error) {
        console.log("AJAX request failed: " + error);
    },
});
loadPanel('admin/createMovieForm')

function loadPanel(panelUrl) {
    const adminPanel = document.getElementById('admin-panel');
    $.ajax({
        url: panelUrl,
        method: "GET",
        success: function (response) {
            adminPanel.innerHTML = response;
            loadPanelElements(panelUrl)
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

function initNavBarElements()
{
    const navBar = document.getElementById('navbar');
    const navbarElements = navBar.getElementsByTagName("a")
    for (let i = 0; i < navbarElements.length; i++) {
        navbarElements[i].classList = ["unselected-nav"];
    }
}

function loadPanelElements(panelUrl)
{
    initNavBarElements();

    if(panelUrl === 'admin/createMovieForm') {
        const adminPanel = document.getElementById('createMovieFormLink');
        adminPanel.classList = ["selected-nav"];
    }
    else if(panelUrl === 'admin/manageMoviesForm') {
        const adminPanel = document.getElementById('manageMoviesFormLink');
        adminPanel.classList = ["selected-nav"];
        loadTable();
    }
}

function loadTable() {
    var tableBody = document.querySelector("#movie-table tbody");
    tableBody.innerHTML = "";
    movies.forEach(function (movie) {
        var row = document.createElement("tr");

        var nameCell = document.createElement("td");
        nameCell.textContent = movie.name;
        row.appendChild(nameCell);

        var releaseDateCell = document.createElement("td");
        releaseDateCell.textContent = movie.releaseDate;
        row.appendChild(releaseDateCell);

        var genreCell = document.createElement("td");
        genreCell.textContent = movie.genre.join(", ");
        row.appendChild(genreCell);

        var durationCell = document.createElement("td");
        durationCell.textContent = movie.duration + " hours";
        row.appendChild(durationCell);

        var imgCell = document.createElement("td");
        imgCell.textContent = movie.img;
        row.appendChild(imgCell);

        tableBody.appendChild(row);

        var oprCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => {deleteMovie(movie._id)}
        oprCell.appendChild(button);
        row.appendChild(oprCell);

        tableBody.appendChild(row);
    });
}

function deleteMovie(movieId)
{
    $.ajax({
        url: `api/movies/${movieId}`,
        method: "DELETE",
    });
    const movieIndex = movies.findIndex(movie => movie._id === movieId);
    if (movieIndex > -1) {
        movies.splice(movieIndex, 1);
        loadTable();
    }
}