const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { screenSocket } = require("./sockets/screen");

const env = process.env.NODE_ENV || "local";

dotenv.config({ path: __dirname + `/config/.env.${env}` });

const { router: movieRouter } = require("./routes/movie");

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

//Adding ejs
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.use(express.static(__dirname + "/public"));

//Initialize server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/", movieRouter);
app.use("/screen", require("./routes/screen"));
app.use("/order", require("./routes/order_tickets"));
app.use("/admin", require("./routes/admin"));
app.use("/halls", require("./routes/halls"));
app.use("/about", require("./routes/about"));

//sockets
const http = require("http").Server(app);
app.set("io", screenSocket);

http.listen(process.env.PORT || 8080);

// app.listen(process.env.PORT || 8080);
