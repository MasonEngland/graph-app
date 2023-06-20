/**
 * Graph App by Mason England and Cade Almond
 *  7/19/2023
 */

import { Request, Response } from "express";
const express = require('express');
const app = express();

const accountRouter = require('./routes/accounts');
const graphsRouter = require('./routes/graphs');
app.use("/accounts", accountRouter);
app.use("/graphs", graphsRouter);

app.listen(3000, () => console.log("listening at 3000"));

app.get("/", (req: Request, res:Response) => {
    res.send("this is a test");
});
