import React, { useState, useEffect } from 'react'
import DataTable from './DataTable'

function GoogleSheetDataTable({ sheetName, language }) {
	const [dataTable, setdataTable] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [headerData, setHeaderData] = useState([])
	function csvSplit(row) {
		return row.split(',').map((val) => val.trim().substring(1, val.length - 1))
	}
	function csvToObjects(csv) {
		const csvRows = csv.split('\n')
		const propertyNames = csvSplit(csvRows[0])
		let objects = []

		for (let i = 1, max = csvRows.length; i < max; i++) {
			let row = csvSplit(csvRows[i])

			// Remove blank strings in each row
			row = row.filter((cell) => cell.trim() !== '')

			if (row.length === 0) continue // Skip empty rows

			let thisObject = {}
			for (let j = 0; j < propertyNames.length; j++) {
				if (row[j] && row[j].trim() !== '') {
					// Only add non-blank values
					thisObject[propertyNames[j]] = row[j]
				}
			}

			if (Object.keys(thisObject).length > 0) {
				objects.push(thisObject) // Add to objects only if there's meaningful data
			}
		}

		return { headers: propertyNames, data: objects }
	}
	const getSheetData = ({ sheetID, sheetName, query, callback }) => {
		const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`
		fetch(sheetURL)
			.then((res) => res.text())
			.then((response) => {
				callback(csvToObjects(response))
			})
	}
	function handleResponse(csvText) {
		const { headers, data } = csvText
		// Example of passing data to a DataTable component
		const headerData = headers
			.filter((header) => header.trim() !== '')
			.map((header) => ({
				column: header,
				label: header
			}))

		console.log(headerData, 'response')
		const dataTable = data.filter((row) => row && Object.values(row).some((val) => val !== '')) // Remove empty rows
		const isLoading = false
		if (dataTable.length > 0) {
			setdataTable(dataTable)
			setHeaderData(headerData)
			setIsLoading(false)
		}
	}

	// const sheetDataHandler = (sheetData) => {
	// 	console.log(sheetData,'sheetData')
	// 	if (sheetData.length > 0) {
	// 		setdataTable(sheetData)
	// 		setHeaderData(
	// 			sheetData[0] &&
	// 				Object.keys(sheetData[0])
	// 					?.map((key) => {
	// 						return {
	// 							column: key,
	// 							label: key
	// 						}
	// 					})
	// 					.slice(0, -1)
	// 		)
	// 		setIsLoading(false)
	// 	}
	// 	//ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
	// }
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
				callback: handleResponse
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
					language={language}
					loadingTag={<h1>Loading...</h1>}
				/>
			) : (
				<p>No Data is Avaliable </p>
			)}
		</>
	)
}

export default GoogleSheetDataTable
