const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
    email: String,
}, {timeStamps: true});

const vendiaSchema = new Schema({
    accountID: String,
    Top: Number,
    Left: Number,
    Width: Number,
    Height: Number,
    LeftLabel: String,
    RigthLabel: String,
    Notes: {
        Left: [String],
        Right: [String],
        Middle: [String],
    }
})

const lineGraphSchema = new Schema({
    accountID: String,
    Top: Number,
    Left: Number,
    Width: Number,
    Height: Number,
    XLabel: String,
    YLabel: String,
    Pairs: [{
        x: Number,
        y: Number
    }]
})

const barGraphSchema = new Schema({
    accountID: String,
    Top: Number,
    Left: Number,
    Width: Number,
    Height: Number,
    XLabel: String,
    YLabel: String,
    Pairs: [{
        X: Number,
        Y: Number
    }]
})

const gChartSchema = new Schema({
    accountID: String,
    startTime: Number,
    EndTime: Number,
    Tasks: [{
        TaskStartTime: Number,
        TaskEndTime: Number,
        TaskName: String
    }]
})

const accountModel = mongoose.model("Accounts", accountSchema);
const vendiaModel = mongoose.model("VenDiagrams", vendiaSchema);
const gChartModel = mongoose.model("Gantt Charts", gChartSchema);
const lineGraphModel = mongoose.model("Line Graphs", lineGraphSchema);
const barGraphModel = mongoose.model("Bar Graphs", barGraphSchema);
exports.vendiaModel = vendiaModel;
exports.accountModel = accountModel;
exports.gChartModel = gChartModel;
exports.lineGraphModel = lineGraphModel;
exports.barGraphModel = barGraphModel;
export {};