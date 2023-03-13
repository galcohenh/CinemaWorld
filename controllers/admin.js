
const index = (req, res) => {
    res.render("../views/admin.ejs");
}

const createMovieForm = (req, res) => {
    res.render("../views/admin-forms/create-movie-form.ejs");
}

const manageMoviesForm = (req, res) => {
    res.render("../views/admin-forms/manage-movies-form.ejs");
}

const createScreenForm = (req, res) => {
    res.render("../views/admin-forms/create-screen-form.ejs");
}

const manageScreensForm = (req, res) => {
    res.render("../views/admin-forms/manage-screens-form.ejs");
}

const createHallForm = (req, res) => {
    res.render("../views/admin-forms/create-hall-form.ejs");
}

const manageHallsForm = (req, res) => {
    res.render("../views/admin-forms/manage-halls-form.ejs");
}

module.exports =  {
    index, createMovieForm, manageMoviesForm, createScreenForm, manageScreensForm, createHallForm, manageHallsForm
};