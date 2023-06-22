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
// loading a document in the database
const accountModel = require("./models/Schemas");
//temporary route for testing purposes
app.get("/test", (req, res) => {
    accountModel.find({ username: "MasonEngland", password: "test123" })
        .then((result) => {
        if (result.length > 0) {
            console.log(result);
        }
        else {
            console.log("no result");
        }
    });
    res.send("this is a test");
});
app.get("/", (req, res) => {
    res.send("server works");
});
//# sourceMappingURL=index.js.map