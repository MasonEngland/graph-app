const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
    email: String,
}, {timeStamps: true});

const accountModel = mongoose.model("Accounts", accountSchema);
exports.accountModel = accountModel;