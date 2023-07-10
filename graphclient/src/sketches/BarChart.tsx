import { Component, ReactNode } from "react";
import * as d3 from 'd3';


const DUMMY_DATA = [{
    x: "2015",
    y: 32,
}, {
    x: "2016",
    y: 55
}, {
    x: "2017",
    y: 150
}, {
    x: "2018",
    y: 103
}]

type Pairs = {
    x: string,
    y: number
}


export default class BarChart extends Component {

    componentDidMount(): void {
        this.drawChart(DUMMY_DATA);
    }

    drawChart(GraphData: Pairs[]) {
        let svg = d3
            .select("svg")
            .attr("width", 800)
            .attr("height", 400);

        

        svg
            .selectAll('rect')
            .data(GraphData)
            .enter()
            .append('rect')
            .attr("fill", "blue")
            .attr("width", 80)
            .attr("height", (d) => (d.y * 2))
            .attr("x", (d, i) => i * 180)
            .attr("y", (d) => 400 - (d.y * 2))
    }

    render(): ReactNode {
        return <svg className="bar-chart"></svg>
    }
}