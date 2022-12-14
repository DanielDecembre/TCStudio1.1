
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose'); 
const morgan = require('morgan')
const cors = require('cors');

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


// Set up our Model
const memberSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
}, {timestamps: true});

const Member = mongoose.model('Member', memberSchema);

// Mount Middleware
 app.use(cors());  // Access-Control-Allow: '*'
 app.use(morgan('dev'));
 app.use(express.json()); 
 // this creates req.body from incoming JSON request bodies
 //app.use(express.urlencoded({ extended: false }))
 // only when express is serving HTML




// Mount Routes
app.get('/', (req, res) => {
    res.send('Hello and welcome to the TCStuidio app');
});

// Index
app.get('/member', async (req, res) => {
    try {
        const member = await Member.find({});
        res.json(member);
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Create 
app.post('/member', async (req, res) => {
    try {
        res.json(await Member.create(req.body));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Update 
app.put('/member/:id', async (req, res) => {
    try {
        res.json(await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ));

    } catch (error) {
        console.log('error:', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Delete
app.delete('/member/:id', async (req, res) => {
    try {
        res.json(await Member.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.log('error:', error);
        res.json({error: 'something went wrong - check console'});
    }
});



// Tell Express to Listen
app.listen(PORT, () => {
    console.log(`Express is listening of port:${PORT}`);
});