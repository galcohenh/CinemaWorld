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

const groupMoviesByGenre = async (selectedGenre) => {
  const pipeline = [
    {
      $match: {
        genre: selectedGenre,
      },
    },
    {
      $group: {
        _id: "$genre",
        movies: {
          $push: {
            _id: "$_id",
            name: "$name",
            releaseDate: "$releaseDate",
            screens: "$screens",
            genre: "$genre",
            duration: "$duration",
            img: "$img",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        movies: 1,
      },
    },
  ];

  const movies = await Movie.aggregate(pipeline);
  return movies[0].movies;
};


module.exports = {
  createMovie,
  getMovieById,
  getMovies,
  updateMovie,
  deleteMovie,
  groupMoviesByGenre
};
