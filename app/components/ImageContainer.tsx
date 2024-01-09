import React from "react";
import Image from "next/image";
type Props = { image: any };

const ImageContainer = ({image}: Props) => {
	console.log(image)
	return (
		<div className='p-4 m-4 rounded-md'>
			<Image
				src={`https://s3-next-blog-bucket.s3.ap-south-1.amazonaws.com/${image?.unique_name}`}
				height={300}
				width={300}
				alt='alt'
			></Image>
		</div>
	);
};

export default ImageContainer;
