/**
 * Graph App by Mason England and Cade Almond
 *  7/19/2023
 */
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
//const bcrypt = require('bcryptjs');
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//connect to the database
const dbURI = "mongodb+srv://masonengland01:China1014China-@graph-app.gsryziu.mongodb.net/Graph-app?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => {
        console.log("database loaded");
        app.listen(10000, () => console.log("listening at 10000"));
    })
    .catch((err) => console.log(err));

//connect our routers
import {router as accountRouter} from './routes/accounts.js';
import {router as graphsRouter} from "./routes/graphs.js";
app.use("/accounts", accountRouter);
app.use("/graphs", graphsRouter);



