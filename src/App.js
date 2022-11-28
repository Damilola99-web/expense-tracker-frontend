import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import Signup from './pages/Signup';
import VisitorsRoute from './pages/VisitorRoute';
import Loading from './components/Loading';
import { useThemeContext } from './hooks/useThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import Account from './pages/Account';
import { DataContextProvider } from './context/DataContext';

function App() {
	const { authIsReady, dispatch, user } = useAuthContext();
	const themeContext = useThemeContext();

	useEffect(() => {
		if (localStorage.getItem('user')) {
			const localstore = JSON.parse(localStorage.getItem('user'));
			dispatch({ type: 'SIGNIN', payload: localstore });
		} else {
			dispatch({ type: 'LOGOUT' });
		}

		if (localStorage.getItem('theme')) {
			const localtheme = localStorage.getItem('theme');
			themeContext.changeTheme(localtheme);
		} else {
			const theme = window.matchMedia('(prefers-color-scheme : dark)');
			if (theme.matches) {
				themeContext.changeTheme('dark');
			} else {
				themeContext.changeTheme('light');
			}
		}
	}, []);

	if (!authIsReady) {
		return <Loading />;
	}

	return (
		<div className="App bg-slate-100 dark:bg-slate-700">
			<BrowserRouter>
				<ToastContainer
					position="top-left"
					autoClose={5000}
					hideProgressBar={false}
					closeOnClick
					rtl={false}
					draggable
					pauseOnHover
					theme="light"
				/>
				<Navbar />

				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<DataContextProvider>
									<div className=" lg:grid gtc w-full  md:p-4 height">
										{user && (
											<div className=" w-full h-full hidden lg:flex">
												<Sidebar />
											</div>
										)}
										<Dashboard />
									</div>
								</DataContextProvider>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/account"
						element={
							<ProtectedRoute>
								<div className=" lg:grid gtc w-full  md:p-4 height">
									{user && (
										<div className=" w-full h-full hidden lg:flex">
											<Sidebar />
										</div>
									)}
									<Account />
								</div>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<div className=" lg:grid gtc w-full  md:p-4 height">
									{user && (
										<div className=" w-full h-full hidden lg:flex">
											<Sidebar />
										</div>
									)}
									<Settings />
								</div>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<VisitorsRoute>
								<Login />
							</VisitorsRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<VisitorsRoute>
								<Signup />
							</VisitorsRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
