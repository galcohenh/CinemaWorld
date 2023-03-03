// const Screen = require('../models/Screen');
// const hallService = require('./hall');
const movieService = require("../services/movie");

const getMovieScreen = async (movieId, time) => {
  const timeDateObject = new Date(time);
  const movie = await movieService.getMovieById(movieId);
  const screen = movie.screens.find((screen) => {
    return screen.time.getTime() == timeDateObject.getTime();
  });
  return screen;
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
};
