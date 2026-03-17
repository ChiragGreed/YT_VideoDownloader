import app from './src/app.js'
import dotenv from 'dotenv';
dotenv.config();

app.listen(3080, () => {
    console.log("Server is running at 3080")
})