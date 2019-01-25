const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
const users = require('./routes/users');

// Connect to Database: MongoDB
mongoose.connect(config.database, { useNewUrlParser: true });

// On Connection
mongoose.connection.on('connected', () => {
    let dbName = mongoose.createConnection(config.database, { useNewUrlParser: true }).name;
    console.log('Connected to Database ', dbName);
});

// On Db Connection error
mongoose.connection.on('error', () => {
    console.log('Database Connection Error');
});

// Port Connection
const port = 3000;

// CORS Middleware
app.use(cors());

require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Set Static Folder
app.use(express.static(__dirname + "/public/index.html"));

// Body Parser Middleware
app.use(bodyParser.json());

// Routes through express
app.use('/', users);

// Start Server
app.listen(port, () => {
    console.log('Server started on port', port);
});