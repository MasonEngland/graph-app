import { useEffect, useState } from 'react'
import { loginSideBar, registerSideBar} from './profileSideBar';

import './sideBar.css'

import { useSelector } from 'react-redux';
import { State } from '../State/reducers/rooter-reducer';

export enum sideBars {
    REGISTER_SIDE_BAR = "REGISTER_SIDE_BAR",
    LOGIN_IN_SIDE_BAR = "LOGIN_SIDE_BAR",
    DEFAULT_USER_SIDE_BAR  = "DEFAULT_SIDE_BAR",
    EDITING_GRAPH_SIDE_BAR = "EDITING_SIDE_BAR"
}

export default function SideBar() {
    const[currentDisplay, setSideBar] = useState(sideBars.LOGIN_IN_SIDE_BAR)

    const [loginInfo, setloginInfo] = useState({
        username: "",
        password: "",
        email: ""
    })

    const state : any = useSelector((state : State) => state.auth)

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
    
    const userGraphs = [{
        title: "name1WAF"
    }, {
        title: "nHraghame1"
    }, {
        title: "Grahame1"
    }]

    // If a new graph is created it should navigate to the 
    // editing page
    const userHomePage = () => {
        return (<div className="graphs">
            {sideBarNavigation()}
            <ul>
                <h1>Graphs : </h1>
                <h3>New Graph : </h3>
                <input/>
                <input/>
                <button>Add New : </button>
                <div className="graphs">
                <h3>Existing Graphs : </h3>
                <input/>
                {userGraphs.map(( graph : any, i : number ) => (
                    <div className="graph">
                    <p>{graph.title}</p>
                    </div>
                ))}
                </div>
            </ul>
            </div>)
    }

    const changeDisplay = (newDisplay : sideBars) => setSideBar(newDisplay)

    // @ Brief : Update the side bar according to the option that the 
    //           user has requested to navigate to. 
    const displaySideBar = (newSideBar : sideBars) => {
        switch(newSideBar) {
            case sideBars.LOGIN_IN_SIDE_BAR:
                return loginSideBar(changeDisplay, setloginInfo, currentDisplay, loginInfo)
            case sideBars.REGISTER_SIDE_BAR:
                return registerSideBar(changeDisplay, currentDisplay)
        }
        return userHomePage()
    }

    // We will have a sideBarHeader in the Container which will have buttons.
    // When these buttons are clicked, it will call the setSideBar() with the
    // corresponding sideBars.(OPTION), and than that side
    return (
        <div className="sideBarContainer">
            {displaySideBar(currentDisplay)}
        </div>
    );
};
    