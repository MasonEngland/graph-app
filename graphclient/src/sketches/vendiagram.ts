import { render } from '@testing-library/react';
import p5 from 'p5';
import react, { useState } from 'react';

export default function vendiagram(p: p5) {

    const labels: p5.Element[] = [];
    let leftnotes: p5.Element[] = [];
    let rightnotes: p5.Element[] = [];
    let middlenotes: p5.Element[] = [];

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
            p.createButton("+", "Hello").position(580, 280, 'absolute').mousePressed(() => {renderNotes("left")}),
            p.createButton("+", "Hello").position(838, 230, 'absolute').mousePressed(() => {renderNotes("middle")}),
            p.createButton("+", "Hello").position(1100, 280, 'absolute').mousePressed(() => {renderNotes("right")}),
        ];
        for (let item of buttons) {
            item.addClass("add-button");
        }
        renderNotes("left");
        renderNotes("right");
        renderNotes("middle");
    }

    const renderNotes = (location: string) => {
        switch (location) {
            case "left":
                leftnotes.push(p.createElement("h4", "New Item<br />"));
                for (let i = 0; i < leftnotes.length; i++) {
                    leftnotes[i].position(630, 300 + (i * 30), 'absolute');
                    leftnotes[i].attribute('contenteditable', 'true');
                }
                break;
            case "right":
                rightnotes.push(p.createElement("h4", "New Item"));
                for (let i = 0; i < rightnotes.length; i++) {
                    rightnotes[i].position(960, 300 + (i * 30), 'absolute');
                    rightnotes[i].attribute('contenteditable', 'true');
                }
                break;
            case "middle":
                middlenotes.push(p.createElement("h4", "New Item"));
                for (let i = 0; i < middlenotes.length; i++) {
                    middlenotes[i].position(815, 300 + (i * 30), 'absolute');
                    middlenotes[i].attribute("contenteditable", "true");
                }
        }
    }
}