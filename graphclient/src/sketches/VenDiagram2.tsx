import { useEffect } from 'react';
import { dummyData2 } from './dummydata';
import * as d3 from 'd3';

interface VenDiagramParams {
    height: number,
    width: number,
    onClickDiagram: ( d : any) => void
}

// NEED TO SET AN ONCLICK FOR THIS AND NEED TO FIGURE HOW TO SET TEXT IN CIRCLES

type venDiagramData = {
    id: number
}

export default function VenDiagram ( { height, width, onClickDiagram } : VenDiagramParams) {
    
    // Make sure the Diagram is loaded in once
    if(d3.select('.ven-diagram').selectChildren().size() < 1) {
        let svg = d3.select('.ven-diagram').append('svg')
        svg.selectAll("circle")
        .data(dummyData2)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r",  function(d, i){ return 150 / dummyData2.length})
        .attr("fill", "#ffffff")
        .style("stroke", "red")
        .on('click', function(d, i : any){ 
            d3.selectAll('circle').attr('stroke-width', 1)
            d3.select(this).attr('stroke-width', 5)            

            onClickDiagram(i)
        })
    }

    return (
        <> 
            <svg className="ven-diagram" viewBox={`0, 0, ${height}, ${width}`}></svg>
        </>
    )
}