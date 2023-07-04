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

// main component implemented in ../App.tsx
export default function SideBar() {
    const[currentDisplay, setSideBar] = useState(sideBars.LOGIN_IN_SIDE_BAR)

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
        console.log(selectedOption)
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
                <button>Add New : </button>
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
                return (<>{}</>)
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
    