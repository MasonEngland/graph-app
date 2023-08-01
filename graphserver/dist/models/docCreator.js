import { vendiaModel, lineGraphModel, barGraphModel } from './Schemas.js';
// creates db document based on graph type
// graph type should correlate to data structure
//todo: add gantt charts and maybe timelines?
//! Model must fallow the schema
function makeDoc(graphType, data) {
    let newDoc;
    switch (graphType) {
        case "vendiagram":
            newDoc = new vendiaModel({
                accountID: data.accountID,
                Name: data.Name,
                Type: "venndiagram",
                LeftLabel: data.LeftLabel,
                RigthLebel: data.RightLabel,
                Notes: {
                    Left: data.Notes.Left,
                    Right: data.Notes.Right,
                    Middle: data.Notes.Middle
                }
            });
            newDoc.save();
            break;
        case "linegraph":
            newDoc = new lineGraphModel({
                accountID: data.accountID,
                Name: data.Name,
                Type: "linegraph",
                XLabel: data.XLabel,
                YLabel: data.YLabel,
                Pairs: data.Pairs
            });
            newDoc.save();
            break;
        case "bargraph":
            newDoc = new barGraphModel({
                accountID: data.accountID,
                Name: data.Name,
                Type: "bargraph",
                XLabel: data.XLabel,
                YLabel: data.YLabel,
                Pairs: data.Pairs
            });
            newDoc.save();
            break;
    }
}
export { makeDoc };
//# sourceMappingURL=docCreator.js.map