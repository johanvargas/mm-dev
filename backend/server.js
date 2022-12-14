const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 17000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// DB
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const recipesRouter = require('./routes/recipes');
const homeRouter = require('./routes/home');
const ingredientRouter = require('./routes/ingredients');

app.use('/', homeRouter);
app.use( '/recipes', recipesRouter);
app.use('/ingredients', ingredientRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
