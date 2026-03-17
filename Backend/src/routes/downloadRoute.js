import express from 'express';
import downloadController from '../controllers/download.controller.js';

const downloadRoute = express.Router();

downloadRoute.post('/getVideoDets', downloadController);

export default downloadRoute