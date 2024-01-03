import React from "react";
import Link from "next/link";
import { Blog } from "@/types";
import Tag from '../components/Tag'

type Props = {
	blog: Blog;
};

const BlogListingBody = ({ blog }: Props) => {
    const tags = blog?.tag_names?.split(",")
    console.log(tags)
	return (
		<li
			className='mb-2 w-full list-none '
			key={blog.id}
		>
			<Link
				href={`/story/${blog.slug}`}
				className='text-white no-underline hover:text-blue-300 ease-in-out duration-200'
			>
				<h3 className='text-3xl'>{blog.title}</h3>
				<p>{blog.summary}</p>
				<p>Author ID: {blog.userId}</p>
				{tags && tags.map((tag)=>{
                    return <Tag name={tag} />
                })}
			</Link>
			<hr />
		</li>
	);
};

export default BlogListingBody;
