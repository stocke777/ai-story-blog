import React from "react";
import db from "@/sqliteDB";
import { Blog } from "@/types";
import DOMPurify from "dompurify";
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
    
    console.log(response)
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

  console.log(blog)
	return (
		<div className='p-8 m-8 mx-auto w-[70%]'>
			<div className='flex flex-col justify-center items-center'>
				{blog?.body && (
					<div>
						<h1>{blog.title}</h1>
						<h2>{blog.summary}</h2>
						<div dangerouslySetInnerHTML={{ __html: blog.body }} />
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
