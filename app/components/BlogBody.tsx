import React from "react";
import { Blog } from "@/types";
type Props = { blog: Partial<Blog> };

const BlogBody = ({ blog }: Props) => {
	return (
		<div className='text-white flex flex-col justify-start items-center'>
			<h1>{blog.title}</h1>
			<h4>{blog.summary}</h4>
			<div dangerouslySetInnerHTML={{ __html: blog.body }} />
		</div>
	);
};

export default BlogBody;
