import React from 'react';

export default function CategoryForm({
	setName,
	setColor,
	name,
	color,
    isFormLoading,
    action
}) {
	return (
		<div className='flex flex-col space-y-5 w-full'>
			<label className=" flex w-full flex-col space-y-3">
				<span className=" text-lg">Name : </span>
				<input
					required
					value={name}
					className=" px-6 text-slate-800 w-full h-[40px] border-2 border-transparent focus:outline-none rounded-md focus:border-purple-600"
					onChange={(e) => setName(e.target.value)}
					type="text"
				/>
			</label>
			<label className=" flex flex-col w-full">
				<span className=" text-lg" id="color">
					Color :{' '}
				</span>
				<div className="  w-full h-full gridc my-3">
					<div className=" w-full flex items-center justify-center rounded-md h-[40px] bg-slate-300 text-slate-900">
						Select a color
					</div>
					<input
						value={color}
						required
						className=" w-[40px] h-[40px] border-2 border-transparent focus:outline-none focus:border-purple-600"
						onChange={(e) => setColor(e.target.value)}
						type="color"
					/>
				</div>
			</label>
			{!isFormLoading && (
				<button
					type="submit"
					className=" w-full h-[45px] bg-purple-600 text-white rounded-lg"
				>
					{action} Category
				</button>
			)}
			{isFormLoading && (
				<div
					disabled
					className=" w-full h-[45px] bg-gray-600 text-white rounded-lg flex items-center justify-center"
				>
					<div className=" w-6 h-6 rounded-full border-l-purple-600 border-white border-4 rotatee" />
				</div>
			)}
		</div>
	);
}
