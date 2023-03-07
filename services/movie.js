const mongoose = require("mongoose");

const Movie = require("../models/movie");

const createMovie = async (
  name,
  releaseDate,
  screens,
  genre,
  duration,
  img
) => {
  const movie = new Movie({
    name: name,
    releaseDate: releaseDate,
    screens,
    genre: genre,
    duration: duration,
    img: img,
  });

  return await movie.save();
};

const getMovieById = async (id) => {
  return await Movie.findById(id).populate("screens.hall");
};

const getMovieByScreenId = async (screenId) => {
  const screenIdAsObjectId = mongoose.Types.ObjectId(screenId);

  const movie = await Movie.find({ "screens._id": screenIdAsObjectId }).populate(
    "screens.hall"
  );

  return movie;
};

const getMovies = async (page) => {
  if (page) {
    const pageSize = process.env.AMOUNT_OF_MOVIES_PER_RESPONSE || 4;
    return await Movie.find({})
      .sort({ _id: 1 })
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * pageSize)
      .populate("screens.hall");
  }

  return await Movie.find({}).sort({ _id: 1 }).populate("screens.hall");
};

const updateMovie = async (id, name, releaseDate, screens, genre, duration) => {
  const movie = await getMovieById(id);
  if (!movie) {
    return null;
  }

  movie.name = name;
  movie.releaseDate = releaseDate;
  movie.screens = screens;
  movie.genre = genre;
  movie.duration = duration;
  await movie.save();

  return movie;
};

const deleteMovie = async (id) => {
  const movie = await getMovieById(id);
  if (!movie) return null;

  await movie.remove();
  return movie;
};

module.exports = {
  createMovie,
  getMovieById,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovieByScreenId,
};
