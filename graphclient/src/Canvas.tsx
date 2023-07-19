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

interface CanvasParams {
  onClickDiagram: ( g : any) => void
}

export default function Canvas({ onClickDiagram } : CanvasParams) {
  const state: any = useSelector((state: State) => state.userInfo);
  const otherState: any = useSelector((state: State) => state.updateGraph.currentGraph)
  const [currentGraph, setCurrentGraph] = useState({XLabel: "year", YLabel: "temp(f)",Pairs: []});
  const ref = useRef<any>(null)

  useEffect(() => console.log(otherState), [otherState]);

  useEffect(() => {
    if (state.userGraphs && state.userGraphs.barGraphs.length > 0) {
      setCurrentGraph((prev) => {
        //console.log(state.userGraphs);
        return state.userGraphs.barGraphs[0];
      });
    }
  }, [state]);

  //!!!!!!!!!!         all ur code is located in dummydata.ts btw

  return (
    <div className='background' ref = {ref}>
      <BarChart graph={currentGraph}/> 
    </div>
  );
};
