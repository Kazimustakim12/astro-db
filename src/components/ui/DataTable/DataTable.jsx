import React, { useState } from 'react'

const TableHeader = ({ headers, onSortColumnChange, sortColumn, sortDirection }) => {
	const handleHeaderClick = (column) => {
		onSortColumnChange(column)
	}

	return (
		<thead className="border-y border-gray-200 dark:border-neutral-700">
			<tr>
				{headers.map((header) => (
					<th
						scope="col"
						className="group py-1 text-start font-normal focus:outline-none"
						key={header.column}
						onClick={() => handleHeaderClick(header.column)}
					>
						<div className="inline-flex items-center rounded-md border border-transparent px-2.5 py-1 text-sm text-gray-500 hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
							{header.label}
							<svg
								className="-me-0.5 ms-1 size-3.5 text-gray-400 dark:text-neutral-500"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									className={` ${sortColumn === header.column && sortDirection === 'asc' ? 'text-dbgreen-600 dark:text-dbgreen-500' : ''} `}
									d="m7 15 5 5 5-5"
								></path>
								<path
									className={` ${sortColumn === header.column && sortDirection === 'asc' ? '' : 'text-dbgreen-600 dark:text-dbgreen-500'} `}
									d="m7 9 5-5 5 5"
								></path>
							</svg>
						</div>
						{/* {header.label}{' '} */}
						{/* {sortColumn === header.column && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>} */}
					</th>
				))}
			</tr>
		</thead>
	)
}

