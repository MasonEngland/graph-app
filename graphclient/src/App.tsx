import SideBar from './optionBars/sideBar';
import NavBar from './Header'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from './State/reducers/rooter-reducer';
import { getUserGraphs } from './State/action-creators/profile-action-creators';
import vendiagram from './sketches/vendiagram';
import p5 from 'p5';
import Canvas from './Canvas';

const { ReactP5Wrapper } = require('react-p5-wrapper');


function App() {
  const state : any = useSelector((state : State) => state.auth)
  const[displayGraph, setDisplayGraph] = useState()
  const[currentGraph, setCurrentGraph] = useState()
  const[userGraphs, setUserGraphs]     = useState()

  // On start useEffect runs
  useEffect(() => {
    // retrieve user elements
  }, [state])

  useEffect(() => {
    if(state.currentUser) getUserGraphs()
  }, [state.currentUser])

  const onClickDiagram = (selectedDiagramComponent : any) => {
    console.log(selectedDiagramComponent)
    setCurrentGraph(selectedDiagramComponent)
  }

  // all user graphs

  return (
    <>
      <NavBar/>
      <div className="AppContainer">
          <SideBar/>
          <Canvas onClickDiagram={(d) => onClickDiagram(d)} />
      </div>
    </>
  );
}

export default App;
