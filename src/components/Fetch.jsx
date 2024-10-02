import { useEffect, useState } from "react";

const Fetch = ({ event }) => {
	return (
		<div className="text-white">
			{event.map((item) => (
				<div key={item.id}>
					<h1>{item.title}</h1>
					<p>{item.body}</p>
				</div>
			))}
		</div>
	);
};

export default Fetch;
