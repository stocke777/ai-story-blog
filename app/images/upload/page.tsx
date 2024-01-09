"use client";
import React, { useState, useEffect, FormEvent } from "react";
import AutoComplete from "@/app/components/Autocomplete";
import { useFetchTagsData } from "@/utility";
import { Tag } from "@/types";
import { useSession } from "next-auth/react";
type Props = {};

const page = (props: Props) => {
	const { data: session, status } = useSession();
	const [title, setTitle] = useState("");
	const [prompt, setPrompt] = useState("");
	const [tags, setTags] = useState([]);
	const [tagLoading, setTagLoading] = useState(false);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		useFetchTagsData(
			"http://localhost:3000/api/getTags",
			setTags,
			setTagLoading
		);
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputElement = e.target as HTMLInputElement;
		const files = inputElement.files;

		if (files && files.length > 0) {
			setFile(files[0]);
		}
	};

	const handleClick = async (e: FormEvent) => {
		e.preventDefault();
		if (!file) {
			alert("Please upload image");
		} else {
			console.log(title, selectedTags, prompt, file?.name);

			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await fetch("/api/s3-upload", {
					method: "POST",
					body: formData,
				});

				const data = await response.json();
				console.log(data);
				if (data?.fileName && session?.user?.id) {
					console.log(data.fileName, session.user.id, selectedTags);

					const selectedTagsJson = JSON.stringify(selectedTags)
					fetch("/api/imageSave", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: data.fileName,
							userId: session.user.id,
							tags: selectedTagsJson,
							title,
							prompt,
						}),
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	console.log(file);

	return (
		<div className='text-white mx-auto w-[70%] p-8'>
			<form
				onSubmit={handleClick}
				className='flex flex-col justify-stretch w-full'
			>
				<input
					type='text'
					id='title'
					className='mb-6 bg-gray-50 text-2xl p-4 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Title'
					required={true}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type='text'
					id='prompt'
					className='mb-6 bg-gray-50 text-xl p-4 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='AI Prompts'
					required={true}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<label
					htmlFor='dropzone-file'
					className='mb-6 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
				>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<svg
							className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 20 16'
						>
							<path
								stroke='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
							/>
						</svg>
						<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
							{file?.name ? (
								<span className='font-bold text-2xl'>
									Current File: {file?.name}
								</span>
							) : (
								<span className='font-semibold'>Click to upload</span>
							)}
						</p>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							SVG, PNG, JPG or GIF (MAX. 800x400px)
						</p>
					</div>
					<input
						id='dropzone-file'
						type='file'
						className='hidden'
						onChange={handleFileChange}
					/>
				</label>
				<AutoComplete
					options={tags}
					setSelectedTags={setSelectedTags}
				/>
				<button
					type='submit'
					className='text-blue-700 font-bold rounded-md bg-blue-100 hover:bg-white hover:cursor-pointer hover:text-black ease-in-out duration-300 py-2 px-4 mt-8 text-2xl'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default page;
