const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const videoRoutes = require('./routes/videos.js');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(videoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});