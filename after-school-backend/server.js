require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

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