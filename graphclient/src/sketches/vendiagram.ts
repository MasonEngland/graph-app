import p5 from 'p5';

export default function vendiagram(p: p5) {

    p.setup = () => {
        const canvas = p.createCanvas(600, 300);
        canvas.position(undefined, undefined, 'relative');
    }
    p.draw = () => {
        p.circle(100, 100, 50);
    }
}