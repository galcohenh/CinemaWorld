//socket
const screenService = require("../services/screen");

// only add the socket connection in the '/screen' route
// const io = require('socket.io')(http, {
//   path: '/screen/socket.io'
// });

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  socket.on("select-seat", (screenId, row, col, userId = socket.id, cb) => {
    screenService.addTakenSeat(screenId, { row, col, userId }).then((movie) => {
      cb();
      socket.to(screenId).emit("seat-taken", { row, col });
    });
  });

  socket.on("unselect-seat", (screenId, row, col, userId = socket.id, cb) => {
    screenService
      .removeTakenSeat(screenId, { row, col, userId })
      .then((movie) => {
        cb();
        socket.to(screenId).emit("seat-untaken", { row, col });
      });
  });

  socket.on("join-screen", (screenId) => {
    socket.join(screenId);
  });
});

module.exports = { screenSocket: io };
