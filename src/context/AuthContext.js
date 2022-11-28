import { createContext, useReducer } from 'react';

export const AuthContext = createContext({
	user        : null,
	dispatch    : null,
	authIsReady : false
});

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGOUT':
			return { ...state, user: null, authIsReady: true };
		case 'SIGNIN':
			return { ...state, user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(authReducer, {
		user        : null,
		dispatch    : null,
		authIsReady : false
	});
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
