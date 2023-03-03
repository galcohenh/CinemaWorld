const screenService = require("../services/screen");
const hallService = require("../services/hall")

const index = async (req, res) => {
  const screen = await screenService.getMovieScreen(
    req.query.id,
    req.query.time
  );
  res.render("../views/screen", {
    seats: [],
    screen,
  });
};

module.exports = {
  index,
};
