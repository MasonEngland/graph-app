import p5 from 'p5';
import './canvas.css'
import vendiagram from './sketches/vendiagram';
import BarChart from './sketches/BarChart';
import { useSelector } from 'react-redux';
import { State } from './State/reducers/rooter-reducer';
import { useEffect, useState } from 'react';
const { ReactP5Wrapper } = require('react-p5-wrapper');

export default function Canvas() {
  const state: any = useSelector((state: State) => state.userInfo);
  const [currentGraph, setCurrentGraph] = useState({XLabel: "year", YLabel: "temp(f)",Pairs: []});
  
  useEffect(() => {
    if (state.userGraphs && state.userGraphs.barGraphs.length > 0) {
      setCurrentGraph((prev) => {
        //console.log(state.userGraphs);
        return state.userGraphs.barGraphs[0];
      });
    }
  }, [state])

  return (
    <div className='background'>
      <BarChart graph={currentGraph}/>
    </div>
  );
};
