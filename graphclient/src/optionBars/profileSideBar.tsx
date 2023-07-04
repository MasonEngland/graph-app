import { ChangeEvent } from "react";
import { loginUser } from "../State/action-creators/profile-action-creators";
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

export function registerSideBar(changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars) {
    return ( <>
        {accountAuthNavigation(changeDisplay, currentDisplay)}
        <ul>
        <p>Register</p>
        <input placeholder="Email" />
        <input placeholder="Username" />
        <input placeholder="Password" type="password"/>
        <span></span>
        <button onClick={ ()=> changeDisplay(sideBars.DEFAULT_USER_SIDE_BAR) }>Confirm</button>
        </ul>
    </>)
}

function updateLoginInfo(e: ChangeEvent<HTMLInputElement>, setLoginInfo : (prev: any) => void, prev : any) : any{
    const key = e.target.name as string;
    const value = e.target.value as string;
    setLoginInfo({...prev, [key]: value})
}