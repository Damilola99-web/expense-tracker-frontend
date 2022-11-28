import React from 'react';

export default function Label({ labelData }) {
	return (
		<div className=" w-full max-w-[340px] flex flex-col space-y-4">
			{labelData.map((label) => LabelComponent(label))}
		</div>
	);
}

function LabelComponent({ category, color, percent }) {
	return (
		<div key={category} className=" flex justify-between">
			<div className=" gap-2 flex">
				<div
					className=" w-2 h-2 rounded py-3"
					style={{ backgroundColor: color }}
				/>
				<h3 className=" text-md">{category}</h3>
			</div>
			<h3 className=" font-bold">{percent}%</h3>
		</div>
	);
}
