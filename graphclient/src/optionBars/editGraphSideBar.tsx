// ** State ** //
import { diagramComponentModel, diagramInputModel } from "../Types/graphs-structure";
import { State } from "../State/reducers/rooter-reducer";
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { sideBars } from "./sideBar";

// ** Components Imports ** //
import DropDownMenu from "./dropDownMenu";
import { sideBarNavigation } from "./sideBarNavigations";

// ** User Actions ** //
import { setEditingComponent } from "../State/action-creators/profile-action-creators";


interface EditGraphComponentParams {
    selectedOptionDMenu : (selectedOption : string) => void,
    currentDisplay: sideBars,
    userGraph : {},
    changeDisplay : (newDisplay : sideBars) => void
}

// @ brief : Displays a side bar that allows a user to 
//    1. Modify and edit pre-existing components of a diagram / chart
//    2. Create new componenets to show on a diagram / chart
/* 
@params selectOptionDMenu : This method tracks information about the graph options the
//                          user has selected
@params currentDisplay : Used for styling the side bar navigation 
@params userGraph : The graph that a user wants to edit
@params changeDisplay : A method which will allow the user to navigate away from this
//                      Component
@references : sideBar.tsx
*/
export default function EditGraphSideBar ({selectedOptionDMenu, currentDisplay, userGraph, changeDisplay} : EditGraphComponentParams) {
    // Setup state for inputs that belong to a graph
    const [graphInputs, setGraphInputs] = useState<string []>([]);
    const graphstate : any = useSelector((state: State) => state.updateGraph);
    
    // Generate an array with the given components that belong to a graph type
    let componentsOfGraph = (diagramComponentModel as any)[(userGraph as any)["graphType"]]
    if(!componentsOfGraph) componentsOfGraph = []

    // Retrieve any possible selected components, and copy them to a state 
    // for the user to modify later if desired
    const currentGraphComp = graphstate.currentGraphComponent
    const [graphValues, setGraphValues] = useState(currentGraphComp)

    // Generate the inputs the user can modify to a component, and any pre-existing
    // values that belong to any selected component
    useEffect( ()=>{ 
        if(graphstate?.currentGraphComponent?.graphType) {
            const graphType = graphstate.currentGraphComponent.graphType
            const inputsToGraph = (diagramInputModel as any)[graphType]
            setGraphInputs(inputsToGraph !== undefined ? inputsToGraph : [])
            setGraphValues(currentGraphComp)
        }
    }, [currentGraphComp])

    // Generate and display new inputs needed for a component, to the UI
    const selectedComponent = (selectedOption : string) => {
        const inputsToGraph = (diagramInputModel as any)[selectedOption]
        setGraphInputs(inputsToGraph !== undefined ? inputsToGraph : [])
    }

    // When the user changes an update an existing component, update its
    // state and redux store variables
    function updateLoginInfo(e: ChangeEvent<HTMLInputElement>) : any{
        const key = e.target.name as string;
        const value = e.target.value as string;
        const updatedGraph = {...graphValues, [key]: value} 
        setGraphValues (updatedGraph)
        setEditingComponent(updatedGraph)
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

            {/* If the user selected a graphs component, displays its information,
                otherwise display inputs needed for creating a new component */}
            
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

        {/* Allow the user to save changes or add components if a graphs 
            component has been selected or not */}

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
