import { Component, ReactNode } from 'react';
import * as d3 from 'd3';
import { BarGraph } from '../Types/graphs-structure';
import { updateGraphComponent } from '../State/action-creators/profile-action-creators';
import React from 'react';

/**
 * @ brief - this file draws a bargraph based on recieved graph data
 * @ brief - call with <BarChart graph = {insert graph data}/>
 */



type Pairs = {
    x: string,
    y: number,
    _id?: string
}

interface Props{
    graph: BarGraph,
}

export default class BarChart extends Component<Props> {

    state = {
        pairs: [],
        xlabel: null,
        ylabel: null,
        type: null,
    }

    static getDerivedStateFromProps(props: Props, state: any) {
        return {
            pairs: props.graph.Pairs, 
            xlabel: props.graph.XLabel, 
            ylabel: props.graph.YLabel,
            type: props.graph.Type
        }
    }

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void  => {
        d3.select(".bar-chart")
            .selectAll('rect')
            .remove()
        d3.select('.bar-chart')
            .selectAll('g')
            .remove()
        this.drawChart(this.state.pairs);
        console.log(this.state.pairs);
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
            .call(d3.axisLeft(y))


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
            .on('click', (d, i) => { //we can use arrow functions since we don't use the 'this' keyword
                console.log(i)
                updateGraphComponent(i)
            })
    }

    render(): ReactNode {
        if (this.state.pairs.length === 0 && this.state.xlabel === null || this.state.ylabel === null) {
            return <h1>Loading...</h1>
        }
        else if (this.state.type === "bargraph") {
            return <svg className="bar-chart" ></svg>
        }
        else return <></>
    }
}