const Movie = require('../models/movie');

const index = (req, res) => {
    res.render("../views/screen", { seats: [] });
}

module.exports =  {
    index
};