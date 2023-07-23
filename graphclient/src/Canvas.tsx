import p5 from 'p5';
import vendiagram from './sketches/vendiagram';
import BarChart from './sketches/BarChart';
import vendiagram2 from './sketches/vendiagram';
import { useSelector } from 'react-redux';
import { State } from './State/reducers/rooter-reducer';
import { useEffect, useState, useRef, ReactNode } from 'react';
import VenDiagram from './sketches/VenDiagram2';
import { updateGraph } from './State/action-creators/profile-action-creators';
const { ReactP5Wrapper } = require('react-p5-wrapper');

export default function Canvas() {
  const userstate: any = useSelector((state: State) => state.userInfo);
  const [currentGraph, setCurrentGraph] = useState({XLabel: "year", YLabel: "temp(f)",Pairs: []});
  const ref = useRef<any>(null);

  useEffect(() => {
    if (userstate.userGraphs && userstate.userGraphs.barGraphs.length > 0) {
      setCurrentGraph((prev) => {
        //console.log(state.userGraphs);
        return userstate.userGraphs.barGraphs[0];
      });
    }
  }, [userstate]);

  // @section --- EVENT HANDLERS

  const graphUpdateHandler = (e: React.MouseEvent<any>) => {
    if (currentGraph.Pairs.length > 0) {
      updateGraph("bargraph", currentGraph);
    }
    else return;
  }

  // @section --- COMPONENT

  //!!!!!!!!!!         all ur code is located in dummydata.ts
  return (
    <div className='background' ref = {ref} onClick={graphUpdateHandler}>
      <VenDiagram
        // If the height and width exist, pass this info to D3
        height={ ref.current ? ref.current.clientHeight : 10 } 
        width ={ ref.current ? ref.current.clientWidth  : 10 } 
        />    
      </div>
  );
};
