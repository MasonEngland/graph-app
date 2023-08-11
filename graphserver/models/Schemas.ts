import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String,
    email: String,
});

const vendiaSchema = new Schema({
    accountID: String,
    Name: String,
    Type: String,
    LeftLabel: String,
    RigthLabel: String,
    // Add a components array, which has an X, Y, Id, Text-Content, and Radius
    Pairs: [{
        x: Number,
        y: Number,
        textContent: String,
        radius: Number
    }]
})

const lineGraphSchema = new Schema({
    accountID: String,
    Name: String,
    Type: String,
    XLabel: String,
    YLabel: String,
    Pairs: [{
        x: Number,
        y: Number
    }]
})

const barGraphSchema = new Schema({
    accountID: String,
    Name: String,
    Type: String,
    XLabel: String,
    YLabel: String,
    Pairs: [{
        x: String,
        y: Number
    }]
})

const gChartSchema = new Schema({
    accountID: String,
    Name: String,
    Type: String,
    startTime: Number,
    EndTime: Number,
    GanttTitle: String,
    Tasks: [{
        TaskStartTime: Number,
        TaskEndTime: Number,
        TaskName: String,
        TaskPerson: String
    }]
})

const accountModel = mongoose.model("Accounts", accountSchema);
const vendiaModel = mongoose.model("VenDiagrams", vendiaSchema);
const gChartModel = mongoose.model("Gantt Charts", gChartSchema);
const lineGraphModel = mongoose.model("Line Graphs", lineGraphSchema);
const barGraphModel = mongoose.model("Bar Graphs", barGraphSchema);

export {
    accountModel,
    vendiaModel,
    gChartModel,
    lineGraphModel,
    barGraphModel
};