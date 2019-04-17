const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/department-route');
const connection = mongoose.connection;


// Connecting to our database
mongoose.connect('mongodb://localhost:27017/departments', { useNewUrlParser:true});
connection.once('open', function()
{
    console.log("MongoDB database connection Successful.");
});
// Making our app use the middlwares we just specified at the top
app.use(cors());
app.use(bodyParser.json());
// using our router
app.use('/departments', router);


// use port 4000
const port = 4000
// Printed message when connected
app.listen(port, ()=> console.log(`Listening on port ${port}...`))