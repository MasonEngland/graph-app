// These are graph types
export enum graphTypes {
    VEN_DIAGRAM = "venDiagram",
    UML_DIAGRAM = "umlDiagram",
    GANNT_CHART = "ganntChart" 
}

const venDiagramComponents = ["Ven Diagram"]
const umlDiagramComponents = ["Class", "Interface"]
const ganntChartComponents = ["Event"]

export const diagramComponentModel = {
    "Ven Diagram" : venDiagramComponents,
    "UML Diagram" : umlDiagramComponents,
    "Gannt Chart" : ganntChartComponents
}

const venDiagramInputs = ["Title", "Contents"]
const umlClassInputs = ["Title", "Overview", "Variables"]
const eventInputs = ["Event Name", "Task Overview", "Begin Date", "End Date" ]

export const diagramInputModel = {
    "Ven Diagram" : venDiagramInputs,
    "Class" : umlClassInputs,
    "Interface" : umlClassInputs,
    "Gannt Chart" : eventInputs
}