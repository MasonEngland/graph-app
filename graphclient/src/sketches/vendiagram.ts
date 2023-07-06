import p5 from 'p5';
import react from 'react';

export default function vendiagram(p: p5) {

    const labelContents: string[] = [];
    const labels: p5.Element[] = [];


    p.setup = () => {
        const canvas = p.createCanvas(800, 500);
        canvas.position(undefined, undefined, 'relative');
        drawDiagram();
    }
    
    const drawDiagram = () => {
        p.blendMode(p.MULTIPLY);
        for (let i = 0; i < 2; i++) {
            labels.push(p.createElement('h3', "Label Here"));
            p.circle(300 + (i * 180), 250, 380);
        }
        for (let i = 0; i < labels.length; i++) {
            labels[i].class(`vendiagram label${i}`);
            labels[i].attribute("contenteditable", "true");
            labels[i].size(150, 25);
        }
    }
}