"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.barGraphModel = exports.lineGraphModel = exports.gChartModel = exports.vendiaModel = exports.accountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const accountSchema = new Schema({
    username: String,
    password: String,
    email: String,
});
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
});
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
});
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
const accountModel = mongoose_1.default.model("Accounts", accountSchema);
exports.accountModel = accountModel;
const vendiaModel = mongoose_1.default.model("VenDiagrams", vendiaSchema);
exports.vendiaModel = vendiaModel;
const gChartModel = mongoose_1.default.model("Gantt Charts", gChartSchema);
exports.gChartModel = gChartModel;
const lineGraphModel = mongoose_1.default.model("Line Graphs", lineGraphSchema);
exports.lineGraphModel = lineGraphModel;
const barGraphModel = mongoose_1.default.model("Bar Graphs", barGraphSchema);
exports.barGraphModel = barGraphModel;
//# sourceMappingURL=Schemas.js.map