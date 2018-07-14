const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// data base connection.
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


// define a test route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to AuthApp application. check user authentication quickly"});
});
require('./app/routes/auth.routes.js')(app);
require('./app/routes/group.routes.js')(app);
require('./app/routes/resource.routes.js')(app);
require('./app/routes/seed.routes.js')(app);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})
