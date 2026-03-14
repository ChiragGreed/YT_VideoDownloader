import express from 'express';
import wildCardController from '../controllers/wildCard.controller.js';

const wildCardRoute = express.Router();

wildCardRoute.get('*name', wildCardController);

export default wildCardRoute