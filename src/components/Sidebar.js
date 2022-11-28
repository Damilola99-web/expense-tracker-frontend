import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { toastit } from '../utils/toastIt';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { MdSettings, MdPerson, MdClose } from 'react-icons/md';
import ThemeTray from './ThemeTray';
// import {} from 'react-router-dom'

export default function Sidebar({ setNavOpen }) {
	const { pathname } = useLocation();
	const { user, dispatch } = useAuthContext();
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('user');
		toastit('Logout successful', 'info');
		setNavOpen(false);
	};
	return (
		<div className=" max-w-[400px] w-full h-full shadow-lg rounded-lg p-6 lg:flex flex-col bg-white text-slate-900 dark:bg-slate-800 dark:text-white space-y-12">
			<div className="w-full flex flex-col space-y-4 items-center">
				<div className=" w-[90px] h-[90px] self-center  dark:bg-white bg-slate-900 dark:text-slate-900 text-white rounded-full flex p-4 items-center justify-center uppercase text-center">
					<h1 className=" w-full text-center text-4xl">
						{user.username.slice(0, 1)}
					</h1>
				</div>
				<h1 className=" text-center my-2 text-2xl capitalize">
					Hi, {user.username}
				</h1>
			</div>
			<div className=" w-full flex flex-col space-y-3">
				<Link to={'/'}>
					<div
						style={pathname === '/' ? { color: 'rgb(147 51 234)' } : {}}
						onClick={() => setNavOpen && setNavOpen(false)}
						className=" flex w-full h-auto p-4 rounded-md justify-between shadow-md items-center"
					>
						<h1 className=" text-xl">Dashboard</h1>
						<MdDashboard size={25} />
					</div>
				</Link>
				<Link to={'/settings'}>
					<div
						style={pathname === '/settings' ? { color: 'rgb(147 51 234)' } : {}}
						onClick={() => setNavOpen && setNavOpen(false)}
						className=" flex w-full h-auto p-4 rounded-md justify-between shadow-md items-center"
					>
						<h1 className=" text-xl">Settings</h1>
						<MdSettings size={25} />
					</div>
				</Link>
				<Link to={'/account'}>

					<div
						style={pathname === '/account' ? { color: 'rgb(147 51 234)' } : {}}
						onClick={() => setNavOpen && setNavOpen(false)}
						className=" flex w-full h-auto p-4 rounded-md justify-between shadow-md items-center"
					>
						<h1 className=" text-xl">Account</h1>
						<MdPerson size={25} />
					</div>
				</Link>

				<div
					onClick={handleLogout}
					className=" flex w-full h-auto p-4 rounded-md justify-between shadow-md items-center"
				>
					<h1 className=" text-xl">Logout</h1>
					<MdLogout size={25} />
				</div>
			</div>
			<ThemeTray />
			<div className=" flex w-full items-center justify-center lg:hidden">
				<div
					onClick={() => setNavOpen(false)}
					className=" p-2 border-2 rounded-full cursor-pointer"
				>
					<MdClose size={24} className="" />
				</div>
			</div>
		</div>
	);
}
