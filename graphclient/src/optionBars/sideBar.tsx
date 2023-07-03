import { ChangeEvent, useState } from 'react'
import { loginUser } from '../State/action-creators/profile-action-creators';

import './sideBar.css'

export default function SideBar() {

    enum sideBars {
        REGISTER_SIDE_BAR = "REGISTER_SIDE_BAR",
        LOGIN_IN_SIDE_BAR = "LOGIN_SIDE_BAR",
        DEFAULT_USER_SIDE_BAR = "DEFAULT_SIDE_BAR",
    }
    

    function updateLoginInfo(e: ChangeEvent<HTMLInputElement>) {
        const key = e.target.name as string;
        const value = e.target.value as string;
        setloginInfo((preValue) => {
            return {
                username: key === "username" ? value : preValue.username,
                password: key === "password" ? value : preValue.password,
                email: key === "email" ? value : preValue.email 
            }
        })
    }

    function attemptLoginUser() {
        loginUser(loginInfo);
    }

    const [loginInfo, setloginInfo] = useState({
        username: "",
        password: "",
        email: ""
    })

    const[currentDisplay, setSideBar] = useState(sideBars.LOGIN_IN_SIDE_BAR)

    // This code should likely be in another file dedicated for the default side bar

    const accountAuthNavigation = () => {
        return (
            <>
            <h2>Account Management : </h2>
            <ul className='accountNavigation'>
                <div className={currentDisplay + '-loginTab'}
                     onClick = { ()=> setSideBar(sideBars.LOGIN_IN_SIDE_BAR) }>Login</div>    
                <div className={currentDisplay + '-registerTab'}
                     onClick = { ()=> setSideBar(sideBars.REGISTER_SIDE_BAR) }>Register</div>    
            </ul></>
        )
    }

    const loginSideBar = () => {
        return ( <>
            {accountAuthNavigation()}
            <ul>
                <p>Login In</p>
                <input name="username" onChange={(e) => updateLoginInfo(e)} placeholder="Username" />
                <input name="password" type="password" onChange={(e) => updateLoginInfo(e)} placeholder="Password" />
                <input name= "email" onChange={(e) => updateLoginInfo(e)} placeholder="Email"/>
                <button onClick={() => attemptLoginUser()} type="submit">Confirm</button>
          </ul></>)
    }

    const registerSideBar = () => {
        return ( <>
                {accountAuthNavigation()}
                <ul>
                <p>Register</p>
                <input placeholder="Email" />
                <input placeholder="Username" />
                <input placeholder="Password" type="password"/>
                <span></span>
                <button onClick={ ()=> setSideBar(sideBars.DEFAULT_USER_SIDE_BAR) }>Confirm</button>
              </ul></>)
    }

    const sideBarNavigation = () => {
        return (
            <>
            <ul className='sideBarNavigation'>
                <div className={currentDisplay + 'loginTab'}
                     onClick = { ()=> setSideBar(sideBars.LOGIN_IN_SIDE_BAR) }>Graphs</div>    
                <div className={currentDisplay + 'registerTab'}
                     onClick = { ()=> setSideBar(sideBars.REGISTER_SIDE_BAR) }>Edit</div>    
            </ul></>
        )
    }

    const userHomePage = () => {

    }

    // @ Brief : Update the side bar according to the option that the 
    //           user has requested to navigate to. 
    const displaySideBar = (newSideBar : sideBars) => {
        switch(newSideBar) {
            case sideBars.LOGIN_IN_SIDE_BAR:
                return loginSideBar()
            case sideBars.REGISTER_SIDE_BAR:
                return registerSideBar()
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
    