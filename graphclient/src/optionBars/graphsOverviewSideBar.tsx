import { diagramComponentModel } from "../Types/graphs-structure"
import DropDownMenu from "./dropDownMenu"
import { sideBars } from "./sideBar"

const sideBarNavigation = (changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars) => {
    return (
        <>
        <ul className='sideBarNavigation'>
            <div className={currentDisplay + '-GraphsTab'}
                 onClick = { ()=> changeDisplay(sideBars.DEFAULT_USER_SIDE_BAR) }>Graphs</div>    
            <div className={currentDisplay + '-EditingTab'}
                 onClick = { ()=> changeDisplay(sideBars.EDITING_GRAPH_SIDE_BAR) }>Edit</div>    
        </ul></>
    )
}

// If a new graph is created it should navigate to the 
// editing page
//* this is the main page for each user
export const userHomePage = (userGraphs: any[], selectedOptionDMenu : (selectedOption : string) => void, addGraph : (e : any) => void,
        changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars) => {
    return (<div className="graphs">
        <h2>Graphs : </h2>
        {sideBarNavigation(changeDisplay, currentDisplay)}
        <ul>
        <p>New Graph : </p>
        <input placeholder="Graph Name"/>
        <>
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
            onEmptyMsg = {"Graph Types ... "}/>
        </>
        <button onClick={ (e)=> addGraph(e) }>Add New : </button>
        <div className="graphs">
        <p>Existing Graphs : </p>
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
            onEmptyMsg = {"Filter by Graph"}/>
        {userGraphs.map(( graph : any, i : number ) => (
            <div className="graph">
            <p>{graph.title}</p>
            </div>
        ))}
        </div>
        </ul>
    </div>)
}

// @ brief : This will allow a user to modify an already existing graph.
// A user can 
//   1. Add a graph "Component" to a graph
//   2. Edit a pre-existing graph component
// @params selectedGraph is the graph that the user choose to edit
export const userGraphEditing = ( selectedOptionDMenu : (selectedOption : string) => void, currentDisplay: sideBars, userGraph : {},
selectedComponent : (selectedOption : string) => void, changeDisplay : (newDisplay : sideBars) => void, graph : any, graphInputs : any[]) => {
    console.log(userGraph, "USER -G ")
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
            {graphInputs.map((inputFields : string, i : number ) => (
                <>
                    <input placeholder = {inputFields}/>
                </>
            ))}
        <button>Add Component </button>
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
        </div>)
}