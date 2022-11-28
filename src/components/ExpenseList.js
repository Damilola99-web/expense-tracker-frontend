import { MdDelete } from 'react-icons/md';
import { useFetch } from '../hooks/useFetch';

export default function ExpenseList({ data, fetchData }) {
	const { deleteTransaction } = useFetch();

	const deleteTransc = async (id) => {
		await deleteTransaction(id);
		fetchData();
	};

	return (
		<div className=" w-full flex flex-col md:p-4 items-center space-y-6">
			<h1 className=" text-xl font-bold">Recent Transactions</h1>
			<div className=" flex flex-col space-y-3 max-w-[360px] w-full items-center">
				{data.map((expense) => (
					<div
						key={expense.name}
						className=" shadow-lg py-2 px-4 rounded-md bg-gray-50 w-full flex justify-center"
						style={{ borderRight: `solid 5px ${expense.color} ` }}
					>
						<div title='Delete Expense'
							onClick={() => deleteTransc(expense.id)}
							className=" px-3 cursor-pointer"
						>
							<MdDelete size={24} color={'red'} />
						</div>
						<h1 className=" w-full text-lg capitalize text-slate-900 text-center">
							{expense.name}
						</h1>
					</div>
				))}
			</div>
		</div>
	);
}
