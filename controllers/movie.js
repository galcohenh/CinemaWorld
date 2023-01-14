const Movie = require('../models/movie');

const index = (req, res) => {
    // res.render("../views/movies", { movies: Movie.getMovies() });
    res.render("../views/movies", { movies: [{id:1, title:'tst', content: 'test'}] });
}

module.exports =  {
    index
};