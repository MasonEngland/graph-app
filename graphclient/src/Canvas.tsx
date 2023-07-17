import p5 from 'p5';
import vendiagram from './sketches/vendiagram';
import BarChart from './sketches/BarChart';
import vendiagram2 from './sketches/vendiagram';
import { useSelector } from 'react-redux';
import { State } from './State/reducers/rooter-reducer';
import { useEffect, useState, useRef } from 'react';
import VenDiagram from './sketches/VenDiagram2';
const { ReactP5Wrapper } = require('react-p5-wrapper');

interface CanvasParams {
  onClickDiagram: ( g : any) => void
}

export default function Canvas({ onClickDiagram } : CanvasParams) {
  const state: any = useSelector((state: State) => state.userInfo);
  const [currentGraph, setCurrentGraph] = useState({XLabel: "year", YLabel: "temp(f)",Pairs: []});
  const ref = useRef<any>(null)

  useEffect(() => {
    if (state.userGraphs && state.userGraphs.barGraphs.length > 0) {
      setCurrentGraph((prev) => {
        //console.log(state.userGraphs);
        return state.userGraphs.barGraphs[0];
      });
    }
  }, [state])

  return (

    <div className='background' ref = {ref}>
      { /*<BarChart graph={currentGraph}/> */ }
      <VenDiagram 
      // If the height and width exist, pass this info to D3
        height={ ref.current ? ref.current.clientHeight : 10 } 
        width ={ ref.current ? ref.current.clientWidth  : 10 }
      // When the user clicks on a ven diagram, this method will be called 
        onClickDiagram={(d) => onClickDiagram(d)} />
    </div>
  );
};
