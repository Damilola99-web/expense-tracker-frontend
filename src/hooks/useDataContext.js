import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export const useDataContext = () => {
	const dataContext = useContext(DataContext);

	return dataContext;
};
