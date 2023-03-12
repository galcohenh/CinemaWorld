const screenService = require("../services/screen");
const movieService = require("../services/movie");

const index = async (req, res) => {
  const [movie] = await movieService.getMovieByScreenId(req.query.screenId);
  const screen = movie.screens.find(
    (screen) => screen.id.toString() == req.query.screenId
  );
  res.render("../views/screen", {
    seats: [],
    screen,
  });
};

const addScreen = async (req, res) => {
  const newScreen = await screenService.addScreen(req.body.movieId, req.body.time, req.body.hallId);
  res.json(newScreen);
};


module.exports = {
  index, addScreen
};
