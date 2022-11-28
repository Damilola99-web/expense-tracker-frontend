import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { baseUrl } from '../utils/baseUrl';
import { toastit } from '../utils/toastIt';
import { v4 } from 'uuid';
import Select from 'react-select';
// import { useDataContext } from '../hooks/useDataContext';

export default function ExpenseForm({fetchData}) {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ name, setName ] = useState('');
	const [ amount, setAmount ] = useState('');
	const [ isCategoryLoading, setIsCategoryLoading ] = useState(false);
	const [ category_id, setactegory_id ] = useState('');
	const [ options, setOptions ] = useState([]);
	// const { data, dispatch } = useDataContext();

	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const res = await fetch(`${baseUrl}/expenses/add`, {
			headers : {
				authorization  : user.token,
				'Content-Type' : 'application/json'
			},
			body    : JSON.stringify({
				name,
				amount      : Number(amount),
				category_id,
				id          : v4()
			}),
			method  : 'POST'
		});

		const data = await res.json();

		if (res.ok) {
			setIsLoading(false);
			setName('');
			setAmount('');
			fetchData()
			toastit('Expense added sucessfully', 'success');
		}

		if (!res.ok) {
			setIsLoading(false);
			toastit(data.message, 'error');
		}
	};

	const fetchCategories = async () => {
		setOptions([]);
		setIsCategoryLoading(true);
		const res = await fetch(`${baseUrl}/categories`, {
			headers : { authorization: user.token }
		});

		const data = await res.json();

		if (res.ok) {
			setIsCategoryLoading(false);
			const opt = data.map((category) => {
				return { label: category.name, value: category.id };
			});
			setOptions(opt);
		}

		if (!res.ok) {
			setIsCategoryLoading(false);
			toastit(data.message, 'error');
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className=" flex flex-col items-center w-full md:p-4 space-y-4">
			<h1 className="font-bold pb-4 text-xl">Add Transaction</h1>
			<form className=" w-full max-w-[360px]" onSubmit={handleSubmit}>
				<div className=" w-full flex flex-col space-y-4">
					<input
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Name eg. Rent, Electricty ..."
						className=" w-full py-2 px-6 focus:outline-none border-2 border-transparent focus:border-purple-700 rounded-md text-slate-900 shadow-md"
					/>
					{isCategoryLoading && <Select isLoading />}
					{!isCategoryLoading && (
						<Select
							className=' shadow-lg text-black'
							options={options}
							placeholder={'Select Category'}
							onChange={(value) => setactegory_id(value.value)}
						/>
					)}
					<input
						required
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Amount in $"
						type="number"
						className="py-2 px-6 focus:outline-none border-2 border-transparent focus:border-purple-700 rounded-md text-slate-900 shadow-lg"
					/>
					{!isLoading && (
						<button
							type="submit"
							className=" w-full h-[45px] bg-purple-600 text-white rounded-lg"
						>
							Add Expense
						</button>
					)}
					{isLoading && (
						<div
							disabled
							className=" w-full h-[45px] bg-gray-600 text-white rounded-lg flex items-center justify-center"
						>
							<div className=" w-6 h-6 rounded-full border-l-purple-600 border-white border-4 rotatee" />
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
