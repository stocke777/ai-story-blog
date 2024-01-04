import React from "react";
import BlogListingBody from "../components/BlogListingBody";
import { Blog } from "@/types";

type Props = {};

const page = async (props: Props) => {
	let blogs = [];
	try {
		const response = await fetch("http://localhost:3000/api/getStories", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data?.data);
			blogs = data?.data;
		} else {
			console.error(`Stories couldn't be fetched. Try again!`);
		}
	} catch (error) {
		console.error("Error!", error);
	}

	return (
		<div className='w-[70%] mx-auto my-16'>
			<h2 className='text-4xl text-center mb-8'>Stories List</h2>
			<ul className='flex flex-col justify-around items-center'>
				{blogs.map((blog: Blog) => (
					<BlogListingBody blog={blog}/>
				))}
			</ul>
		</div>
	);
};

export default page;
