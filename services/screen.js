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

// const createScreen = async (time, hall, takenSeats) => {
//     const movie = new Article({
//         time: time,
//         hall: hall,
//         takenSeats: takenSeats
//     });

//     const hallRef = hallService.createHall(hall);

//     hallRef.save(function(err) {
//         Model1(data)
//     });

//     function CreateModel1WithStuff(data, cb) {
//         if (data.child) { // Save child model first
//             data.child = Model2(data.child);
//             data.child.save(function(err) {
//                 cb(err, err ? null : Model1(data));
//             });
//         } else { // Proceed without dealing with child
//             cb(null, Model1(data));
//         }
//     }

//     return await movie.save();
// };

module.exports = {
  getMovieScreen,
  addTakenSeat,
  removeTakenSeat,
};
