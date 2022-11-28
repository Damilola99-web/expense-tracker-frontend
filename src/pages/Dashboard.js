import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Label from '../components/Label';
import ExpenseForm from '../components/ExpenseForm';
import { useDataContext } from '../hooks/useDataContext';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingMini from '../components/LoadingMini';
import { useAuthContext } from '../hooks/useAuthContext';
import ExpenseList from '../components/ExpenseList';
import { useFetch } from '../hooks/useFetch';
// import fetchData from '../hooks/useFetchData';

Chart.register(ArcElement);

export default function Dashboard() {
	const { data, dispatch, labelData, donoughtData, total } = useDataContext();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const { user } = useAuthContext();
	const { fetchData } = useFetch();

	const getData = () => {
		fetchData(dispatch, setIsLoading, setError);
	};

	useEffect(() => {
		getData();
	}, []);

	if (error) {
		return (
			<p className=" w-full h-[45px] bg-red-600/10 rounded-lg border-2 border-red-600 dark:text-white flex items-center text-center justify-center">
				{error}
			</p>
		);
	}
	if (isLoading) {
		return (
			<div className="h-full w-full height bg-white dark:text-white dark:bg-slate-800 p-8 rounded-lg shadow-lg flex space-x-6 items-center">
				<LoadingMini />
			</div>
		);
	}

	return (
		<div className="h-full w-full height bg-white dark:text-white dark:bg-slate-800 p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 ">
			<div className=" w-full h-full flex flex-col items-center space-y-8">
				<div className=" w-full max-w-[310px] justify-center flex relative items-center">
					{donoughtData && <Doughnut {...donoughtData} />}
					<h1 className=" absolute top-[50%] translate-y-[-50%] text-lg flex flex-col self-center items-center justify-center text-center">
						Total{' '}
						<span className=" text-gr block text-center text-green-500 font-bold text-lg">
							${total}
						</span>
					</h1>
				</div>
				{labelData && <Label labelData={labelData} />}
			</div>
			<div className=" flex flex-col space-y-4">
				<ExpenseForm fetchData={getData} />
				{data && <ExpenseList data={data} fetchData={getData} />}
			</div>
		</div>
	);
}
