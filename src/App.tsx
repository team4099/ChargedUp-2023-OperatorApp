import {GridCell} from "./components/GridCell"
import {Navbar} from "./components/Navbar"
import { NetworkTables } from 'ntcore-ts-client';
import { NetworkTableTypeInfos } from 'ntcore-ts-client'
import { useState, useEffect } from 'react'

function App() {

	const grids: String[][] = [
		["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
		["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
		["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"]
	]

	const [getNTCode, setNTCore] = useState(NetworkTables.createInstanceByURI("192.168.237.99", 5810))
	const [renderElem, setRenderElem] = useState(false)

	const setTopic = (message: String) => {
		grid_topic.setValue(message)
	}

	var grid_topic: any;

	setInterval(() => {
		setRenderElem(getNTCode.isRobotConnected())
		if (getNTCode.isRobotConnected()){
			grid_topic = getNTCode.createTopic<string>('/OperatorApp/gridNode', NetworkTableTypeInfos.kString, 'none');
			grid_topic.publish()
		}
	}, 500)

	return (
		<div className="App px-auto">
			<Navbar/>
			{ (renderElem) && <div className="px-2 sm:px-4 py-2.5 rounded-lg overflow-hidden">
				<div className="flex flex-col">
					<div className="-m-1.5 overflow-x-auto">
						<div className="p-1.5 min-w-full inline-block align-middle">
							<div className="border rounded-lg overflow-hidden">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid1.1</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid1.2</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid1.3</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid2.1</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid2.2</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid2.3</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid3.1</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid3.2</th>
											<th scope="col" className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Grid3.3</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{grids.map(grid => (
											<tr>
												{grid.map(node => (
													<td className="whitespace-nowrap text-sm font-medium text-gray-800">
														<GridCell message={node[0]} topic={setTopic}/>
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	);
}

export default App;
