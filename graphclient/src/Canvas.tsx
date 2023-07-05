import p5 from 'p5';
import './canvas.css'
import vendiagram from './sketches/vendiagram';
const { ReactP5Wrapper } = require('react-p5-wrapper');

export default function Canvas() {
  return (
     <ReactP5Wrapper sketch={(p: p5) => vendiagram(p)}/>
  );
};
  