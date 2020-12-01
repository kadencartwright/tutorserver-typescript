import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/router';
import "reflect-metadata";
import {createConnection} from 'typeorm'
import {json, urlencoded} from 'body-parser';

//app setup


dotenv.config()

const app = express();
const PORT = process.env.PORT ||3000
app.use(json())
app.use(urlencoded({extended:true}))

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "tutorDatabase",
  entities: [__dirname + "/models/*.ts"],
  synchronize: false,//change to true to sync with db every time server starts or false for production
  logging: true
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });