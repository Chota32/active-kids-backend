require('dotenv').config();
const path = require('path');
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

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

const client = new MongoClient(process.env.MONGODB_URI);
let db;

app.get('/', (req, res) => res.send('Server is running'));

const PORT = process.env.PORT || 3000;

client.connect()
  .then(() => {
    db = client.db('afterschool');
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  })
  .catch(err => console.error('MongoDB connection failed:', err));