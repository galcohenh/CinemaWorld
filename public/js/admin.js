function createMovie() {
    const name = document.getElementById('name').value;
    const releaseDate = document.getElementById('release-date').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const imgUrl = document.getElementById('img-url').value;

    if (name === '' || releaseDate === '' || genre === '' || duration === '' || imgUrl === '') {
        alert("Please fill all fields");
        return;
    }

    const data = {
        name,
        releaseDate,
        genre: genre.split(','),
        duration: parseInt(duration),
        img: imgUrl,
        screens: []
    }
    $.ajax({
        url: `/api/movies`,
        method: "POST",
        dataType: "json",
        data: data,
        success: function (response) {
            updateMovies();
            loadPanel('admin/manageMoviesForm')
            alert("Movie was updated successfuly");
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

function updateMovies() {
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
}

function updateHalls() {
    $.ajax({
        url: `/halls`,
        method: "GET",
        dataType: "json",
        success: function (response) {
            halls = response;
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

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

function initNavBarElements() {
    const navBar = document.getElementById('navbar');
    const navbarElements = navBar.getElementsByTagName("a")
    for (let i = 0; i < navbarElements.length; i++) {
        navbarElements[i].classList = ["unselected-nav"];
    }
}

function loadPanelElements(panelUrl) {
    initNavBarElements();
    let adminPanel;

    if (panelUrl === 'admin/createMovieForm') {
        adminPanel = document.getElementById('createMovieFormLink');
    }
    else if (panelUrl === 'admin/manageMoviesForm') {
        adminPanel = document.getElementById('manageMoviesFormLink');
        loadMovieTable();
    }
    else if (panelUrl === 'admin/createScreenForm') {
        adminPanel = document.getElementById('createScreenFormLink');
        loadCreateScreenForm();
    }
    else if (panelUrl === 'admin/manageScreensForm') {
        adminPanel = document.getElementById('manageScreensFormLink');
        loadScreensTable();
    }
    else if (panelUrl === 'admin/createHallForm') {
        adminPanel = document.getElementById('createHallFormLink');
    }
    else if (panelUrl === 'admin/manageHallsForm') {
        adminPanel = document.getElementById('manageHallsFormLink');
    }

    adminPanel.classList = ["selected-nav"];
}

function loadMovieTable() {
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

        var oprCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => { deleteMovie(movie._id) }
        oprCell.appendChild(button);
        row.appendChild(oprCell);

        tableBody.appendChild(row);
    });
}

function loadCreateScreenForm() {
    let selectMovie = document.getElementById('create-screen-select-movie');
    selectMovie.innerHTML = "<option selected value=''>choose a movie</option>";
    movies.forEach(movie => {
        const movieOption = document.createElement("option");
        movieOption.value = movie._id;
        movieOption.text = `${movie._id} - ${movie.name}`
        selectMovie.appendChild(movieOption);
    });
    let selectHall = document.getElementById('create-screen-select-hall');
    selectHall.innerHTML = "<option selected value=''>choose a hall</option>";
    halls.forEach(hall => {
        const hallOption = document.createElement("option");
        hallOption.value = hall._id;
        hallOption.text = `No.${hall.number}`
        selectHall.appendChild(hallOption);
    });
}


function loadScreensTable() {
    var tableBody = document.querySelector("#screens-table tbody");
    tableBody.innerHTML = "";
    movies.forEach(function (movie) {
        movie.screens.forEach(function (screen) {
            var row = document.createElement("tr");
            var movieCell = document.createElement("td");
            movieCell.textContent = movie.name;
            row.appendChild(movieCell);
    
            var timeCell = document.createElement("td");
            timeCell.textContent = screen.time;
            row.appendChild(timeCell);
    
            var hallCell = document.createElement("td");
            const hall = halls.find(hall => hall._id == screen.hall._id);
            hallCell.textContent = hall.number;
            row.appendChild(hallCell);
    
            var oprCell = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "Delete";
            button.onclick = () => { deleteScreen(movie._id, screen._id) }
            oprCell.appendChild(button);
            row.appendChild(oprCell);
    
            tableBody.appendChild(row);
        });
    });
}

function deleteMovie(movieId) {
    $.ajax({
        url: `api/movies/${movieId}`,
        method: "DELETE",
    });
    const movieIndex = movies.findIndex(movie => movie._id === movieId);
    if (movieIndex > -1) {
        movies.splice(movieIndex, 1);
        loadMovieTable();
    }
}

function deleteScreen(movieId, screenId) {
    $.ajax({
        url: '/screen',
        method: "DELETE",
        data: {
            movieId: movieId,
            screenId: screenId
        }
    });
    const movieIndex = movies.findIndex(movie => movie._id === movieId);
    if (movieIndex > -1) {
        const screenIndex = movies[movieIndex].screens.findIndex(screen => screen._id === screenId);
        if (screenIndex > -1) {
            console.log(movies[movieIndex].screens);
            movies[movieIndex].screens.splice(screenIndex, 1);
            console.log(movies[movieIndex].screens);
            loadScreensTable();
        }
    }
}

function addScreen() {
    const movieId = document.getElementById('create-screen-select-movie').value;
    const time = document.getElementById('time').value;
    const hallId = document.getElementById('create-screen-select-hall').value;

    if (movieId === '' || time === '' || hallId === '') {
        alert("Please fill all fields");
        return;
    }

    const screen = {
        movieId: movieId,
        time: time,
        hallId: hallId,
    }

    $.ajax({
        url: `/screen`,
        method: "POST",
        dataType: "json",
        data: screen,
        success: function (response) {
            updateMovies();
            loadPanel('admin/manageScreensForm')
            alert("Screen was updated successfuly");
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

let movies = [];
updateMovies();
let halls = [];
updateHalls();
loadPanel('admin/createMovieForm')