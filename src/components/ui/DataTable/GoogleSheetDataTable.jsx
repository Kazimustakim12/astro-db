import React, { useState, useEffect } from 'react'
import DataTable from './DataTable'

function GoogleSheetDataTable({ sheetName }) {
	const [dataTable, setdataTable] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [headerData, setHeaderData] = useState([])
	const getSheetData = ({ sheetID, sheetName, query, callback }) => {
		const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
		const url = `${base}&sheet=${encodeURIComponent(sheetName)}&tq=${encodeURIComponent(query)}`

		fetch(url)
			.then((res) => res.text())
			.then((response) => {
				callback(responseToObjects(response))
			})

		function responseToObjects(res) {
			// credit to Laurence Svekis https://www.udemy.com/course/sheet-data-ajax/
			const jsData = JSON.parse(res.substring(47).slice(0, -2))
			let data = []
			const columns = jsData.table.cols
			const rows = jsData.table.rows
			let rowObject
			let cellData
			let propName
			for (let r = 0, rowMax = rows.length; r < rowMax; r++) {
				rowObject = {}
				for (let c = 0, colMax = columns.length; c < colMax; c++) {
					cellData = rows[r]['c'][c]
					propName = columns[c].label
					if (cellData === null) {
						rowObject[propName] = ''
					} else if (typeof cellData['v'] == 'string' && cellData['v'].startsWith('Date')) {
						rowObject[propName] = new Date(cellData['f'])
					} else {
						rowObject[propName] = cellData['v']
					}
				}
				data.push(rowObject)
			}
			return data
		}
	}

	const sheetDataHandler = (sheetData) => {
		if (sheetData.length > 0) {
			setdataTable(sheetData)
			setHeaderData(
				sheetData[0] &&
					Object.keys(sheetData[0])
						?.map((key) => {
							return {
								column: key,
								label: key
							}
						})
						.slice(0, -1)
			)
			setIsLoading(false)
		}
		//ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
	}
	useEffect(() => {
		getMyTable()
	}, [])
	const getMyTable = async () => {
		try {
			setIsLoading(true)
			await getSheetData({
				// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
				sheetID: '1mxWzaU6D2HAlrLizDWodx-wi5_R8EFcPr240_bSLIeI',
				// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
				sheetName: sheetName,
				query: 'SELECT * ',
				callback: sheetDataHandler
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	return isLoading ? (
		<div className="">
			<div className="flex animate-pulse">
				<div className="ms-4 mt-2 w-full">
					<p className="h-4 rounded-full bg-gray-200 dark:bg-neutral-700"></p>

					<ul className="mt-5 space-y-3">
						<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
						<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
						<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
						<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
					</ul>
				</div>
			</div>
		</div>
	) : (
		<>
			{!isLoading && dataTable.length > 0 ? (
				<DataTable
					headers={headerData}
					data={dataTable}
					isLoading={isLoading}
					loadingTag={<h1>Loading...</h1>}
				/>
			) : (
				<p>No Data is Avaliable </p>
			)}
		</>
	)
}

export default GoogleSheetDataTable
