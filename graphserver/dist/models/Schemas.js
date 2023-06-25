const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    username: String,
    password: String,
    email: String,
}, { timeStamps: true });
const vendiaSchema = new Schema({
    accountID: String,
    Top: Number,
    Left: Number,
    Width: Number,
    Height: Number,
    Notes: [{
            NoteTitle: String,
            NoteContent: String
        }]
});
const gChartSchema = new Schema({
    accountID: String,
    startTime: Number,
    EndTime: Number,
    Tasks: [{
            TaskStartTime: Number,
            TaskEndTime: Number,
            TaskName: String
        }]
});
const accountModel = mongoose.model("Accounts", accountSchema);
const vendiaModel = mongoose.model("VenDiagrams", vendiaSchema);
const gChartModel = mongoose.model("Gantt Charts", gChartSchema);
exports.vendiaModel = vendiaModel;
exports.accountModel = accountModel;
exports.gChartModel = gChartModel;
//# sourceMappingURL=Schemas.js.map