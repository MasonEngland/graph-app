import { Request, Response } from 'express';
import {makeDoc} from "../models/docCreator.js";
import {vendiaModel, gChartModel, lineGraphModel, barGraphModel, accountModel} from '../models/Schemas.js';
import matchToken from '../middleware/matchToken.js';
import mongoose from 'mongoose';

// checks if account exists in database
async function checkID(id: string): Promise<boolean> {
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const docs = await accountModel.findById(id);
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
const modelList: mongoose.Model<any>[] = [
    vendiaModel,
    gChartModel,
    lineGraphModel,
    barGraphModel
]

const supportedGraphTypes: string[] = [
    "vendiagram",
    "linegraph",
    "bargraph"
]

// function to pull all graphs for a specifica account
const getGraphs = async (req: Request, res: Response) => {
    const id = req.params.id; 
    let graphList: mongoose.Document[][] = [];
    const validID = await checkID(id);
    if (!validID) {
        return res.status(400).send("please use valid ID");
    }
    try {
        // search each db document for graphs linked
        // to the account ID
        for (let item of modelList) {
            let docs: mongoose.Document[] = await item.find({accountID: id});
            graphList.push(docs);
        }
        res.status(200).json({
            success: true,
            venDiagrams: graphList[0],
            gantCharts: graphList[1],
            lineGraphs: graphList[2],
            barGraphs: graphList[3]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            errmsg: "internal server error"
        });
    }
}

// Register Graph
const regGraph = async (req: Request, res: Response) => {
    const graphtype = req.params.type;
    const {accountID} = req.body;
    const validID = await checkID(accountID);
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
    })
}

// function to delete graphs
const deleteGraph = async (req: Request, res: Response) => {
    const id = req.params.id;
    let docs: any;
    console.log(req.body.tokenID);
    for (let item of modelList) {
        try {
            if (!docs) {
                docs = await item.findById(id);
                if (docs && docs.accountID !== req.body.tokenID) {
                    return res.status(401).json({
                        succes: false,
                        errmsg: "token and accountID do not match"
                    })
                }
                // if the db found an itme before, it will find it again
                docs = await item.findByIdAndDelete(id);
            } 
        } catch (err) {
            return res.status(500).json({
                success: false,
                errmsg: err
            })
        }
    }
    // checks to make sure the document was deleted
    if (docs) {
        res.status(200).json({
            success: true,
            document: docs
        })
    }
    else {
        res.status(404).json({
            success: false,
            errmsg: "document by that id does not exist"
        })
    }
}

const editGraph = async (req: Request, res: Response) => {
    const edits = req.body;
    const id = req.params.id;
    let docs: any = null;
    for (let item of modelList) {
        try {
            if (!docs) {
                // check if document ID matches token ID
                docs = await item.findById(id);
                if (docs && req.body.tokenID !== docs.accountID) {
                    return res.status(401).json({
                        success: false,
                        errmsg: "illegal token"
                    })
                }
                docs = await item.findByIdAndUpdate(id, edits);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false
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
        res.sendStatus(404);
    }
}

export {
    getGraphs,
    regGraph,
    deleteGraph,
    editGraph
}