import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { error, isLoading, login, user, setError } = useLogin();

	const handleSubmit = async (e) => {
		
		e.preventDefault();

		setError(null);

		await login(email, password);
		if (user.email) {
			setEmail('');
			setPassword('');
			
		}
	};

	return (
		<div className=" w-full height flex space-y-5 items-center justify-center p-8 flex-col">
			<form
				onSubmit={handleSubmit}
				className=" flex flex-col items-center justify-center w-full max-w-[400px] shadow-lg px-6 py-12 rounded-md space-y-5"
			>
				<h1 className=" text-center text-purple-600 text-xl font-bold md:text-3xl">
					Login
				</h1>
				{error && (
					<p className=" w-full h-[45px] bg-red-600/10 rounded-lg border-2 border-red-600 flex items-center text-center justify-center">
						{error}
					</p>
				)}
				<input
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className=" border-[1px] focus:border-2 border-black focus:border-purple-700 focus:outline-none w-full rounded-md p-2 px-4"
					type="email"
					placeholder="Email"
				/>
				<input
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className=" border-[1px] focus:border-2 border-black focus:border-purple-700 focus:outline-none w-full rounded-md p-2 px-4"
					type="password"
					placeholder="Password"
				/>
				{!isLoading && (
					<button
						type="submit"
						className=" w-full h-[45px] bg-purple-600 text-white rounded-lg"
					>
						Login
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
			</form>
			<p className=' text-lg'>Don't have an account ? <span className=' text-xl font-bold text-purple-600'><Link to={'/register'}>Signup</Link></span></p>
		</div>
	);
}
