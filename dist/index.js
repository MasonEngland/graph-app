"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const express = require('express');
const app = express();
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
app.get("/test", (req, res) => {
    res.send("this is a test");
});
//# sourceMappingURL=index.js.map