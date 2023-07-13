import { Component, ReactNode, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from "react-redux";
import { State } from "../State/reducers/rooter-reducer";


const DUMMY_DATA = [{
    x: "2014",
    y: 88
}, {
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
}, {
    x: "2019",
    y: 142
}, {
    x: "2020",
    y: 213,
}, {
    x: "2021",
    y: 94
}, {
    x: "2022",
    y: 66
}, {
    x: "2023",
    y: 120
}]

type Pairs = {
    x: string,
    y: number,
    _id?: string
}

type Props = {
    pairs: Pairs[]
}


const yValues: number[] = DUMMY_DATA.map((d) => d.y);


export default class BarChart extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        pairs: DUMMY_DATA
    }

    static getDerivedStateFromProps(props: any, state: any) {
        return {pairs: props.pairs}
    }

    componentDidMount(): void {
        this.drawChart(DUMMY_DATA);
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
        return <svg className="bar-chart"></svg>
    }
}