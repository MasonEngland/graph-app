import { Component, ReactNode, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { BarGraph } from '../Types/graphs-structure';
import { updateGraphComponent } from '../State/action-creators/profile-action-creators';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../State/reducers/rooter-reducer';

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

export default function BarChart({graph}: Props) {
    const [state, setState] = useState(graph.Pairs);
    const graphState = useSelector((state: State) => state.updateGraph);

    const getGraphData = (data : any) : Pairs[] => {
        let graphdata: any[] = []
        const editingComponent = graphState.editingComponent;
        if(!editingComponent?._id) return data

        for (let graph of data) {
            if(graph._id === editingComponent?._id) {
                graphdata.push(editingComponent)
            }
            else
                graphdata.push(graph)
        }

        return graphdata;
    }

    useEffect(() => {
        setState(getGraphData(state));
    }, [graphState.editingComponent]);

    useEffect(() => {
        setState(graph.Pairs);
    }, [graph])

    useEffect(() => {
        d3.select(".bar-chart")
            .selectAll('rect')
            .remove()
        d3.select('.bar-chart')
            .selectAll('g')
            .remove()
        drawChart(state);
    }, [state]);

    const drawChart = (GraphData: Pairs[]) => {
        const yValues: number[] = GraphData.map((d) => d.y);

        let svg = d3
            .select(".bar-chart")
            .attr("width", 600)
            .attr("height", 400);

        
        let x = d3.scaleBand()
            .range([50, 600])
            .domain(GraphData?.map((d) => d.x))
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
            .on('click', (d, i) => {
                console.log(i);
                updateGraphComponent(i);
            })
    }

    if (graph.Pairs?.length === 0 && graph.XLabel === null || graph.YLabel === null) {
        return <h1>Loading...</h1>
    }
    else if (graph.Type === "bargraph") {
        return <svg className="bar-chart" ></svg>
    }
    else return <></>
}