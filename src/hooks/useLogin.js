import { useState } from 'react';
import { baseUrl } from '../utils/baseUrl';
import { toastit } from '../utils/toastIt';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	const { dispatch } = useAuthContext();
	const [ error, setError ] = useState(null);
	const [ isLoading, setIsloading ] = useState(false);
	const [ user, setUser ] = useState({});

	const login = async (email, password) => {
		setIsloading(true);
		setError(false);

		const res = await fetch(`${baseUrl}/user/login`, {
			headers : { 'Content-Type': 'application/json' },
			body    : JSON.stringify({ email, password }),
			method  : 'POST'
		});

		const data = await res.json();

		if (res.ok) {
			setIsloading(false);
			setError(null);
			setUser(data);

			localStorage.setItem('user', JSON.stringify(data));

			dispatch({ type: 'SIGNIN', payload: data });
			toastit('Sigin successful', 'success')
		}

		if (!res.ok) {
			setIsloading(false);
			setError(data.message);
			toastit(data.message, 'error')
		}
	};

	return { login, isLoading, error, user, setError };
};
