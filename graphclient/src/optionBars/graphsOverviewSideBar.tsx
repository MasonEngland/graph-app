import { useSelector } from "react-redux"
import { diagramComponentModel, BarGraph } from '../Types/graphs-structure';
import DropDownMenu from "./dropDownMenu"
import { sideBars } from "./sideBar"
import { State } from '../State/reducers/rooter-reducer';
import { useEffect, useState } from "react";
import { saveNewGraph } from "../State/action-creators/profile-action-creators";

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
selectedComponent : (selectedOption : string) => void, changeDisplay : (newDisplay : sideBars) => void, graph : any, graphInputs : any[], currentGraphComp : any) => {

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

const dummyGraph: BarGraph = {
    accountID: "649670a4bb3698c4809398cc",
    XLabel: "Day",
    YLabel: "Distance (miles)",
    Pairs: [{
        x: "Day 1",
        y: 8
    },{
        x: "Day 2",
        y: 12
    }, {
        x: "Day 3",
        y: 6
    }]
}

function saveDummyGraph() {
    saveNewGraph("bargraph", dummyGraph);
}