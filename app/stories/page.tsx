import React from "react";
import db from "@/sqliteDB";
import Link from "next/link";
import { Blog } from "@/types";
type Props = {};

const page = async (props: Props) => {
	let blogs:Blog[] = [];
	try {
		blogs = await db("blogs").select("*");
	} catch {
		throw Error("Cant fetch Stories!!!");
	}
	return (
		<div className='w-[70%] mx-auto my-16'>
			<h2 className="text-4xl text-center mb-8">Stories List</h2>
			<ul className='flex flex-col justify-around items-center max-h-screen'>
				{blogs.map((blog) => (
					<>
						<li
							className='mb-8 w-full'
							key={blog.id}
						>
							<Link href='/'>
								<h3 className="text-3xl">{blog.title}</h3>
								<p>{blog.body}</p>
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
