import { sideBars } from "./sideBar"

export const accountAuthNavigation = (changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars) => {
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

export const sideBarNavigation = (changeDisplay : (newDisplay : sideBars) => void, currentDisplay: sideBars) => {
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
