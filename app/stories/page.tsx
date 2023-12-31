import React from "react";
import Link from "next/link";
import { Blog } from "@/types";

type Props = {};

const page = async (props: Props) => {

	let blogs = []
	try {
		const response = await fetch("http://localhost:3000/api/getStories", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data?.data);
			blogs = data?.data
		} else {
			console.error(`Stories couldn't be fetched. Try again!`);
		}
	} catch (error) {
		console.error("Error!", error);
	}

	return (
		<div className='w-[70%] mx-auto my-16'>
			<h2 className="text-4xl text-center mb-8">Stories List</h2>
			<ul className='flex flex-col justify-around items-center max-h-screen'>
				{blogs.map((blog:Blog) => (
					<>
						<li
							className='mb-8 w-full'
							key={blog.id}
						>
							<Link href={`/story/${blog.slug}`}>
								<h3 className="text-3xl">{blog.title}</h3>
								<p>{blog.summary}</p>
								<p>Author ID: {blog.userId}</p>
							</Link>
							<hr />
						</li>
					</>
				))}
			</ul>
		</div>
	);
};

export default page;
