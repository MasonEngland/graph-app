"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGraph = exports.regGraph = exports.getGraphs = void 0;
const docCreator_1 = require("../models/docCreator");
const Schemas_js_1 = require("../models/Schemas.js");
const mongoose_1 = __importDefault(require("mongoose"));
// checks if account exists in database
function checkID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mongoose_1.default.Types.ObjectId.isValid(id)) {
                const docs = yield Schemas_js_1.accountModel.findById(id);
                if (!docs) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log("problem checking id");
            console.log(err);
            return false;
        }
    });
}
// hold all models in a list to iterate on later
const modelList = [
    Schemas_js_1.vendiaModel,
    Schemas_js_1.gChartModel,
    Schemas_js_1.lineGraphModel,
    Schemas_js_1.barGraphModel
];
const supportedGraphTypes = [
    "vendiagram",
    "linegraph"
];
// function to pull all graphs for a specifica account
const getGraphs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let graphList = [];
    const validID = yield checkID(id);
    if (!validID) {
        return res.status(400).send("please use valid ID");
    }
    try {
        // search each db document for graphs linked
        // to the account ID
        for (let item of modelList) {
            let docs = yield item.find({ accountID: id });
            graphList.push(docs);
        }
        res.status(200).json({
            success: true,
            venDiagrams: graphList[0],
            gantCharts: graphList[1],
            lineGraphs: graphList[2]
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            errmsg: "internal server error"
        });
    }
});
exports.getGraphs = getGraphs;
const regGraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const graphtype = req.params.type;
    const { accountID } = req.body;
    const validID = yield checkID(accountID);
    if (!accountID) {
        return res.status(400).json({
            success: false,
            errmsg: "please provide account ID under property name 'accountID'."
        });
    }
    if (!validID) {
        return res.status(400).json({
            success: false,
            errmsg: "please use valid accountID"
        });
    }
    if (!supportedGraphTypes.includes(graphtype)) {
        return res.status(400).json({
            success: false,
            errmsg: "graph type not supported"
        });
    }
    (0, docCreator_1.makeDoc)(graphtype, req.body);
    res.status(201).json({
        success: true,
        msg: "graph saved?"
    });
});
exports.regGraph = regGraph;
const deleteGraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const graphType = req.params.type;
    let docs;
    //const validID = await checkID(id);
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            errmsg: "invalid ID"
        });
    }
    try {
        switch (graphType) {
            case "vendiagram":
                docs = yield Schemas_js_1.vendiaModel.findByIdAndDelete(id);
                if (docs) {
                    res.status(200).json({
                        success: true,
                        msg: "graph deleted!"
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        errmsg: "graph not found"
                    });
                }
                break;
            case "linegraph":
                docs = yield Schemas_js_1.lineGraphModel.findByIdAndDelete(id);
                if (docs) {
                    res.status(200).json({
                        success: true,
                        msg: `graph deleted!: ${docs}`
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        errmsg: "graph not found"
                    });
                }
                break;
            default:
                res.status(400).json({
                    success: false,
                    errmsg: "graph type not supported"
                });
                break;
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            errmsg: err
        });
    }
});
exports.deleteGraph = deleteGraph;
//# sourceMappingURL=graphsController.js.map