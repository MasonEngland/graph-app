/**
 * Graph App by Mason England and Cade Almond
 * Created 6/19/2023
 * approximate line count: 1,511 (as of 7/7/23)
 */
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import env from 'dotenv';
//const bcrypt = require('bcryptjs');
import bodyParser from 'body-parser';
env.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//connect to the database
const dbURI = `mongodb+srv://masonengland01:${process.env.DATABASE_PASSWORD}@graph-app.gsryziu.mongodb.net/Graph-app?retryWrites=true&w=majority`;
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



