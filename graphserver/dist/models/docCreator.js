"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDoc = void 0;
const Schemas_js_1 = require("./Schemas.js");
// creates db document based on graph type
// graph type should correlate to data structure
function makeDoc(graphType, data) {
    let newDoc;
    switch (graphType) {
        case "vendiagram":
            newDoc = new Schemas_js_1.vendiaModel({
                accountID: data.accountID,
                Top: data.top,
                Left: data.left,
                Width: data.width,
                Height: data.height,
                LeftLabel: data.leftlabel,
                RigthLebel: data.rightlabel,
                Notes: {
                    Left: data.notes.left,
                    Right: data.notes.right,
                    Middle: data.notes.middle
                }
            });
            newDoc.save();
            break;
        case "linegraph":
            newDoc = new Schemas_js_1.lineGraphModel({
                accountID: data.accountID,
                Top: data.top,
                Left: data.left,
                Width: data.width,
                Height: data.height,
                XLabel: data.xlabel,
                YLabel: data.ylabel,
                Pairs: data.pairs
            });
            newDoc.save();
            break;
    }
}
exports.makeDoc = makeDoc;
//# sourceMappingURL=docCreator.js.map