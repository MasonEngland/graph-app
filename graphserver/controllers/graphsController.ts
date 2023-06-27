import { Request, Response } from 'express';
const Model = require('../models/Schemas.js');
const mongoose = require('mongoose');

async function checkID(id: string): Promise<boolean> {
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const docs = await Model.accountModel.findById(id);
            if (!docs) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        console.log("problem checking id");
        console.log(err);
        return false;
    }
}


// hold all models in a list to iterate on later
const modelList = [
    Model.vendiaModel,
    Model.gChartModel,
    Model.lineGraphModel
]

// function to pull all graphs for a specifica account
exports.getGraphs = async (req: Request, res: Response) => {
    const id = req.params.id; 
    let graphList: any[] = [];
    try {
        // search each db document for graphs linked
        // to the account ID
        for (let item of modelList) {
            let docs = await item.find({accountID: id});
            graphList.push(docs);
        }
        res.status(200).json({
            success: true,
            venDiagrams: graphList[0],
            gantCharts: graphList[1],
            lineGraphs: graphList[2]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            errmsg: "internal server error"
        })
    }
}

exports.regVendiagram = async (req: Request, res: Response) => {
    const {accountID, top, left, width, height, leftlabel, rightlabel, notes} = req.body;
    const validID = await checkID(accountID);
    if (!accountID) {
        return res.status(400).json({
            success: false,
            errmsg: "please provide account ID under property name 'accountID'."
        })
    }
    if (!validID){
        return res.status(400).json({
            success: false,
            errmsg: "please use valid accountID"
        })
    }
    const newGraph = new Model.vendiaModel({
        accountID: accountID,
        Top: top,
        Left: left,
        Width: width,
        Height: height,
        LeftLabel: leftlabel,
        RigthLebel: rightlabel,
        Notes: {
            Left: notes.left,
            Right: notes.right,
            Middle: notes.middle
        }
    })
    newGraph.save();
    console.log("Hell Yeah!!");
    res.status(201).send("graph saved");
}