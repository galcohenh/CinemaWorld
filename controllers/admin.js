
const index = (req, res) => {
    res.render("../views/admin.ejs");
}

const createMovieForm = (req, res) => {
    res.render("../views/create-movie-form.ejs");
}

const manageMoviesForm = (req, res) => {
    res.render("../views/manage-movies-form.ejs");
}

module.exports =  {
    index, createMovieForm, manageMoviesForm
};