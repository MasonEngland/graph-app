"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//temporary route for testing purposes
app.get("/test", (req, res) => {
    const PASSWORD = "testword";
    const username = "Mason";
    // find document based on email
    accountModel.find({ email: "mail@gmail.com" })
        .then((docs) => {
        //console.log(docs);
        bcrypt.compare(PASSWORD, docs[0].password, async (err, isMatch) => {
            if (err != null) {
                console.log(err);
                res.sendStatus(500);
            }
            else if (isMatch && username == docs[0].username) {
                console.log("is a match");
                res.sendStatus(200);
            }
            else {
                console.log("is NOT a match");
                res.sendStatus(401);
            }
        });
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
app.post("/", (req, res) => {
    console.log(req.body);
    res.send("server works");
});
//# sourceMappingURL=index.js.map