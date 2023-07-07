import p5 from 'p5';
import react from 'react';

export default function vendiagram(p: p5) {

    const labels: p5.Element[] = [];
    const elements: p5.Element[] = [];

    p.setup = () => {
        const canvas = p.createCanvas(800, 500);
        canvas.position(undefined, undefined, 'relative');
        drawDiagram();
        createAddButtons();
    }
    
    const drawDiagram = () => {
        p.blendMode(p.MULTIPLY);
        for (let i = 0; i < 2; i++) {
            labels.push(p.createElement('h3', "Label Here"));
            p.circle(300 + (i * 180), 250, 380);
        }
        for (let i = 0; i < labels.length; i++) {
            labels[i].position(680 + (i * 220), 180, 'absolute');
            labels[i].attribute("contenteditable", "true");
            labels[i].size(130, 25);
        }
    }

    const createAddButtons = () => {
        const buttons: p5.Element[] = [
            p.createButton("+", "Hello").position(580, 280, 'absolute'),
            p.createButton("+", "Hello").position(838, 230, 'absolute'),
            p.createButton("+", "Hello").position(1100, 280, 'absolute'),
        ];
        for (let item of buttons) {
            item.addClass("add-button");
        }
    }
}