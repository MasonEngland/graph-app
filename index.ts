/**
 * Graph App by Mason England and Cade Almond
 *  7/19/2023
 */
import { Request, Response } from "express";
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//connect to the database
const dbURI = "mongodb+srv://masonengland01:China1014China-@graph-app.gsryziu.mongodb.net/Graph-app?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((reslut) => {
        console.log("database loaded");
        app.listen(3000, () => console.log("listening at 3000"));
    })
    .catch((err) => console.log(err));

//connect our routers
const accountRouter = require('./routes/accounts');
const graphsRouter = require('./routes/graphs');
app.use("/accounts", accountRouter);
app.use("/graphs", graphsRouter);

// loading a document in the database
const accountModel = require("./models/Schemas");

app.post("/", (req: Request, res:Response) => {
    console.log(req.body);
    res.send("server works");
})

