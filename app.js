const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customEnv = require('custom-env');

const {router, apiRouter} = require('./routes/movie')

customEnv.env(process.env.NODE_ENV, './config');

mongoose.connect('mongodb://127.0.0.1:27017',//process.env.CONNECTION_STRING, 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true });

var app = express();

//Adding ejs
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/public'));

//Initialize server
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

//Routes
app.use('/', require('./routes/movie'));
app.use('/screen', require('./routes/screen'));

app.listen(process.env.PORT || 8080); 