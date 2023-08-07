import { useSelector } from "react-redux";
import DropDownMenu from "./dropDownMenu";
import { sideBars } from "./sideBar";
import { sideBarNavigation } from "./sideBarNavigations";
import { State } from "../State/reducers/rooter-reducer";
import { useEffect, useState } from "react";
import { updateUserGraph } from "../State/action-creators/profile-action-creators";

interface UserHomePageParams {
    changeDisplay : (newDisplay : sideBars) => void,
    currentDisplay: sideBars,
    selectedOptionDMenu : (selectedOption : string) => void,
    addGraph : (e : any) => void,
    setNameInput : React.Dispatch<React.SetStateAction<string>>;
}

// If a new graph is created it should navigate to the 
// editing page
//* this is the main page for each user
export default function UserHomeSideBar ({selectedOptionDMenu, changeDisplay, currentDisplay, 
    addGraph, setNameInput} : UserHomePageParams) {
    const graphstate : any = useSelector((state: State) => state.userInfo);
    
    const setupUserGraphs = ()=> {
        let graphs: any[] = []
        
        Object.keys(graphstate.userGraphs).forEach( (graphType : string) => {
            const currentGraphs = graphstate.userGraphs[graphType]
            if(typeof(currentGraphs) == typeof([]) ) {
                currentGraphs.forEach( (graph : {}) =>
                    graphs.push({...graph, "graphType" : graphType})
                )
            }
        })
        return graphs
    }

    const[userGraphs, setUserGraphs] = useState<any []>([])

    useEffect( ()=> {
        if(graphstate.userGraphs) {
            setUserGraphs(setupUserGraphs())
        }
    },[graphstate.userGraphs])


    return (<div className="graphs">
        <h2>Graphs : </h2>
        {sideBarNavigation(changeDisplay, currentDisplay)}
        <ul>
        <p>New Graph : </p>
        <input placeholder="Graph Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameInput(e.target.value);
            }}/>
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
         { /** Display User Graphs*/ }
        {userGraphs.map((graph: {}) => (
            <div className="graph" onClick = { () => updateUserGraph(graph) }>
                <p>{(graph as any)["graphType"]}</p>
            </div>
        ))}
        </div>
        </ul>
    </div>)
}