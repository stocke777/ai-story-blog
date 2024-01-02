import React from "react";
import { Blog } from "@/types";
import Link from "next/link";
import BlogBody from '@/app/components/BlogBody'
type Props = { params: { slug: string } };

const page = async ({ params }: Props) => {
	let blog: Partial<Blog> = {};

	try {
		const response = await fetch(
			`http://localhost:3000/api/getStory/${params.slug}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		console.log(response);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			blog = data?.data;
		} else {
			console.error("Error:");
		}
	} catch (error) {
		console.error("Error:", error);
	}

	console.log(blog);
	return (
		<div>
			<Link
				className='text-white no-underline'
				href="/stories"
			>
				<div className='flex flex-row align-middle px-8 m-8 hover:text-blue-300'>
					<svg
						className='w-5 mr-2'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
							clip-rule='evenodd'
						></path>
					</svg>
					<p className="m-2">back</p>
				</div>
			</Link>
			<div className='p-8 m-8 mx-auto w-[70%] rounded-lg'>
				<div className='flex flex-col justify-center items-center'>
					{blog?.body && (
						<BlogBody blog={blog} />
					)}
				</div>
			</div>
		</div>
	);
};

export default page;
