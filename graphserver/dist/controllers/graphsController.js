"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model = require('../models/Schemas.js');
// hold all models in a list to iterate on later
const modelList = [
    Model.vendiaModel,
    Model.gChartModel
];
// function to pull all graphs for a specifica account
exports.getGraphs = async (req, res) => {
    const id = req.params.id;
    let graphList = [];
    try {
        // search each db document for graphs linked
        // to the account ID
        for (let item of modelList) {
            let docs = await item.find({ accountID: id });
            graphList.push(docs);
        }
        res.status(200).json({
            success: true,
            venDiagrams: graphList[0],
            gantCharts: graphList[1]
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            errmsg: "internal server error"
        });
    }
};
exports.registerGraph = async (req, res) => {
    const data = req.body;
    const graphType = req.params.type;
    if (!data.accountID) {
        return res.status(400).json({
            success: false,
            errmsg: "please provide account ID under property name 'accountID'."
        });
    }
    if (graphType.toLowerCase() === "vendiagram") {
        const newGraph = new Model.vendiaModel({
            accountID: data.accountID,
            Top: data.top,
            Left: data.left,
            Width: data.width,
            Height: data.height,
            Notes: {
                Left: data.notes.left,
                Right: data.notes.right,
                Middle: data.notes.middle
            }
        });
        newGraph.save();
        console.log("Hell Yeah!!");
        res.status(201).send("graph saved");
    }
    else {
        res.send("under construction");
    }
};
//# sourceMappingURL=graphsController.js.map