import { sideBars } from "./sideBar"

//@param changeDisplay - does what it says, takes argument of a void function
//* refer to ./sidebar to view side bar options
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
