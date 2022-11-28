import React from 'react';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useAuthContext } from '../hooks/useAuthContext';
import { baseUrl } from '../utils/baseUrl';
import { toastit } from '../utils/toastIt';
import CategoryForm from './CategoryForm';

export default function EditCategory({
	setEditOpen,
	category,
	categories,
	setCategories
}) {
	const { user } = useAuthContext();

	const [ newName, setNewName ] = useState(category.name);
	const [ newColor, setNewColor ] = useState(category.color);
	const [ isFormLoading, setIsFormLoading ] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsFormLoading(true);

		const res = await fetch(`${baseUrl}/categories/${category.id}`, {
			headers : {
				authorization  : user.token,
				'Content-Type' : 'application/json'
			},
			body    : JSON.stringify({ name: newName, color: newColor }),
			method  : 'PUT'
		});

		const data = await res.json();

		if (res.ok) {
			setIsFormLoading(false);
			const newCategories = categories.map((cat) => {
				if (cat.id === category.id) {
					return { ...category, name: newName, color: newColor };
				} else {
					return cat;
				}
			});
			setCategories(newCategories);
			setNewName('');
			setNewColor('#000000');
			toastit('Category edited sucessfully', 'success');
			setEditOpen(false);
		}

		if (!res.ok) {
			setIsFormLoading(false);
			toastit(data.message, 'error');
		}
	};

	return (
		<div className=" w-screen h-screen bg-black/30 fixed overflow-hidden z-20 top-0 left-0 p-4 flex items-center justify-center">
			<div className=" p-6 shadow-lg rounded-md w-full bg-white max-w-[500px] flex flex-col space-y-6 items-center justify-center">
				<form
					onSubmit={handleSubmit}
					className=" p-6 bg-slate-700 shadow-lg rounded-md w-full flex flex-col space-y-4"
				>
					<CategoryForm
						color={newColor}
						isFormLoading={isFormLoading}
						setName={setNewName}
						name={newName}
						setColor={setNewColor}
						action={'Edit'}
					/>
				</form>
				<div
					onClick={() => setEditOpen(false)}
					className=" p-2 border-2 rounded-full cursor-pointer border-slate-800"
				>
					<MdClose size={24} className=" text-slate-800" />
				</div>
			</div>
		</div>
	);
}
