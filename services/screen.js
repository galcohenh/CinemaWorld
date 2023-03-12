const movieService = require("../services/movie");

const getMovieScreen = async (movieId, time) => {
  const timeDateObject = new Date(time);
  const movie = await movieService.getMovieById(movieId);
  const screen = movie.screens.find(
    (screen) => screen.time.getTime() == timeDateObject.getTime()
  );
  return screen;
};

const addTakenSeat = async (screenId, seat) => {
  const movie = await updateTakenSeats(screenId, (takenSeats) => [
    ...takenSeats,
    seat,
  ]);

  return movie;
};

const removeTakenSeat = async (screenId, seat) => {
  const movie = await updateTakenSeats(screenId, (takenSeats) =>
    takenSeats.filter(
      (takenSeat) => !(takenSeat.row === seat.row && takenSeat.col === seat.col)
    )
  );

  return movie;
};

const updateTakenSeats = async (screenId, updateCb) => {
  try {
    const [movie] = await movieService.getMovieByScreenId(screenId);

    if (!movie) {
      throw new Error(`No movie found for screen ID ${screenId}`);
    }

    const screen = movie.screens.find(
      (screen) => screen._id.toString() === screenId
    );

    if (!screen) {
      throw new Error(
        `No screen found with ID ${screenId} in movie ${movie._id}`
      );
    }

    screen.takenSeats = updateCb(screen.takenSeats);

    await movie.save();

    return movie;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addScreen = async (movieId, time, hallId) => {
  const screen = {
    time: time,
    hall: hallId,
    takenSeats: [{}]
  }
  const movie = await movieService.getMovieById(movieId);
  if (!movie) {
    return null;
  }
  movie.screens = [ ...movie.screens, screen ]
  await movie.save();
  return screen;
};

module.exports = {
  getMovieScreen,
  addTakenSeat,
  removeTakenSeat,
  addScreen
};
