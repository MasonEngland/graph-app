import { diagramComponentModel } from "../Types/graphs-structure";
import DropDownMenu from "./dropDownMenu";
import { sideBars } from "./sideBar";
import { sideBarNavigation } from "./sideBarNavigations";

interface EditGraphComponentParams {
    selectedOptionDMenu : (selectedOption : string) => void, 
    currentDisplay: sideBars, userGraph : {},
    selectedComponent : (selectedOption : string) => void, 
    changeDisplay : (newDisplay : sideBars) => void, graph : any, 
    graphInputs : any[], 
    currentGraphComp : any
}

// If a new graph is created it should navigate to the 
// editing page
//* this is the main page for each user
export default function EditGraphSideBar ({selectedOptionDMenu, currentDisplay, userGraph,
selectedComponent, changeDisplay, graph, graphInputs, currentGraphComp} : EditGraphComponentParams) {
    
   
    let componentsOfGraph = (diagramComponentModel as any)[(userGraph as any)["graphType"]]

    if(!componentsOfGraph) componentsOfGraph = []

    return (<div className="graphs">
        <h2>Graphs : </h2>
        {sideBarNavigation(changeDisplay, currentDisplay)}
        <ul>
        <h2>{graph.title}</h2>
        <input placeholder="Component Name"/>
        <DropDownMenu
            open={true} 
            multiple={false}
            menuOptions ={ componentsOfGraph } 
            selectOption = {selectedComponent}
            onEmptyMsg = {"Components ... "}/>
            {currentGraphComp ? 
            graphInputs.map((inputFields: string, i : number) => (
                <>
                    <input placeholder= {inputFields}
                     value={currentGraphComp[inputFields.toLowerCase()] 
                     ? currentGraphComp[inputFields.toLowerCase()] : "" }></input>
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