import p5 from 'p5';
import './canvas.css'
import vendiagram from './sketches/vendiagram';
import BarChart from './sketches/BarChart';
const { ReactP5Wrapper } = require('react-p5-wrapper');

export default function Canvas() {
  return (
    <div className='background'>
      <BarChart />
    </div>
  );
};
