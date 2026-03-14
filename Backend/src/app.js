import express from 'express';
import downloadRoute from './routes/downloadRoute.js';
import cors from 'cors';
import wildCardRoute from './routes/wildCardRoute.js';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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