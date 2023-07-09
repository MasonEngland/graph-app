// ** Components Imports ** //
import { loginSideBar, registerSideBar} from './profileSideBar';
import DropDownMenu from './dropDownMenu';

// ** State ** //
import { useEffect, useState } from 'react'
import { State } from '../State/reducers/rooter-reducer';
import { useSelector } from 'react-redux';

import './sideBar.css'

export enum sideBars {
    REGISTER_SIDE_BAR = "REGISTER_SIDE_BAR",
    LOGIN_IN_SIDE_BAR = "LOGIN_SIDE_BAR",
    DEFAULT_USER_SIDE_BAR  = "DEFAULT_SIDE_BAR",
    EDITING_GRAPH_SIDE_BAR = "EDITING_SIDE_BAR"
}

// These are graph types
enum graphTypes {
    VEN_DIAGRAM = "venDiagram",
    UML_DIAGRAM = "umlDiagram",
    GANNT_CHART = "ganntChart" 
}

// main component implemented in ../App.tsx
export default function SideBar() {
    const[currentDisplay, setSideBar] = useState(sideBars.LOGIN_IN_SIDE_BAR)
    const[userGraph, setUserGraph   ] = useState({})
    const[graphInputs, setGraphInputs  ] = useState([])
    const[editingGraph, setEditingGraph] = useState(false)

    const [loginInfo, setloginInfo] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [regInfo, setRegInfo] = useState({
        username: "",
        password: "",
        email: "",
    })

    const state : any = useSelector((state : State) => state.auth)

    //* this checks if there is a user logged in, and if so changes the side bar
    useEffect( ()=> {
        if(state.currentUser) setSideBar(sideBars.DEFAULT_USER_SIDE_BAR)
    }, [state.currentUser] )

    const sideBarNavigation = () => {
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
    
    //! ignore, just some dummy data
    const userGraphs = [{
        title: "name1WAF"
    }, {
        title: "nHraghame1"
    }, {
        title: "Grahame1"
    }]

    // This gets called when an element has been selected from a drop down menu
    const selectedOptionDMenu = (selectedOption : string) => {
        console.log(selectedOption + " Is the option you selected")
        setUserGraph({ ...userGraph, graphType : selectedOption })
    }

    // @ breif This adds a new graph to the users profile which they can edit
    const addGraph = (e: any) => {
        const newGraph = {...userGraph, title: userGraphs[0].title}
        navigateToGraph(newGraph)
    }

    // @ brief This select a new graph for the user to edit
    const navigateToGraph = (selectedGraph : any) => {
        setUserGraph(selectedGraph)
        setEditingGraph(false)
        setSideBar(sideBars.EDITING_GRAPH_SIDE_BAR)
    }

    // If a new graph is created it should navigate to the 
    // editing page
    //* this is the main page for each user
    const userHomePage = () => {
        return (<div className="graphs">
            {sideBarNavigation()}
            <ul>
                <h2>Graphs : </h2>
                <p>New Graph : </p>
                <input placeholder="Graph Name"/>
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
                <button onClick={ (e)=> addGraph(e) }>Add New : </button>
                <div className="graphs">
                <h2>Existing Graphs : </h2>
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

    const venDiagramComponents = ["Ven Diagram"]
    const umlDiagramComponents = ["Class", "Interface"]
    const ganntChartComponents = ["Event"]

    const diagramComponentModel = {
        "Ven Diagram" : venDiagramComponents,
        "UML Diagram" : umlDiagramComponents,
        "Gannt Chart" : ganntChartComponents
    }

    const venDiagramInputs = ["Title", "Contents"]
    const umlClassInputs = ["Title", "Overview", "Variables"]
    const eventInputs = ["Event Name", "Task Overview", "Begin Date", "End Date" ]

    const diagramInputModel = {
        "Ven Diagram" : venDiagramInputs,
        "Class" : umlClassInputs,
        "Interface" : umlClassInputs,
        "Gannt Chart" : eventInputs
    }

    const selectedComponent = (selectedOption : string) => {
        console.log(selectedOption)
        const inputsToGraph = (diagramInputModel as any)[selectedOption] 
        setGraphInputs(inputsToGraph !== undefined ? inputsToGraph : [])
    }

    // @ brief : This will allow a user to modify an already existing graph.
    // A user can 
    //   1. Add a graph "Component" to a graph
    //   2. Edit a pre-existing graph component
    // @params selectedGraph is the graph that the user choose to edit
    const userEditGraph = (graph : any, editingGraph : boolean) => {
        const graphType = userGraphs[0]
        let test = (diagramComponentModel as any)[(userGraph as any)["graphType"]]
        
        if(!test) test = []

        return (<div className="graphs">
            {sideBarNavigation()}
            <ul>
                <h2>{graph.title}</h2>
                <h2>Graph Components : </h2>
                <input placeholder="Component Name"/>
                <DropDownMenu
                    open={true} 
                    multiple={false}
                    menuOptions ={ test } 
                    selectOption = {selectedComponent}
                    onEmptyMsg = {"Components ... "}/>
                {graphInputs.map((inputFields : string, i : number ) => (
                    <>
                        <input placeholder = {inputFields}/>
                    </>
                ))}
                <button>Add Component </button>
                <div className="graphs">
                <h2>Existing Components </h2>
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


    // simple function to 
    const changeDisplay = (newDisplay : sideBars) => setSideBar(newDisplay)

    // @ Brief : Update the side bar according to the option that the user has requested to navigate to. 
    const displaySideBar = (newSideBar : sideBars) => {
        switch(newSideBar) {
            case sideBars.LOGIN_IN_SIDE_BAR:
                return loginSideBar(changeDisplay, setloginInfo, currentDisplay, loginInfo)
            case sideBars.REGISTER_SIDE_BAR:
                return registerSideBar(changeDisplay, currentDisplay, regInfo, setRegInfo);
            case sideBars.EDITING_GRAPH_SIDE_BAR:
                return (<>{userEditGraph(userGraph, editingGraph)}</>)
        }
        return userHomePage()
    }

    // We will have a sideBarHeader in the Container which will have buttons.
    // When these buttons are clicked, it will call the setSideBar() with the
    // corresponding sideBars.(OPTION), and than that side
    //! this is the part called in ../App.tsx
    return (
        <div className="sideBarContainer">
            {displaySideBar(currentDisplay)}
        </div>
    );
};
    