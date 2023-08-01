var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { makeDoc } from "../models/docCreator.js";
import { vendiaModel, gChartModel, lineGraphModel, barGraphModel, accountModel } from '../models/Schemas.js';
import mongoose from 'mongoose';
// checks if account exists in database
function checkID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mongoose.Types.ObjectId.isValid(id)) {
                const docs = yield accountModel.findById(id);
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
    vendiaModel,
    gChartModel,
    lineGraphModel,
    barGraphModel
];
const supportedGraphTypes = [
    "vendiagram",
    "linegraph",
    "bargraph"
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
            lineGraphs: graphList[2],
            barGraphs: graphList[3]
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
// Register Graph
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
    // make sure id is valid
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
    makeDoc(graphtype, req.body);
    res.status(201).json({
        success: true,
        msg: "graph saved!"
    });
});
// function to delete graphs
const deleteGraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let docs;
    console.log(req.body.tokenID);
    for (let item of modelList) {
        try {
            if (!docs) {
                docs = yield item.findById(id);
                if (docs && docs.accountID !== req.body.tokenID) {
                    return res.status(401).json({
                        succes: false,
                        errmsg: "token and accountID do not match"
                    });
                }
                // if the db found an itme before, it will find it again
                docs = yield item.findByIdAndDelete(id);
            }
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                errmsg: err
            });
        }
    }
    // checks to make sure the document was deleted
    if (docs) {
        res.status(200).json({
            success: true,
            document: docs
        });
    }
    else {
        res.status(404).json({
            success: false,
            errmsg: "document by that id does not exist"
        });
    }
});
const editGraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const edits = req.body;
    const id = req.params.id;
    let docs = null;
    for (let item of modelList) {
        try {
            if (!docs) {
                // check if document ID matches token ID
                docs = yield item.findById(id);
                if (docs && req.body.tokenID !== docs.accountID) {
                    return res.status(401).json({
                        success: false,
                        errmsg: "illegal token"
                    });
                }
                docs = yield item.findByIdAndUpdate(id, edits);
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                errmsg: "internal server error"
            });
        }
    }
    // make sure doc made the edits
    if (docs) {
        return res.json({
            success: true,
            docs: docs
        });
    }
    else {
        console.log("could not find docs");
        res.status(404).json({
            success: false,
            errmsg: "graph could not be found"
        });
    }
});
export { getGraphs, regGraph, deleteGraph, editGraph };
//# sourceMappingURL=graphsController.js.map