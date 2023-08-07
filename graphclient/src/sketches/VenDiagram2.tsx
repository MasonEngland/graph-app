import { dummyData2 } from './dummydata';
import * as d3 from 'd3';
import { updateGraphComponent } from '../State/action-creators/profile-action-creators';
import { useSelector } from 'react-redux';
import { State } from '../State/reducers/rooter-reducer';
import { useEffect, useState } from 'react';

interface VenDiagramParams {
    height: number,
    width: number,
}

// NEED TO SET AN ONCLICK FOR THIS AND NEED TO FIGURE HOW TO SET TEXT IN CIRCLES

type venDiagramData = {
    x: number,
    y: number,
    id: number,
    graphType: string
}

type venDiagrams = venDiagramData[]

export default function VenDiagram ( { height, width } : VenDiagramParams) {
    
    const graphstate : any = useSelector((state: State) => state.updateGraph);
    const [graphData, setGraphData] = useState<venDiagramData[]>(dummyData2)

    const getGraphData = (data : any) : venDiagrams => {
        let graphdata: any[] = []
        const editingComponent = graphstate.editingComponent 
        if(!editingComponent) return data
        data.forEach( (graph : any) =>{
            if(graph.id === editingComponent.id) {
                graphdata.push(editingComponent)
            }
            else
                graphdata.push(graph)
        })

        return graphdata
    }

    useEffect( ()=> {
        setGraphData(getGraphData(dummyData2))
    }, [graphstate.editingComponent])

    // Make sure the Diagram is loaded in once
    let svg = d3.select('.ven-diagram')
        svg.selectAll("circle")
        .data(graphData)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r",  function(d, i){ return 150 / dummyData2.length})
        .attr("fill", "#ffffff")
        .style("stroke", "red")
        .on('click', function(d, i : any){ 
            d3.selectAll('circle').attr('stroke-width', 1)
            d3.select(this).attr('stroke-width', 5)            
            updateGraphComponent(i)
    })

    return (
        <> 
            <svg className="ven-diagram" viewBox={`0, 0, ${height}, ${width}`}></svg>
        </>
    )
}