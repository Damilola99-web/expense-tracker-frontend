import { useState } from 'react';
import { baseUrl } from '../utils/baseUrl';
import { useAuthContext } from './useAuthContext';
import { v4 } from 'uuid';
import { toastit } from '../utils/toastIt';

export const useSignup = () => {
	const { dispatch } = useAuthContext();
	const [ error, setError ] = useState(null);
	const [ isLoading, setIsloading ] = useState(false);
	const [ user, setUser ] = useState({});

	const signup = async (email, password, username) => {
		setIsloading(true);
		setError(false);
		const id = v4();

		const res = await fetch(`${baseUrl}/user/register`, {
			headers : { 'Content-Type': 'application/json' },
			body    : JSON.stringify({ email, password, username, id }),
			method  : 'POST'
		});

		const data = await res.json();

		if (res.ok) {
			setIsloading(false);
			setError(null);
			setUser(data);

			localStorage.setItem('user', JSON.stringify(data));

			dispatch({ type: 'SIGNIN', payload: data });
			toastit('Sign up successful', 'success')
		}

		if (!res.ok) {
			setIsloading(false);
			setError(data.message);
			toastit(data.message, 'error')
		}
	};

	return { signup, isLoading, error, user, setError };
};
