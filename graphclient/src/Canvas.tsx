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
  const [currentGraph, setCurrentGraph] = useState([{x: "0", y: 0, id: ""}, {x: "1", y: 1, id: ""}])
  useEffect(() => {
    if (state.userGraphs && state.userGraphs.barGraphs.length > 0) {
      setCurrentGraph((prev) => {
        console.log(state.userGraphs);
        return state.userGraphs.barGraphs[0].Pairs;
      });
    }
  }, [state])

  return (
    <div className='background'>
      <BarChart pairs={currentGraph}/>
    </div>
  );
};
