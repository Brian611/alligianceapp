const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const configuration = require('./configuration/database');

mongoose.Promise = Promise;

mongoose.connect(configuration.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

mongoose.connection.on('connected', () => {
    console.log('Connected to db : ', configuration.database);
});

mongoose.connection.on('error', (error) => {
    console.log('Error trying to connect to db : ', error);
});

const app = express();

const users = require('./routes/users');

const port = 3000 | process.env.PORT;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./configuration/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server running on : ', port);
});