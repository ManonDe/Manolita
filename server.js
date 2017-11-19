 /**
 * @file server.js
 * @desc Point d'entrée de l'application 'Manolita'. <br />
 * L'application Manolita permet de gérer une liste de pizza. <br />
 * <br />
 * <br />
 * <b>~5 306 442</b> de lignes de code <br />
 * <br />
 * Date de Création 20/10/2017 <br />
 * Date de modification 20/10/2017 <br />
 * 
 * @version Alpha 1.0.0
 * 
 * @author Manon Depreux        <manon.depreux@ynov.com>
 * 
 */
 

'use strict';

// REQUIRE
const path       = require('path');
const express    = require('express');
const app        = express();
const http       = require('http').Server(app);
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');
// INIT
const port = process.env.PORT || 3000;

// Mongoose
mongoose.connect('mongodb://localhost/manolita', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

// General Conf
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

// Require Controller
const Pizza = require ('./controller/pizzaController');
const Ingredient = require ('./controller/ingredientsController');

// Conf Routes
app.use('/pizza', Pizza.router);
app.use('/ingredients', Ingredient.router);

app.get('/', (res, req, next) => {
  res.end('Hello');
});

app.listen(port, () => {
  console.log(`WebServer Starting at: ${port}`);
});

app.use(cors());