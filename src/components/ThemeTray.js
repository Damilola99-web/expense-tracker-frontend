import React from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import { MdLightMode, MdDarkMode, MdLaptopMac } from 'react-icons/md';

export default function ThemeTray() {
	const { changeTheme, theme } = useThemeContext();
	const handleSystemTheme = () => {
		const dark = window.matchMedia('(prefers-color-scheme : dark)');
		if (dark.matches) {
			changeTheme('dark');
		} else {
			changeTheme('light');
		}
	};
	return (
		<div className=" group flex space-x-4 rounded-lg bg-white shadow-lg border-white dark:bg-slate-900 p-2 h-max self-center text-slate-900 dark:text-white relative">
			{theme === 'light' && (
				<button
					className=" hidden lg:flex"
					onClick={() => changeTheme('light')}
				>
					<MdLightMode size={27} />
				</button>
			)}

			{theme === 'dark' && (
				<button
					className=" hidden lg:flex"
					onClick={() => changeTheme('dark')}
				>
					<MdDarkMode size={27} />
				</button>
			)}

			<div className=" group-hover:flex flex-col hidden absolute w-[200px] h-auto p-4 rounded-md bg-white dark:bg-slate-900 shadow-lg top-4 space-y-3">
				<div
					onClick={() => changeTheme('light')}
					className="flex space-x-4 items-center cursor-pointer"
				>
					<button>
						<MdLightMode size={27} />
					</button>
					<p className="text-lg font-semibold"> Light</p>
				</div>
				<div
					onClick={() => changeTheme('dark')}
					className="flex space-x-4 items-center cursor-pointer"
				>
					<button>
						<MdDarkMode size={27} />
					</button>
					<p className="text-lg font-semibold"> Dark</p>
				</div>
				<div
					onClick={handleSystemTheme}
					className="flex space-x-4 items-center cursor-pointer"
				>
					<button>
						<MdLaptopMac size={27} />
					</button>
					<p className="text-lg font-semibold"> System</p>
				</div>
			</div>
			<div className=" lg:hidden flex justify-center space-x-4 p-2 items-center flex-row w-full">
				<button onClick={() => changeTheme('light')}>
					<MdLightMode size={27} />
				</button>
				<button onClick={() => changeTheme('dark')}>
					<MdDarkMode size={27} />
				</button>
				<button onClick={handleSystemTheme}>
					<MdLaptopMac size={27} />
				</button>
			</div>
		</div>
	);
}
