const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errs = require('./middlewares/errs');

const { PORT = 3000, MONGO_DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(MONGO_DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'));

app.use(errs);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
