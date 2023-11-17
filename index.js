const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

console.log(process.env.MONGO_URI);

// Connect to MongoDB
/* mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err)); */
// Connect to MongoDB
const dbUrl = process.env.MONGO_URI;

const mongoClient = new MongoClient(dbUrl, { useNewUrlParser: true });

mongoClient.connect((err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db();
  console.log('Connected to MongoDB database');

  // db ready to use
});

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then((items) => res.render('index', { items }))
    .catch((err) => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
