require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db;

// Logger middleware: prints every request to the console
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url, req.body || '');
  next();
});

// Static file middleware: returns lesson images, or an error if not found
app.use('/images', (req, res) => {
  res.sendFile(req.path, { root: path.join(__dirname, 'images') }, (err) => {
    if (err) {
      res.status(404).json({ error: 'Image not found: ' + req.path });
    }
  });
});

// GET /lessons: return all lessons as JSON
app.get('/lessons', (req, res) => {
  db.collection('lesson').find({}).toArray()
    .then(lessons => res.json(lessons))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Connect to MongoDB, then start the server
const PORT = process.env.PORT || 3000;

client.connect()
  .then(() => {
    db = client.db('activekids');
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  })
  .catch(err => console.error('MongoDB connection failed:', err));