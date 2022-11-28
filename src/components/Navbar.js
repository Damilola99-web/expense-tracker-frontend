import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { toastit } from '../utils/toastIt';
import ThemeTray from './ThemeTray';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
	const { user, dispatch } = useAuthContext();
	const [ navOpen, setNavOpen ] = useState(false);
	const { logout } = useLogout();

	return (
		<div className=" w-screen px-6 md:px-12 py-12  h-[60px] flex justify-between items-center bg-purple-600 text-white">
			<Link to={'/'}>
				<h1 className=" text-xl font-bold">Expense Tracker</h1>
			</Link>
			<div className=" hidden md:flex">
				{!user && (
					<div className=" flex space-x-8 justify-between items-center">
						<Link to={'/login'}>
							<button>Login</button>
						</Link>
						<Link to={'/register'}>
							<button>Sign Up</button>
						</Link>
					</div>
				)}
				{user && (
					<div className=" flex space-x-4">
						<ThemeTray />
						<div className=" w-[60px] h-[60px] bg-white text-slate-900 dark:bg-slate-800 dark:text-white rounded-full flex p-4 items-center justify-center uppercase text-center">
							<h1 className=" w-full text-center text-xl">
								{user.username.slice(0, 1)}
							</h1>
						</div>
						<button onClick={logout}>Logout</button>
					</div>
				)}
			</div>
			{user && (
				<div onClick={() => setNavOpen(true)} className="lg:hidden">
					<GiHamburgerMenu size={25} />
				</div>
			)}
			{navOpen && (
				<div className=" lg:hidden w-screen z-50 h-screen bg-black/40 fixed overflow-hidden flex flex-col top-0 left-0">
					<Sidebar setNavOpen={setNavOpen} />
					<div
						onClick={() => setNavOpen(false)}
						className=" w-full h-full absolute top-0 left-0 hidden"
					/>
				</div>
			)}
		</div>
	);
}
