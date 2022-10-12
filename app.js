const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, MONGO_DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = { _id: '634429a141910cbce743bf95' };
  next();
});
app.use(require('./routes'));

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
