// ** Components Imports ** //
import LoginSideBar from './loginSideBar';
import RegisterSideBar from './registerSideBat';
import UserHomeSideBar from './userHomeGraphSideBar';
import EditGraphSideBar from './editGraphSideBar';

// ** State ** //
import { useEffect, useState } from 'react'
import { State } from '../State/reducers/rooter-reducer';
import { useSelector } from 'react-redux';

import { addGraphToStore, saveNewGraph, updateUserGraph } from '../State/action-creators/profile-action-creators';

// ** Misc ** //
import { initialBarGraph } from '../sketches/dummydata';

export enum sideBars {
    REGISTER_SIDE_BAR = "REGISTER_SIDE_BAR",
    LOGIN_IN_SIDE_BAR = "LOGIN_SIDE_BAR",
    DEFAULT_USER_SIDE_BAR  = "DEFAULT_SIDE_BAR",
    EDITING_GRAPH_SIDE_BAR = "EDITING_SIDE_BAR"
}

// main component implemented in ../App.tsx
export default function SideBar() {

    // @section --- STATE

    const[currentDisplay, setSideBar] = useState(sideBars.LOGIN_IN_SIDE_BAR);
    const[userGraph, setUserGraph   ] = useState({graphType: ""});
    const [nameInput, setNameInput] = useState("");

    // state configuration
    // current graphs is a state var that stores the selected graph
    const state : any = useSelector((state : State) => state.auth);
    const [currentGraph, setCurrentGraph] = useState();
    const [currentGraphComp, setCurrentGraphComp] = useState<any | null>(null);

    const graphstate : any = useSelector((state: State) => state.updateGraph);
    

    // @section --- EFFECT

    // If a graph is selected, update state
    useEffect(() => {
        setCurrentGraph(graphstate.currentGraph);
    }, [graphstate.currentGraph])

    // If the graphs component is selected, update state
    useEffect(() => {
        if(graphstate.currentGraphComponent )
            setSideBar(sideBars.EDITING_GRAPH_SIDE_BAR)
    }, [graphstate.currentGraphComponent])


    //* this checks if there is a user logged in, and if so changes the side bar
    useEffect( ()=> {
        if(state.currentUser) setSideBar(sideBars.DEFAULT_USER_SIDE_BAR)
    }, [state.currentUser] )

    // This gets called when an element has been selected from a drop down menu
    const selectedOptionDMenu = (selectedOption : string) => {
        setUserGraph({ ...userGraph, graphType : selectedOption })
    }

    // @section --- FUNCTIONS

    // @ breif This adds a new graph to the users profile which they can edit
    const addGraph = (e: any) => {
        initialBarGraph.Name = nameInput;
        initialBarGraph.accountID = state.currentUser.id;
        const newGraph = {...userGraph, ...initialBarGraph};
        navigateToGraph(newGraph);
        addGraphToStore(newGraph);
    }

    // @ brief This select a new graph for the user to edit
    const navigateToGraph = (selectedGraph : any) => {
        setCurrentGraphComp(null);
        setUserGraph(selectedGraph);
        if (userGraph.graphType = "Bar Graph") {
            //saveNew("bargraph");
        }
    }
    
    // simple function to set which Side Bar the user has navigated too
    const changeDisplay = (newDisplay : sideBars) => { 
        setCurrentGraphComp(null)
        setSideBar(newDisplay)
    }

    const saveNew = (type: string) => {
        setSideBar(sideBars.EDITING_GRAPH_SIDE_BAR);
        initialBarGraph.accountID = state.currentUser.id;
        initialBarGraph.Name = nameInput;
        updateUserGraph(initialBarGraph);
        saveNewGraph(type, initialBarGraph);
    }

    // @ Brief : Update the side bar according to the option that the user has requested to navigate to. 
    const displaySideBar = (newSideBar : sideBars) => {
        switch(newSideBar) {
            case sideBars.LOGIN_IN_SIDE_BAR:
                return <LoginSideBar 
                        currentDisplay= {currentDisplay}
                        changeDisplay ={changeDisplay} />
            case sideBars.REGISTER_SIDE_BAR:
                return <RegisterSideBar 
                        currentDisplay= {currentDisplay}
                        changeDisplay ={changeDisplay} />
            case sideBars.EDITING_GRAPH_SIDE_BAR:
                return <EditGraphSideBar 
                        selectedOptionDMenu = {selectedOptionDMenu} 
                        currentDisplay = {currentDisplay} 
                        userGraph = {userGraph}
                        changeDisplay = {changeDisplay}/>
        }
        return <UserHomeSideBar
                 selectedOptionDMenu = {selectedOptionDMenu} 
                 addGraph = {addGraph}
                 changeDisplay = {changeDisplay}
                 currentDisplay ={currentDisplay}
                 setNameInput={setNameInput}/>
    }


    // @section --- COMPONENT

    // Render the side bar
    return (
        <div className="sideBarContainer">
            {displaySideBar(currentDisplay)}
        </div>
    );
};
