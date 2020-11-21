import * as dotenv from 'dotenv';
import express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

//app setup
dotenv.config()
const app = express();
const PORT = process.env.PORT ||3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });