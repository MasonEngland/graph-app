// ** Components Imports ** //
import { loginSideBar, registerSideBar} from './profileSideBar';

// ** State ** //
import { useEffect, useState } from 'react'
import { State } from '../State/reducers/rooter-reducer';
import { useSelector } from 'react-redux';

import { userHomePage, userGraphEditing } from './graphsOverviewSideBar';
import { diagramInputModel } from '../Types/graphs-structure';

export enum sideBars {
    REGISTER_SIDE_BAR = "REGISTER_SIDE_BAR",
    LOGIN_IN_SIDE_BAR = "LOGIN_SIDE_BAR",
    DEFAULT_USER_SIDE_BAR  = "DEFAULT_SIDE_BAR",
    EDITING_GRAPH_SIDE_BAR = "EDITING_SIDE_BAR"
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

    const selectedComponent = (selectedOption : string) => {
        console.log(selectedOption)
        const inputsToGraph = (diagramInputModel as any)[selectedOption] 
        setGraphInputs(inputsToGraph !== undefined ? inputsToGraph : [])
    }
    
    // simple function to set which Side Bar the user has navigated too
    const changeDisplay = (newDisplay : sideBars) => setSideBar(newDisplay)

    // @ Brief : Update the side bar according to the option that the user has requested to navigate to. 
    const displaySideBar = (newSideBar : sideBars) => {
        switch(newSideBar) {
            case sideBars.LOGIN_IN_SIDE_BAR:
                return loginSideBar(changeDisplay, setloginInfo, currentDisplay, loginInfo)
            case sideBars.REGISTER_SIDE_BAR:
                return registerSideBar(changeDisplay, currentDisplay, regInfo, setRegInfo);
            case sideBars.EDITING_GRAPH_SIDE_BAR:
                return (<>{userGraphEditing(selectedOptionDMenu, currentDisplay, userGraph, 
                    selectedComponent, changeDisplay,userGraphs[0], graphInputs)}</>)
        }
        return userHomePage(userGraphs, selectedOptionDMenu, addGraph, changeDisplay, currentDisplay)
    }

    // Render the side bar
    return (
        <div className="sideBarContainer">
            {displaySideBar(currentDisplay)}
        </div>
    );
};
    