import React from "react";
import Link from "next/link";
type Props = {};

const UploadButton = (props: Props) => {
	return (
		<Link
			tabIndex={1}
			href='/images/upload'
			className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800 no-underline'
		>
			Upload
		</Link>
	);
};

export default UploadButton;
