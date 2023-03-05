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

module.exports = {
  index,
};
