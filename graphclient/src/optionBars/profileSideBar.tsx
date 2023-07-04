import { ChangeEvent } from "react";
import { loginUser, regUser } from "../State/action-creators/profile-action-creators";
import { sideBars } from "./sideBar";


const accountAuthNavigation = (changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars) => {
    return (
        <>
        <h2>Account Management : </h2>
        <ul className='accountNavigation'>
            <div className={currentDisplay + '-loginTab'}
                 onClick = { ()=> changeDisplay(sideBars.LOGIN_IN_SIDE_BAR) }>Login</div>    
            <div className={currentDisplay + '-registerTab'}
                 onClick = { ()=> changeDisplay(sideBars.REGISTER_SIDE_BAR) }>Register</div>    
        </ul></>
    )
}

// these functions will be import in sideBar.tsx
//@param set{method}Info, {method}Info - pass in the getter and setter for the coorisponding state var in sideBar.tsx
export const loginSideBar = (changeDisplay : (newDisplay : sideBars) => void, setLoginInfo: (e: any) => void,
            currentDisplay: sideBars, loginInfo : any) => {
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

export function registerSideBar(changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars, regInfo: any, setRegInfo: (e: any) => void) {

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


// @param e - type: ChangeEvent<HTMLInputElement>
// @param set{method}Info..type: (prev) => void - pass in state setter functions
// @param prev - previous data that you are going to be setting
//! only use on change events 
function updateLoginInfo(e: ChangeEvent<HTMLInputElement>, setLoginInfo : (prev: any) => void, prev : any) : any{
    const key = e.target.name as string;
    const value = e.target.value as string;
    setLoginInfo({...prev, [key]: value})
}

function updateRegInfo(e: ChangeEvent<HTMLInputElement>, setRegInfo: (prev: any) => void, prev: any) {
    const key = e.target.name as string;
    const value = e.target.value as string;
    setRegInfo({...prev, [key]: value})
}