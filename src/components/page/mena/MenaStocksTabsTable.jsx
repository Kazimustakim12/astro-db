import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
const MenaStocksTabsTable = () => {
	const [activeTab, setActiveTab] = useState(tabs[0].id)
	return (
		<>
			<div className="flex space-x-1">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`${
							activeTab === tab.id ? '' : 'hover:text-white/60'
						} relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
						style={{
							WebkitTapHighlightColor: 'transparent'
						}}
					>
						{activeTab === tab.id && (
							<motion.span
								layoutId="bubble"
								className="absolute inset-0 z-10 bg-white mix-blend-difference"
								style={{ borderRadius: 9999 }}
								transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
							/>
						)}
						{tab.label}
					</button>
				))}
			</div>
			<div className="container">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{tabs.map((tab) => (
						<div
							key={tab.id}
							className={`border-b-2 border-gray-200 ${tab.id === activeTab ? 'border-dbgreen-500' : ''}`}
						>
							{tab.content}
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default MenaStocksTabsTable
