"use strict";
/**
 * Graph App by Mason England and Cade Almond
 *  7/19/2023
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const accountRouter = require('./routes/accounts');
const graphsRouter = require('./routes/graphs');
app.use("/accounts", accountRouter);
app.use("/graphs", graphsRouter);
app.listen(3000, () => console.log("listening at 3000"));
app.get("/", (req, res) => {
    res.send("this is a test");
});
//# sourceMappingURL=index.js.map