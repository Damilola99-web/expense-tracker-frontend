import { createContext, useReducer } from 'react';

export const ThemeContext = createContext({
	theme       : 'light',
	changeTheme : null
});

const themeReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			return { ...state, theme: action.payload };
		default:
			return state;
	}
};

export const ThemeContextProvider = ({ children }) => {
	const element = document.documentElement;
	const [ state, dispatch ] = useReducer(themeReducer, {
		theme       : 'light',
		changeTheme : null
	});

	const changeTheme = (theme) => {
		dispatch({ type: 'CHANGE_THEME', payload: theme });
		localStorage.setItem('theme', theme);

		if (theme === 'dark') {
			element.classList.add('dark');
		} else if (theme === 'light') {
			element.classList.remove('dark');
		}
	};

	return (
		<ThemeContext.Provider value={{ ...state, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
