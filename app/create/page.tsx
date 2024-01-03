"use client";
import React, { useState, useEffect } from "react";
import Editor from "@/app/components/JoditEditor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ErrorProps } from "next/error";
import { Tag } from "@/types";

type Props = {};

const page = (props: Props) => {
	const { data: session } = useSession();
	const [tags, setTags] = useState([])
	const [tagLoading, setTagLoading] = useState(false)
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/getTags");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				const result = await response.json();
				setTags(result.data);
			} catch (error) {
				console.error(error?.message);
			} finally {
				setTagLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleClick = async (
		title: string,
		content: string,
		summary: string,
		selectedTags: Tag[]
	) => {
		if (!title) {
			alert("Please enter title");
			// @ts-ignore
		} else if (!session?.user?.id) {
			alert("User not Authorized!");
		} else {
			alert(content);
			// submit blog

			const blogData = {
				title,
				content,
				// @ts-ignore
				userId: session?.user?.id,
				summary,
				tags: JSON.stringify(selectedTags)
			};

			try {
				const response = await fetch("http://localhost:3000/api/create", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(blogData),
				});

				if (response.ok) {
					const data = await response.json();
					console.log(data);
					alert(`Submission successful`);

					router.push("/stories");
				} else {
					alert(`Submission failed. Error!`);
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Registration failed. Please try again.");
			}
		}
	};
	return (
		<div className='w-[80%] max-w-[1320px] flex flex-col justify-center items-center mx-auto'>
			<h1 className='text-4xl p-4 my-4 text-blue'>
				Please write your article here
			</h1>
			<div>
				<Editor handleClick={handleClick} tagOptions={tags} />
			</div>
		</div>
	);
};

export default page;
