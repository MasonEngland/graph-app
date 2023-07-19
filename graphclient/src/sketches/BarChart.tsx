import { Component, ReactNode, useEffect, useState } from 'react';
import * as d3 from 'd3';
import DUMMY_DATA from './dummydata';
import { Graph } from '../Types/graphs-structure';

/**
 * @ brief - this file draws a bargraph based on recieved graph data
 * @ brief - call with <BarChart graph = {insert graph data}/>
 */

/*type Graph = {
    _id?: string,
    accountID?: string,
    top?: number,
    left?: number,
    width?: number,
    height?: number,
    XLabel: string,
    YLabel: string,
    Pairs: {
        x: string,
        y: number,
        _id?: string
    }[]
}*/

type Pairs = {
    x: string,
    y: number,
    _id?: string
}

interface Props{
    graph: Graph
}



export default class BarChart extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        pairs: []
    }

    static getDerivedStateFromProps(props: Props, state: any) {
        return {pairs: props.graph.Pairs}
    }

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void  => {
        d3.select(".bar-chart")
            .selectAll('rect')
            .remove()
        d3.select('.bar-chart')
            .selectAll('g')
            .remove()
        console.log(this.state.pairs);
        this.drawChart(this.state.pairs);
    }

    drawChart(GraphData: Pairs[]) {

        const yValues: number[] = GraphData.map((d) => d.y);

        let svg = d3
            .select(".bar-chart")
            .attr("width", 600)
            .attr("height", 400);

        
        let x = d3.scaleBand()
            .range([50, 600])
            .domain(GraphData.map((d) => d.x))
            .padding(0.2);
        svg 
            .append('g')
            .attr("transform", `translate(0, 350)`)
            .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        let y = d3.scaleLinear()
            .domain([0, Math.max(...yValues) + 10])
            .range([ 350, 0]);
          svg.append("g")
            .attr("transform", "translate(50, 0)")
            .call(d3.axisLeft(y));


        svg
            .selectAll('rect')
            .data(GraphData)
            .enter()
            .append('rect')
            .attr("fill", "blue")
            .attr("width", x.bandwidth())
            .attr("height", (d) => 350 - y(d.y)) 
            .attr("x", (d) => x(d.x) as number)
            .attr("y", (d) => y(d.y))
    }

    render(): ReactNode {
        if (this.state.pairs.length === 0) {
            return <h1>Loading...</h1>
        }
        return <svg className="bar-chart"></svg>
    }
}