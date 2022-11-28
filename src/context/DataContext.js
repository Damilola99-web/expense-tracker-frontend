import { createContext, useReducer } from 'react';

export const DataContext = createContext({
	data         : null,
	dispatch     : null,
	donoughtData : null,
	labelData    : null,
	total        : null
});

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'GET_EXPENSE':
			return { ...state, data: action.payload };
		case 'GET_LABEL':
			return { ...state, labelData: action.payload };
		case 'GET_DONOUGHT':
			return { ...state, donoughtData: action.payload };
		case 'GET_TOTAL':
			return { ...state, total: action.payload };
		default:
			return state;
	}
};

export const DataContextProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(dataReducer, {
		data         : null,
		dispatch     : null,
		donoughtData : null,
		labelData    : null,
		total        : null
	});
	return (
		<DataContext.Provider value={{ ...state, dispatch }}>
			{children}
		</DataContext.Provider>
	);
};
