import p5 from 'p5';
import vendiagram from './sketches/vendiagram';
import BarChart from './sketches/BarChart';
import vendiagram2 from './sketches/vendiagram';
import { useSelector } from 'react-redux';
import { State } from './State/reducers/rooter-reducer';
import { useEffect, useState, useRef, ReactNode } from 'react';
import VenDiagram from './sketches/VenDiagram2';
const { ReactP5Wrapper } = require('react-p5-wrapper');

export default function Canvas() {

  // @section --- STATE 
  const userstate: any = useSelector((state: State) => state.userInfo); // @STORE -- all graphs connected to the user
  const graphstate: any = useSelector((state: State) => state.updateGraph); // @STORE -- current graph being edited
  const [currentGraph, setCurrentGraph] = useState({Type: "", XLabel: "year", YLabel: "temp(f)",Pairs: []});
  const ref = useRef<any>(null);

  // @section --- EFFECT

  useEffect(() => {
    try {
      if (graphstate.currentGraph) {
        setCurrentGraph(graphstate.currentGraph);
        console.log("All things work as planned");
      }
    } catch (err) {
      console.log(err);
    }
  }, [graphstate]);

  useEffect(() => {
    if (userstate.userGraphs && userstate.userGraphs.barGraphs.length > 0) {
      setCurrentGraph((prev) => {
        //console.log(state.userGraphs);
        return userstate.userGraphs.barGraphs[0];
      });
      console.log(currentGraph);
    }
  }, [userstate]);

  

  // @section --- EVENT HANDLERS


  // @section --- COMPONENT

  return (
    <div className='background' ref={ref}>
      <BarChart graph={currentGraph} />
    </div>
  );
};

/*
<VenDiagram
  // If the height and width exist, pass this info to D3
  height={ ref.current ? ref.current.clientHeight : 10 } 
  width ={ ref.current ? ref.current.clientWidth  : 10 } 
  />    

*/