import { useEffect, useState } from "react";
import './dropDownMenu.css'

type dropDownMenuParams = {
    open: boolean,
    multiple: boolean,
    menuOptions : any[], 
    selectOption: (selectedOption: string) => void,
    onEmptyMsg : string
}


// @ brief : Displays an interactable drop-down for the user to select elements 
//
// @ params open : Determines if all the contents of the drop down menu are displayed
// @ params multiple : Determines if multiple elements from the drop down menu can be selected
// @ params menuOptions : Displays possible options for the user to select when they open
//          the drop down menu
// @ params selectOption : A call back function for when the user has selected an element 
//           from the drop down menu
// @ params onEmptyMsg : Text displayed if no elements have been selected by the user 
export default function DropDownMenu ({open, multiple, selectOption, menuOptions, onEmptyMsg}: dropDownMenuParams) { 
    const [isOpen, setOpen] = useState(false)
    const [activeOptions, setActOptions] = useState<any[]>([]) 
    const [highLightFolder, setHLFolder] = useState<number>(-1)

    
    useEffect( () => { },[] )

    const clearFolders = (e : any) => {
        e.stopPropagation()
        setActOptions([])
    }

    const selectedFolder = (e : any, option : string) => {
        e.stopPropagation()
        if(multiple) {
            if(!activeOptions.includes(option)) {
                selectOption(option)
                setActOptions([...activeOptions, option])
            }
        }
        else {
            selectOption(option)
            setActOptions([option])
        }
    }

    const removeFromFolders = ( e : any, option : string) => {
        e.stopPropagation()
        const updateFolders = activeOptions.filter( _option => _option != option );
        setActOptions(updateFolders)
    }

    if(!open) return <></>

    return (
        <div onBlur = { ()=>setOpen(false) } 
            onClick = { ()=>setOpen(!isOpen)  } 
            tabIndex={0} 
            className="folderMenu">
            <span className="selectedFolders">
            { 
                //*** We display all selected folders, or an empty message ***// 
            }
            {activeOptions.length == 0 ? 
            <span>{onEmptyMsg}</span> :
            activeOptions.map( ( folder, i ) => (
                <button 
                key={folder} 
                className="currentFolder"
                onClick = { (e) => removeFromFolders(e, folder)}>
                    {folder}
                </button>
            ))}
            </span>
            <button onClick = { (e) => clearFolders(e) } className="menuClose">
            </button>

            {
                // Display available options to the user if they open the
                // dropdown Menu
            }
            <div className="divider"></div>
            <div className="menuOpen"></div>
            <ul className={`folders ${isOpen ? "show" : ""}`}>
                {menuOptions.map( ( option : any, i : number ) => (
                    <li 
                    key={i}
                    onMouseEnter = {() => setHLFolder(i)} 
                    onClick = { (e) => selectedFolder(e, option)}
                    className={
                        `${highLightFolder === i ? "highlighted" : ""}
                         ${activeOptions.includes(option) ? "selected" : ""}`}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    )
}