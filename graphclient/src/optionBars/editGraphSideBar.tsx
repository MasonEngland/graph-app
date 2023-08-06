import { useState, useEffect, ChangeEvent } from "react";
import { diagramComponentModel, diagramInputModel } from "../Types/graphs-structure";
import DropDownMenu from "./dropDownMenu";
import { sideBars } from "./sideBar";
import { sideBarNavigation } from "./sideBarNavigations";
import { useSelector } from "react-redux";
import { State } from "../State/reducers/rooter-reducer";


interface EditGraphComponentParams {
    selectedOptionDMenu : (selectedOption : string) => void,
    currentDisplay: sideBars,
    userGraph : {},
    changeDisplay : (newDisplay : sideBars) => void
}

// If a new graph is created it should navigate to the
// editing page
//* this is the main page for each user
export default function EditGraphSideBar ({selectedOptionDMenu, currentDisplay, userGraph, changeDisplay} : EditGraphComponentParams) {
    const [graphInputs, setGraphInputs] = useState<string []>([]);
    const graphstate : any = useSelector((state: State) => state.updateGraph);
    
    useEffect( ()=> {
        const graphType = graphstate.currentGraphComponent.graphType
        const inputsToGraph = (diagramInputModel as any)[graphType]
        setGraphInputs(inputsToGraph !== undefined ? inputsToGraph : [])
    }, [])
    
    let componentsOfGraph = (diagramComponentModel as any)[(userGraph as any)["graphType"]]
    if(!componentsOfGraph) componentsOfGraph = []

    const currentGraphComp = graphstate.currentGraphComponent

    const [graphValues, setGraphValues] = useState(currentGraphComp)

    const selectedComponent = (selectedOption : string) => {
        const inputsToGraph = (diagramInputModel as any)[selectedOption]
        setGraphInputs(inputsToGraph !== undefined ? inputsToGraph : [])
    }

    function updateLoginInfo(e: ChangeEvent<HTMLInputElement>) : any{
        const key = e.target.name as string;
        const value = e.target.value as string;
        setGraphValues ({...graphValues, [key]: value})
    }


    return (<div className="graphs">
        <h2>Graphs : </h2>
        {sideBarNavigation(changeDisplay, currentDisplay)}
        <ul>
        <h2>{"GRAPH TITLE"}</h2>
        <input placeholder="Component Name"/>
        <DropDownMenu
            open={true}
            multiple={false}
            menuOptions ={ componentsOfGraph }
            selectOption = {selectedComponent}
            onEmptyMsg = {"Components ... "}/>
            {currentGraphComp ?
            Object.keys(graphValues).map((inputFields: string, i : number) => (
                <>
                    <input placeholder = {inputFields}
                     name = {inputFields}
                     onChange={(e) => updateLoginInfo(e)}
                     value={graphValues[inputFields.toLowerCase()]
                     ? graphValues[inputFields.toLowerCase()] : "" 
                     }></input>
                </>
            )) :
            graphInputs.map((inputFields : string, i : number ) => (
                <>
                    <input placeholder = {inputFields}/>
                </>
            ))
        }
        {currentGraphComp ?
            <button>Save Changes </button> :
            <button>Add Component </button>
        }
        <div className="graphs">
        <p>Existing Components </p>
        <input placeholder="Search by Name"/>
        <DropDownMenu
            open={true}
            multiple={false}
            menuOptions ={[
                "Ven Diagram",
                "Bar Graph",
                "UML Diagram",
                "Gannt Chart"
            ]}
            selectOption = {selectedOptionDMenu}
            onEmptyMsg = {"Filter by Component"}/>
        </div>
        </ul>
         { /** <button type="button" onClick={() => saveDummyGraph()}>Save</button> */ }
        </div>)
}
