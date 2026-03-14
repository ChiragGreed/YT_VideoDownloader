const express = require('express');
const wildCardController = require('../controllers/wildCard.controller.js');

const wildCardRoute = express.Router();

wildCardRoute.get('*name', wildCardController );


module.exports = wildCardRoute