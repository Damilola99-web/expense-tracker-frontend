import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
// import { } from 'react-toastify'

export default function Signup() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ passwordCheck, setPasswordCheck ] = useState('');
	const [ formError, setFormError ] = useState(null);
	const { error, isLoading, signup, user, setError } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setFormError(null);
		setError(null);

		if (username.length < 4) {
			return setFormError('Username must be at least 4 characters');
    }
    
    if (password !== passwordCheck) {
      return setFormError('Passwords must match')
    }

		await signup(email, password, username);
		if (user.email) {
			setEmail('');
			setPassword('');
			setFormError(null);
			setUsername('');
		}
	};

	return (
		<div className=" w-full height flex flex-col space-y-5 items-center justify-center p-8">
			<form
				onSubmit={handleSubmit}
				className=" flex flex-col items-center justify-center w-full max-w-[400px] shadow-lg px-6 py-12 rounded-md space-y-5"
			>
				<h1 className=" text-center text-purple-600 text-xl font-bold md:text-3xl">
					Signup
				</h1>
				{error && (
					<p className=" w-full h-[45px] bg-red-600/10 rounded-lg border-2 border-red-600 flex items-center text-center justify-center">
						{error}
					</p>
				)}
				{formError && (
					<p className=" w-full h-[45px] bg-red-600/10 rounded-lg border-2 border-red-600 flex items-center text-center justify-center">
						{formError}
					</p>
				)}
				<input
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className=" border-[1px] focus:border-2 border-black focus:border-purple-700 focus:outline-none w-full rounded-md p-2 px-4"
					type="text"
					placeholder="Username"
				/>
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
				<input
					required
					value={passwordCheck}
					onChange={(e) => setPasswordCheck(e.target.value)}
					className=" border-[1px] focus:border-2 border-black focus:border-purple-700 focus:outline-none w-full rounded-md p-2 px-4"
					type="password"
					placeholder="Confirm Password"
				/>
				{!isLoading && (
					<button
						type="submit"
						className=" w-full h-[45px] bg-purple-600 text-white rounded-lg"
					>
						Signup
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
			<p className=' text-lg'>Already have an account ? <span className=' text-xl font-bold text-purple-600'><Link to={'/login'}>Login</Link></span></p>
		</div>
	);
}
