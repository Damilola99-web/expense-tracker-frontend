import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingMini from '../components/LoadingMini';
import { useAuthContext } from '../hooks/useAuthContext';
import { baseUrl } from '../utils/baseUrl';
import { toastit } from '../utils/toastIt';
import { MdDelete, MdEdit } from 'react-icons/md';
import EditCategory from '../components/EditCategory';
import CategoryForm from '../components/CategoryForm';

export default function Settings() {
	const [ categories, setCategories ] = useState([]);
	const [ error, setError ] = useState(null);
	const [ formError, setFormError ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isFormLoading, setIsFormLoading ] = useState(false);
	const [ editOpen, setEditOpen ] = useState(false);
	const { user } = useAuthContext();
	const [ name, setName ] = useState('');
	const [ color, setColor ] = useState('');

	const handleDelete = async (id) => {
		const res = await fetch(`${baseUrl}/categories/${id}`, {
			headers : {
				authorization : user.token
			},
			method  : 'DELETE'
		});

		const data = await res.json();

		if (res.ok) {
			const newCategory = categories.filter((category) => {
				return category.id !== id;
			});
			setCategories(newCategory);
			toastit('Category removed sucessfully', 'success');
		}

		if (!res.ok) {
			toastit(data.message, 'error');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsFormLoading(true);
		setFormError(null);

		const res = await fetch(`${baseUrl}/categories`, {
			headers : {
				authorization  : user.token,
				'Content-Type' : 'application/json'
			},
			body    : JSON.stringify({ name, color }),
			method  : 'POST'
		});

		const data = await res.json();

		if (res.ok) {
			setIsFormLoading(false);
			setFormError(null);
			setCategories((values) => [ ...values, { name, color } ]);
			setName('');
			setColor('#fff');
			toastit('Category added sucessfully', 'success');
		}

		if (!res.ok) {
			console.log(data);
			setIsFormLoading(false);
			setFormError(data.message);
			toastit(data.message, 'error');
		}
	};

	const fetchCategories = async () => {
		setCategories([]);
		setIsLoading(true);
		const res = await fetch(`${baseUrl}/categories`, {
			headers : { authorization: user.token }
		});

		const data = await res.json();

		if (res.ok) {
			setIsLoading(false);
			setCategories(data);
			setError(null);
		}

		if (!res.ok) {
			setIsLoading(false);
			setError(data.message);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	if (error) {
		return (
			<p className=" w-full h-[45px] bg-red-600/10 rounded-lg border-2 border-red-600 dark:text-white flex items-center text-center justify-center">
				{error}
			</p>
		);
	}
	if (isLoading) {
		return (
			<div className="h-full w-full height bg-white dark:text-white dark:bg-slate-800 p-8 rounded-lg shadow-lg flex space-x-6 items-center">
				<LoadingMini />
			</div>
		);
	}

	return (
		<div className=" h-full w-full height bg-white dark:text-white dark:bg-slate-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row smd:pace-x-6 md:justify-between">
			{editOpen && (
				<EditCategory categories={categories} setCategories={setCategories} setEditOpen={setEditOpen} category={editOpen} />
			)}
			<div className=" flex flex-col md:w-[45%]">
				<h1 className=" text-3xl font-bold my-3 md:text-3xl">
					Edit Categories
				</h1>
				<div className=" my-3">
					{categories.map((category) => (
						<div
							style={{
								borderBottom : `solid 4px ${category.color}`
							}}
							key={category.id}
							className={` w-full my-2 text-slate-800 rounded-md h-[50px] bg-white flex items-center justify-between p-3`}
						>
							<h1>{category.name}</h1>
							<div className="flex space-x-4">
								<MdEdit
									onClick={() => setEditOpen(category)}
									className=" text-slate-700"
									size={24}
								/>
								<MdDelete
									size={24}
									className=" text-red-600"
									onClick={() => handleDelete(category.id)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className=" flex flex-col space-y-4 items-center md:w-[45%]">
				<h1 className=" text-3xl font-bold my-3 md:text-3xl text-center">
					Add Category
				</h1>
				<form
					onSubmit={handleSubmit}
					className=" flex flex-col space-y-5 p-6 rounded-md shadow-lg w-full bg-slate-700"
				>
					<CategoryForm
						action={'Add'}
						color={color}
						isFormLoading={isFormLoading}
						name={name}
						setColor={setColor}
						setName={setName}
					/>
				</form>
			</div>
		</div>
	);
}
