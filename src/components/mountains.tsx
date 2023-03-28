import { off } from "process";
import * as React from "react"
import { pathObject, svgObject, wigglePath, objectToPath } from "../src/svgHelpers";

export const Mountains = () => {


	const width = 1000
	const height = 350
	const padding = 50
	const xGridDim = 18
	const yGridDim = 4
	const randAmount = 20
	const smallRandAmount = 4
	const widthO = width - (2 * padding)
	const heightO = height - (2 * padding)
	const xGrid = [...new Array(xGridDim + 1)].map((_, i) => (i * (widthO / xGridDim)) + padding) //creating a grid for width for easy computing chunks of mountain
	const yGrid = [...new Array(yGridDim + 1)].map((_, i) => (i * (heightO / yGridDim)) + padding)

	//Uses grids 0 - 8
	function tallMountain(index: number): svgObject {
		const mountain = [
			{
				command: "M",
				coordinates: [xGrid[0 + index], yGrid[yGridDim]]
			},
			{
				command: "S",
				coordinates: [xGrid[1 + index], yGrid[2], xGrid[2 + index], yGrid[2]]
			},
			{
				command: "S",
				coordinates: [xGrid[3 + index], yGrid[0], xGrid[4 + index], yGrid[0]]
			},
			{
				command: "S",
				coordinates: [xGrid[5 + index], yGrid[0], xGrid[6 + index], yGrid[2]]
			},
			{
				command: "S",
				coordinates: [xGrid[6 + index], yGrid[2], xGrid[8 + index], yGrid[yGridDim]]
			},
		]
		wigglePath(mountain, randAmount)
		return mountain
	}

	function smallMountain(index: number): svgObject {
		const mountain = [
			{
				command: "M",
				coordinates: [xGrid[0 + index], yGrid[1]]
			},
			{
				command: "S",
				coordinates: [xGrid[1 + index], yGrid[0], xGrid[2 + index], yGrid[0]]
			},
			{
				command: "S",
				coordinates: [xGrid[1 + index], yGrid[0], xGrid[3 + index], yGrid[0]]
			},
			{
				command: "S",
				coordinates: [xGrid[4 + index], yGrid[0], xGrid[5 + index], yGrid[1]]
			},
		]
		wigglePath(mountain, smallRandAmount)
		return mountain
	}

	return (
		<div className="mt-60">
			<svg className="absolute linecap-round stroke-white fill-none stroke-[10px]" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				viewBox={"0 0 " + width + " " + height}>

				{/* Randomly generated back mountains */}
				<g className="stroke-slate-500" >

					<path d={objectToPath(tallMountain(0))} />
					<path d={objectToPath(smallMountain(6))} />
					<path d={objectToPath(tallMountain(9))} />
				</g>
			</svg>



			<svg className="relative z-50 linecap-round stroke-white fill-none stroke-[10px]" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				viewBox={"0 0 " + width + " " + height}>

				{/* Background cover */}
				<g className="fill-night linecap-round stroke-night stroke-[10px]" transform="translate(0, 110)">
					<path d="M40.5,223.6
						c79-111.6,129.7-172.3,152-182.3c33.5-15,27,30.8,53,30.8c23.8,0,42.1,20.2,58.5,50.3l13.7-15.2C383.5,35.8,422,11.9,433.3,35.8
						c17,35.7,32.9-26.3,51.2,2.5s57.7,50.6,79.4,80.2l12.9,14.8c83.7-80.3,137.5-111,161-92.1c27.9,22.5,46.3,34,55.1,34.5
						c29.6,6,49,25.4,58.1,58.2s33.3,63.7,72.4,92.7"/>
				</g>

				<g className="fill-night stroke-none">
					<rect x={xGrid[0]}  y={height - 20} width={width - (padding * 3)} height={padding} />
				</g>

				{/* Front mountains */}
				<g className="fill-night" transform="translate(0, 110)">
					<path d="M40.5,223.6c79-111.6,129.7-172.3,152-182.3c33.5-15,27,30.8,53,30.8s45.4,24.1,63,58.9
								c11.7,23.2,41.9,54.1,90.6,92.7"/>
					<path d="M527.1,183.1C639.6,66,709.9,18.7,737.8,41.2c27.9,22.5,46.3,34,55.1,34.5
								c29.6,6,49,25.4,58.1,58.2c9.1,32.8,33.3,63.7,72.4,92.7"/>
					<path d="M317.7,107.2C383.5,35.8,422,11.9,433.3,35.8c17,35.7,32.9-26.3,51.2,2.5s57.7,50.6,79.4,80.2" />
				</g>

			</svg>
		</div>
	)
};