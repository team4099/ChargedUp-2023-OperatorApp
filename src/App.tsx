import {GridCell} from "./components/GridCell"
import {Navbar} from "./components/Navbar"
import { NetworkTables } from 'ntcore-ts-client';
import { NetworkTableTypeInfos } from 'ntcore-ts-client'

function App() {

	const grids: any[][] = [
		[["1.1.1", true], ["1.1.2", false], ["1.2.3", true], ["1.2.1", true], ["1.2.2", false], ["1.2.3", true], ["1.3.1", true], ["1.3.2", false], ["1.3.3", true]],
		[["2.1.1", true], ["2.1.2", false], ["2.2.3", true], ["2.2.1", true], ["2.2.2", false], ["2.2.3", true], ["2.3.1", true], ["123.2", false], ["2.3.3", true]],
		[["3.1.1", true], ["3.1.2", false], ["3.2.3", true], ["3.2.1", true], ["3.2.2", false], ["3.2.3", true], ["3.3.1", true], ["133.2", false], ["3.3.3", true]]
	]

	const ntcore = NetworkTables.createInstanceByTeam(4099);

// Create the autoMode topic w/ a default return value of 'No Auto'
	const grid_topic = ntcore.createTopic<string>('/OperatorApp/gridNode', NetworkTableTypeInfos.kString, 'none');

	// Set a new value, this will error if we aren't the publisher!
	grid_topic.setValue('25 Ball Auto and Climb');

	grid_topic.subscribe((value) => {
		console.log(`Grid: ${value}`);
	}, true);

	return (
		<div className="App px-auto">
			<Navbar/>
			<div className="px-2 sm:px-4 py-2.5 rounded-lg overflow-hidden">
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
														<GridCell message={node[0]} isCone={node[1]} topic={grid_topic}/>
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
		</div>
	);
}

export default App;
