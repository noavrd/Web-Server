require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connect to MongoDB successfully !');
    app.listen(PORT, () => console.log(`Listening at PORT: ${PORT}`));
  })
  .catch((err) => console.log(`Error connection to MongoDB: ${err}`));
