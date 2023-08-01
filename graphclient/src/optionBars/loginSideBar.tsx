import { ChangeEvent, useState } from "react"
import { accountAuthNavigation } from "./sideBarNavigations"
import { loginUser } from "../State/action-creators/profile-action-creators";
import { sideBars } from "./sideBar";

interface LoginComponentParams {
    changeDisplay : (newDisplay : sideBars) => void,
    currentDisplay: sideBars,
}

export default function LoginSideBar ( {changeDisplay, currentDisplay} : LoginComponentParams ) {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        email: ""
    })

    // @param e - type: ChangeEvent<HTMLInputElement>
    // @param set{method}Info..type: (prev) => void - pass in state setter functions
    // @param prev - previous data that you are going to be setting
    //! only use on change events 
    function updateLoginInfo(e: ChangeEvent<HTMLInputElement>, setLoginInfo : (prev: any) => void, prev : any) : any{
        const key = e.target.name as string;
        const value = e.target.value as string;
        setLoginInfo({...prev, [key]: value})
    }

    return ( <>
        {accountAuthNavigation(changeDisplay, currentDisplay)}
        <ul>
            <p>Login In</p>
            <input name="username" onChange={(e) => updateLoginInfo(e, setLoginInfo, loginInfo)} placeholder="Username" />
            <input name="password" type="password" onChange={(e) => updateLoginInfo(e, setLoginInfo, loginInfo)} placeholder="Password" />
            <input name= "email"  onChange={(e) => updateLoginInfo(e, setLoginInfo, loginInfo)} placeholder="Email"/>
            <button onClick={() => loginUser(loginInfo)} type="submit">Confirm</button>
      </ul></>)
}