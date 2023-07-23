// These are graph types
export enum graphTypes {
    VEN_DIAGRAM = "venDiagram",
    UML_DIAGRAM = "umlDiagram",
    GANNT_CHART = "ganntChart" 
}

// All the available components in a Graph

const venDiagramComponents = ["Ven Diagram"]
const BarChartComponents   = ["Bar Chart"]
const umlDiagramComponents = ["Class", "Interface"]
const ganntChartComponents = ["Event"]

export const diagramComponentModel = {
    "Ven Diagram" : venDiagramComponents,
    "UML Diagram" : umlDiagramComponents,
    "Gannt Chart" : ganntChartComponents,
    "Bar Chart"   : BarChartComponents,
}

// The input fields needed to create a component

const venDiagramInputs = ["X", "Y"]
const barChartInputs   = ["X", "Y"]
const umlClassInputs = ["Title", "Overview", "Variables"]
const eventInputs = ["Event Name", "Task Overview", "Begin Date", "End Date" ]

export const diagramInputModel = {
    "Ven Diagram" : venDiagramInputs,
    "Class" : umlClassInputs,
    "Interface" : umlClassInputs,
    "Gannt Chart" : eventInputs,
    "Bar Chart" : barChartInputs
}

export type BarGraph = {
    _id?: string,
    accountID?: string,
    Top?: number,
    Left?: number,
    Width?: number,
    Height?: number,
    XLabel: string,
    YLabel: string,
    Pairs: {
        x: string,
        y: number,
        _id?: string
    }[]
}