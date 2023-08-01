import DropDownMenu from "./dropDownMenu";
import { sideBars } from "./sideBar";
import { sideBarNavigation } from "./sideBarNavigations";

interface UserHomePageParams {
    changeDisplay : (newDisplay : sideBars) => void,
    currentDisplay: sideBars,
    selectedOptionDMenu : (selectedOption : string) => void,
    addGraph : (e : any) => void
}

// If a new graph is created it should navigate to the 
// editing page
//* this is the main page for each user
export default function UserHomeSideBar ({selectedOptionDMenu, changeDisplay, currentDisplay, 
    addGraph} : UserHomePageParams) {
    
    //! ignore, just some dummy data
    const userGraphs = [{
        title: "name1WAF"
    }, {
        title: "nHraghame1"
    }, {
        title: "Grahame1"
    }]

    return (<div className="graphs">
        <h2>Graphs : </h2>
        {sideBarNavigation(changeDisplay, currentDisplay)}
        <ul>
        <p>New Graph : </p>
        <input placeholder="Graph Name"/>
        <>
        <DropDownMenu
            open={true} 
            multiple={false}
            menuOptions ={[
                "Ven Diagram",
                "Bar Graph",
                "UML Diagram",
                "Gannt Chart"
            ]} 
            selectOption = {selectedOptionDMenu}
            onEmptyMsg = {"Graph Types ... "}/>
        </>
        <button onClick={ (e)=> addGraph(e) }>Add New : </button>
        <div className="graphs">
        <p>Existing Graphs : </p>
        <input placeholder="Search by Name"/>
        <DropDownMenu
            open={true} 
            multiple={false}
            menuOptions ={[
                "Ven Diagram",
                "Bar Graph",
                "UML Diagram",
                "Gannt Chart"
            ]} 
            selectOption = {selectedOptionDMenu}
            onEmptyMsg = {"Filter by Graph"}/>
        {userGraphs.map(( graph : any, i : number ) => (
            <div className="graph">
            <p>{graph.title}</p>
            </div>
        ))}
        </div>
        </ul>
    </div>)
}