import { sideBars } from "./sideBar"

const sideBarNavigation = (changeDisplay : (newDisplay : sideBars) => void, currentDisplay : any) => {
    return (
        <>
        <ul className='sideBarNavigation'>
            <div className={currentDisplay + 'loginTab'}
                 onClick = { ()=> changeDisplay(sideBars.LOGIN_IN_SIDE_BAR) }>Graphs</div>    
            <div className={currentDisplay + 'registerTab'}
                 onClick = { ()=> changeDisplay(sideBars.REGISTER_SIDE_BAR) }>Edit</div>    
        </ul></>
    )
}
