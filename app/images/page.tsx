import React from "react";
import UploadButton from "../components/UploadButton";
import ImageContainer from "./../components/ImageContainer";
type Props = {};

const placeholderImages = [
	"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
	"https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg",
	"https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

const page = (props: Props) => {
	return (
		<div className='w-[70%] mx-auto p-4 flex flex-col justify-center items-center'>
			<h1 className='text-4xl text-white '>Image Board</h1>
			<div className='w-full text-end'>
				<UploadButton />
			</div>
			<div className='pt-4 flex justify-center flex-wrap'>
				{placeholderImages.map((image, index) => {
					return (
						<ImageContainer
							src={image}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default page;
