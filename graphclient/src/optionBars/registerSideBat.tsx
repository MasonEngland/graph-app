import { regUser } from "../State/action-creators/profile-action-creators";
import { ChangeEvent, useState } from "react"
import { accountAuthNavigation } from "./sideBarNavigations"
import { sideBars } from "./sideBar";

interface RegisterComponentParams {
    changeDisplay : (newDisplay : sideBars) => void,
    currentDisplay: sideBars,
}

export default function RegisterSideBar ( {changeDisplay, currentDisplay} : RegisterComponentParams ) {
    const [regInfo, setRegInfo] = useState({
        username: "",
        password: "",
        email: "",
    })

    // @param e - type: ChangeEvent<HTMLInputElement>
    // @param set{method}Info..type: (prev) => void - pass in state setter functions
    // @param prev - previous data that you are going to be setting
    //! only use on change events 
    function updateRegInfo(e: ChangeEvent<HTMLInputElement>, setRegInfo: (prev: any) => void, prev: any) {
        const key = e.target.name as string;
        const value = e.target.value as string;
        setRegInfo({...prev, [key]: value})
    }

    const regButtonHandler = (e: any) => {
        regUser(regInfo);
        //todo: once user is registered, they should automatically get logged in
        //loginUser(regInfo);
        changeDisplay(sideBars.DEFAULT_USER_SIDE_BAR);
    }

    return ( <>
        {accountAuthNavigation(changeDisplay, currentDisplay)}
        <ul>
        <p>Register</p>
        <input name="email" placeholder="Email" onChange={(e) => updateRegInfo(e, setRegInfo, regInfo)} />
        <input name="username" placeholder="Username" onChange={(e) => updateRegInfo(e, setRegInfo, regInfo)}/>
        <input name="password" placeholder="Password" type="password" onChange={(e) => updateRegInfo(e, setRegInfo, regInfo)}/>
        <span></span>
        <button onClick={(e)=> regButtonHandler(e)}>Confirm</button>
        </ul>
    </>)
}