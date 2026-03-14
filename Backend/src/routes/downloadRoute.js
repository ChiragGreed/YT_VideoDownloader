import express from 'express';
import downloadController from '../controllers/download.controller.js';
import previewController from '../controllers/preview.controller.js';

const downloadRoute = express.Router();

downloadRoute.post('/download', downloadController);
downloadRoute.post('/getVideoDets', previewController);

export default downloadRoute