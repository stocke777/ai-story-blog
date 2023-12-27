import React from "react";
import Image from "next/image";
type Props = { src: string };

const ImageContainer = (props: Props) => {
	return (
		<div className='p-4 m-4 rounded-md'>
			<Image
				src={props.src}
				height={300}
				width={300}
				alt='alt'
			></Image>
		</div>
	);
};

export default ImageContainer;
