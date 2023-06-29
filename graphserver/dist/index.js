"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Graph App by Mason England and Cade Almond
 *  7/19/2023
 */
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
//const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(express_1.default.json());
//connect to the database
const dbURI = "mongodb+srv://masonengland01:China1014China-@graph-app.gsryziu.mongodb.net/Graph-app?retryWrites=true&w=majority";
mongoose_1.default.connect(dbURI)
    .then((result) => {
    console.log("database loaded");
    app.listen(10000, () => console.log("listening at 10000"));
})
    .catch((err) => console.log(err));
//connect our routers
const accountRouter = require('./routes/accounts');
const graphsRouter = require('./routes/graphs');
app.use("/accounts", accountRouter);
app.use("/graphs", graphsRouter);
//# sourceMappingURL=index.js.map