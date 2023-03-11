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

function loadPanel(panelUrl) {
    const adminPanel = document.getElementById('admin-panel');
    $.ajax({
        url: panelUrl,
        method: "GET",
        success: function (response) {
            adminPanel.innerHTML = response;
            loadScripts(panelUrl)
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

function loadScripts(panelUrl)
{
    if(panelUrl === 'admin/manageMoviesForm') {
        loadTable();
    }
}

function loadTable() {
    var tableBody = document.querySelector("#movie-table tbody");
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
    });
}
