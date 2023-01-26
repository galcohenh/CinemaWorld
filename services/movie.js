const Movie = require('../models/movie');

const createMovie = async (name, releaseDate, screens, genre, duration, img) => {

    const movie = new Movie({
        name: name,
        releaseDate: releaseDate,
        screens,
        genre: genre,
        duration: duration,
        img: img
    });

    return await movie.save();
};

const getMovieById = async (id) => {
    return await Movie.findById(id);
};

const getMovies = async () => {
    return await Movie.find({}).populate('screens.hall');
};

const updateMovie = async (id, name, releaseDate, screens, genre, duration) => {
    const movie = await getMovieById(id);
    if (!movie) {
        return null;
    }

    movie.name = name;
    movie.releaseDate = releaseDate;
    movie.screens = screens;
    movie.genre = genre;
    movie.duration = duration;
    await movie.save();

    return movie;
};

const deleteMovie = async (id) => {
    const movie = await getMovieById(id);
    if (!movie)
        return null;

    await movie.remove();
    return movie;
};

module.exports = {
    createMovie,
    getMovieById,
    getMovies,
    updateMovie,
    deleteMovie
}