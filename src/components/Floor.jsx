import React, { useState } from 'react'
import { ReactComponent as FloorSVG } from '../floor.svg';
import { useD3 } from './useD3'
import * as d3 from 'd3'

const Floor = () => {

    const [selectedRoom, setSelectedRoom] = useState({
        element: null, style: ""
    })

    const handleOnClick = (e) => {

        if (selectedRoom.element !== null && selectedRoom.element !== e.target) {
            e.preventDefault()
        } else {
            if (selectedRoom.element !== null) {
                d3.select(e.target).attr('style', selectedRoom.style)
                d3.select(e.target.parentElement).selectAll('circle.cirle-highlighted').remove()
                setSelectedRoom({
                    element: null, style: ""
                })
            } else {
                setSelectedRoom({
                    element: e.target,
                    style: e.target.getAttribute('style')
                })
                d3.select(e.target).style('fill', 'red').style('fill-opacity', "0.5")

                const { x, y, height, width } = d3.select(e.target.parentElement).node().getBBox();
                console.log(d3.select(e.target.parentElement).node().getBBox())
                // const radius = ((width / 12) * 75) / 100
                const radius = 350


                d3.select(e.target.parentElement).append("circle")
                    .style("stroke", "black")
                    .style("fill", "green")
                    .style("fill-opacity", "1")
                    .attr('class', 'cirle-highlighted')
                    .attr("r", radius)
                    .attr("transform", `translate(${(x + (width / 2))},${y + (height / 2)})`)
                    .raise()

                d3.select(e.target.parentElement).append("circle")
                    .style("stroke", "black")
                    .style("fill", "white")
                    .style("fill-opacity", "1")
                    .attr('class', 'cirle-highlighted')
                    .attr("r", radius / 2)
                    .attr("transform", `translate(${(x + (width / 2))},${y + (height / 2)})`)
                    .raise()
            }
        }

    }

    const ref = useD3((svg) => {
        svg.selectAll('polygon').on('click', handleOnClick)
    }, [selectedRoom])

    console.log(ref)

    return (
        <div>
            <FloorSVG ref={ref} />
        </div>
    )
}

export default Floor