const TableBody = ({
	headers,
	data,
	currentPage,
	itemsPerPage,
	sortColumn,
	sortDirection,
	isLoading
}) => {
	const startIdx = (currentPage - 1) * itemsPerPage
	const endIdx = startIdx + itemsPerPage

	// Sort data based on the default sorting column and direction
	const sortedData = [...data].sort((a, b) => {
		const columnA = a[sortColumn]
		const columnB = b[sortColumn]

		if (columnA < columnB) {
			return sortDirection === 'asc' ? -1 : 1
		}
		if (columnA > columnB) {
			return sortDirection === 'asc' ? 1 : -1
		}
		return 0
	})

	// const paginatedData = data.slice(startIdx, endIdx);
	const paginatedData = sortedData.slice(startIdx, endIdx)

	return (
		<>
			<tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
				{!isLoading && paginatedData.length > 0 ? (
					paginatedData.map((item) => (
						<tr key={item.ActiveDirectoryId}>
							{headers.map((header) => (
								<td
									className="whitespace-nowrap p-3 text-sm font-medium text-gray-800 dark:text-neutral-200"
									key={header.column}
								>
									{item[header.column]}
								</td>
							))}
						</tr>
					))
				) : (
					<tr>
						<td colSpan="100%">
							<div className="flex flex-col items-center justify-center px-5 py-10 text-center">
								<svg
									className="size-6 shrink-0 text-gray-500 dark:text-neutral-500"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="11" cy="11" r="8" />
									<path d="m21 21-4.3-4.3" />
								</svg>
								<div className="mx-auto max-w-sm">
									<p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
										No search results
									</p>
								</div>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</>
	)
}

const Pagination = ({
	currentPage,
	totalNumberOfPages,
	handlePageChange,
	maxPageNumbers = 5 // Set the maximum number of page numbers to display
}) => {
	const pageNumbers = Array.from({ length: totalNumberOfPages }, (_, index) => index + 1)

	const renderPageNumbers = () => {
		if (totalNumberOfPages <= maxPageNumbers) {
			return pageNumbers
		}

		const middleIndex = Math.floor(maxPageNumbers / 2)

		if (currentPage <= middleIndex) {
			// Display pages from 1 to maxPageNumbers
			return [...pageNumbers.slice(0, maxPageNumbers - 1), '...', totalNumberOfPages]
		} else if (currentPage >= totalNumberOfPages - middleIndex) {
			// Display pages from totalNumberOfPages - maxPageNumbers + 2 to totalNumberOfPages
			return [1, '...', ...pageNumbers.slice(-maxPageNumbers + 1)]
		} else {
			// Display pages around the current page
			const startPage = currentPage - middleIndex + 1
			const endPage = currentPage + middleIndex - 1
			return [1, '...', ...pageNumbers.slice(startPage, endPage), '...', totalNumberOfPages]
		}
	}

	return (
		<div className="flex items-center justify-between border-t border-gray-200 p-4 dark:border-neutral-700">
			<div className="p-3 text-sm font-medium text-gray-800 dark:text-neutral-200">
				Showing 1 to {totalNumberOfPages} of {totalNumberOfPages} entries
			</div>
			<div className="px-4 py-1">
				<nav className="flex items-center -space-x-px">
					<button
						// className={'page-link ' + (currentPage === 1 ? 'disabled' : '')}
						className={`${currentPage === 1 ? 'disabled' : ''} inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 border border-gray-200 px-2.5 py-2 text-sm text-gray-800 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`}
						onClick={() => handlePageChange(currentPage - 1 )}
						disabled={currentPage === 1}
					>
						<svg
							className="size-3.5 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m15 18-6-6 6-6"></path>
						</svg>
						<span className="hidden sm:block">Previous</span>
					</button>
					<div className="flex items-center [&>.active]:bg-gray-100 dark:[&>.active]:bg-neutral-700">
						{renderPageNumbers().map((pageNumber, index) => (
							<button
								key={index}
								// className="active flex min-w-[40px] items-center justify-center rounded-full py-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
								className={`flex min-h-[38px] min-w-[38px] items-center justify-center border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 ${currentPage === pageNumber ? 'active' : ''}`}
								// onClick={() => handlePageChange(pageNumber)}
							>
								{pageNumber}
							</button>
						))}
					</div>
					<button
						className={
							'inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 border border-gray-200 px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 ' +
							(currentPage === totalNumberOfPages ? 'disabled' : '')
						}
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalNumberOfPages}
					>
						<span className="hidden sm:block">Next</span>
						<svg
							className="size-3.5 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m9 18 6-6-6-6"></path>
						</svg>
					</button>
				</nav>
			</div>
		</div>
	)
}

const DataTable = ({ headers, data, isLoading, loadingTag }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchValue, setSearchValue] = useState('') // Added state for search
	const [itemsPerPage, setItemsPerPage] = useState(10) // Added state for itemsPerPage
	const [sortColumn, setSortColumn] = useState(headers[0].column) // Default sorting column
	const [sortDirection, setSortDirection] = useState('asc') // Default sorting direction

	// Added filteredData variable to hold filtered data based on search
	const filteredData = data.filter((item) =>
		headers.some((header) =>
			String(item[header.column]).toLowerCase().includes(searchValue.toLowerCase())
		)
	)

	const totalNumberOfPages = Math.ceil(filteredData.length / itemsPerPage)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleSortColumnChange = (column) => {
		// Toggle sort direction if the same column is clicked again
		if (sortColumn === column) {
			setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'))
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value)
		setCurrentPage(1) // Reset to the first page when searching
	}

	return (
		<>
			<div className="mx-auto w-full max-w-[90%] rounded-xl border p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
				<div className="flex flex-col">
					<div>
						<div className="flex flex-wrap items-center justify-between py-3">
							<div className="relative max-w-xs">
								<label for="hs-table-input-search" className="sr-only">
									Search
								</label>
								<input
									className="flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 ps-9 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-dbgreen-900 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white"
									type="text"
									value={searchValue}
									id="searchInput"
									onChange={handleSearchChange}
									placeholder="Search all columns"
								/>
								<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
									<svg
										className="size-4 text-gray-400 dark:text-neutral-500"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="11" cy="11" r="8"></circle>
										<path d="m21 21-4.3-4.3"></path>
									</svg>
								</div>
							</div>

							<div className="relative flex max-w-xs items-center gap-3 p-3 text-sm font-medium text-gray-800 dark:text-neutral-200">
								<span className="input-group-text" htmlFor="inputGroupSelect01">
									Show
								</span>

								<div>
									<select
										className="rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-700"
										value={itemsPerPage}
										onChange={(e) => {
											setItemsPerPage(parseInt(e.target.value, 10))
											setCurrentPage(1)
										}}
									>
										<option value={5}>5</option>
										<option value={10}>10</option>
										<option value={25}>25</option>
										<option value={50}>50</option>
										<option value={100}>100</option>
									</select>
								</div>
								<span className="input-group-text" id="inputGroupSelect02">
									entries
								</span>
							</div>
						</div>

						<div className="min-h-[521px] overflow-x-auto">
							<div className="inline-block min-w-full align-middle">
								<div className="overflow-hidden">
									<table className="min-w-full">
										<TableHeader
											headers={headers}
											onSortColumnChange={handleSortColumnChange}
											sortColumn={sortColumn}
											sortDirection={sortDirection}
										/>
										<TableBody
											headers={headers}
											data={filteredData}
											currentPage={currentPage}
											itemsPerPage={itemsPerPage}
											sortColumn={sortColumn}
											sortDirection={sortDirection}
											isLoading={isLoading}
											loadingTag={loadingTag}
										/>
									</table>
								</div>
							</div>
						</div>
						{isLoading ? (
							<div style={{ textAlign: 'center', width: '200px', margin: '0 auto' }}>
								<p>{loadingTag}</p>
							</div>
						) : (
							''
						)}
						<Pagination
							currentPage={currentPage}
							totalNumberOfPages={totalNumberOfPages}
							handlePageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default DataTable
