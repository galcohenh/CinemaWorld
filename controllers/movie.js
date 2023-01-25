const Movie = require('../models/movie');
const movieService = require('../services/movie')
const hallService = require('../services/hall')

const index = async(req, res) => {
    const movies = await movieService.getMovies()
    res.render("../views/movies", { movies });
    // res.render("../views/movies", { movies: [{id:1, title:'tst', content: 'test'}] });
}

const createMovie = async (req, res) => {
    const {name, releaseDate, screens, genre, duration} = req.body;

    const screensWithRefToHalls = await Promise.all(screens.map(async screen => {
        const [hall] = await hallService.getHallByNumber(screen.hall.number);
        if (!hall) {
            return null;
        }
        
        return {
            ...screen,
            hall: hall._id
        }
    }));

    const hasNoMatchingHall = screensWithRefToHalls.some((screenWithRefToHall) => { 
        return !screenWithRefToHall
    });

    if (hasNoMatchingHall) {
        return res.status(404).json({ errors: ['Hall not found'] });
    }

    const newMovie = await movieService.createMovie(name, releaseDate, screensWithRefToHalls, genre, duration);
    res.json(newMovie);
};

const getMovie = async (req, res) => {
    const movie = await movieService.getMovieById(req.params.id);
    res.json(movie);
};

const getMovies = async (req, res) => {
    const movies = await movieService.getMovies();
    res.json(movies);
};

module.exports =  {
    index,
    getMovie,
    createMovie,
    getMovies
};