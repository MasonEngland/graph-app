import { useState } from 'react'

import './sideBar.css'

export default function SideBar() {
    enum sideBars {
        LOGIN_REGISTER_SIDE_BAR = "LOGIN_REGISTER_SIDE_BAR",
        DEFAULT_SIDE_BAR        = "DEFAULT_SIDE_BAR",
    }

    const[currentDisplay, setSideBar] = useState(sideBars.LOGIN_REGISTER_SIDE_BAR)

    // This code should likely be in another file dedicated for the default side bar
    const defaultSideBar = () => {
        return ( <>
            <h2>Account Management : </h2>
            <ul>
                <p>Sign In</p>
                <input placeholder="Username" />
                <input placeholder="Password" />
                <p>Register</p>
                <input placeholder="Email" />
                <input placeholder="Username" />
                <input placeholder="Password" />
                <span></span>
                <button>Confirm</button>
          </ul></>)
    }

    // @ Brief : Update the side bar according to the option that the 
    //           user has requested to navigate to. 
    const displaySideBar = (newSideBar : sideBars) => {
        switch(newSideBar) {
            case sideBars.LOGIN_REGISTER_SIDE_BAR:
                return defaultSideBar()
            default :
            return (<div className="DEFAULT"></div>)
        }
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
    