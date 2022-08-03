
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose'); 


// Initialize the Express App
const app = express();



// Comfigure App Settings
require('dotenv').config();   
const { PORT = 4000, MONGODB_URL } = process.env;

// Connect to mongoDB
mongoose.connect(MONGODB_URL);

// Mongo Status Listeners
mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB: ' +err.message))


// Mount Middleware
 

// Mount Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Tell Express to Listen
app.listen(PORT, () => {
    console.log(`Express is listening of port:${PORT}`);
});