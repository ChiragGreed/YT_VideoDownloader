import express from 'express';
import downloadRoute from './routes/downloadRoute.js';
import cors from 'cors';
const wildCardRoute = require('./routes/wildCardRoute.js/index.js');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "../", "/public/dist")));

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api', downloadRoute);
app.use('/', wildCardRoute);


export default app