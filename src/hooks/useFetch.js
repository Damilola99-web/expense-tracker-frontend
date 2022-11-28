import { baseUrl } from '../utils/baseUrl';
import { getChart, getLabels, getSum, getTotal } from '../utils/LabelData';
import { toastit } from '../utils/toastIt';
import { useAuthContext } from './useAuthContext';

export const useFetch = () => {
	const { user } = useAuthContext();
	const fetchData = async (dispatch, setIsLoading, setError) => {
		setIsLoading(true);
		const res = await fetch(`${baseUrl}/expenses`, {
			headers : { authorization: user.token }
		});

		const data = await res.json();

		data.sort(
			(expenseA, expenseB) =>
				Number(expenseB.last_modified) - Number(expenseA.last_modified)
		);

		if (res.ok) {
			dispatch({ type: 'GET_EXPENSE', payload: data });

			const label = getLabels(data);
			dispatch({ type: 'GET_LABEL', payload: label });

			const donoughtData = getChart(data);
			dispatch({ type: 'GET_DONOUGHT', payload: donoughtData });

			const total = getTotal(data);
			dispatch({ type: 'GET_TOTAL', payload: total });

			setIsLoading(false);
			setError(null);
		}

		if (!res.ok) {
			setIsLoading(false);
			setError(data.message);
			toastit(data.message, 'error');
		}
	};

	const deleteTransaction = async (id) => {
		const res = await fetch(`${baseUrl}/expenses/${id}`, {
			headers : {
				authorization : user.token
			},
			method  : 'DELETE'
		});

		const data = await res.json();

		if (res.ok) {
			toastit(data.message, 'success');
		}

		if (!res.ok) {
			toastit(data.message, 'error');
		}
	};

	return { fetchData, deleteTransaction };
};
