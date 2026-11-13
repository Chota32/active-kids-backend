require('dotenv').config();
const { MongoClient } = require('mongodb');

const lessons = [
  { topic: 'Maths',    location: 'Port Louis',    price: 100, space: 5, image: 'maths.jpg' },
  { topic: 'English',  location: 'Curepipe',      price: 80,  space: 5, image: 'english.jpg' },
  { topic: 'Science',  location: 'Rose Hill',     price: 90,  space: 5, image: 'science.jpg' },
  { topic: 'Music',    location: 'Quatre Bornes', price: 70,  space: 5, image: 'music.jpg' },
  { topic: 'Art',      location: 'Port Louis',    price: 60,  space: 5, image: 'art.jpg' },
  { topic: 'Football', location: 'Vacoas',        price: 50,  space: 5, image: 'football.jpg' },
  { topic: 'Swimming', location: 'Flic en Flac',  price: 120, space: 5, image: 'swimming.jpg' },
  { topic: 'Coding',   location: 'Ebene',         price: 150, space: 5, image: 'coding.jpg' },
  { topic: 'French',   location: 'Moka',          price: 85,  space: 5, image: 'french.jpg' },
  { topic: 'Chess',    location: 'Curepipe',      price: 40,  space: 5, image: 'chess.jpg' }
];

const client = new MongoClient(process.env.MONGODB_URI);
const collection = client.db('activekids').collection('lesson');

// Empty the collection first, so running this again never creates duplicates
client.connect()
  .then(() => collection.deleteMany({}))
  .then(() => collection.insertMany(lessons))
  .then(result => console.log(result.insertedCount + ' lessons added'))
  .catch(err => console.error(err))
  .finally(() => client.close());
