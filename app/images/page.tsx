import React from "react";
import db from "@/sqliteDB";
import UploadButton from "../components/UploadButton";
import ImageContainer from "./../components/ImageContainer";
type Props = {};

const placeholderImages = [
	"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
	"https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg",
	"https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

async function getAllImages() {
	try {
		const images = await db("images").select("*");
		return images;
	} catch (error) {
		console.error("Error fetching images:", error);
		throw error;
	}
}

const page = async (props: Props) => {
	const images = await getAllImages();
	console.log(images);
	
	return (
		<div className='w-[70%] mx-auto p-4 flex flex-col justify-center items-center'>
			<h1 className='text-4xl text-white '>Image Board</h1>
			<div className='w-full text-end'>
				<UploadButton />
			</div>
			<div className='pt-4 flex justify-center flex-wrap'>
				{images.map((image, index) => {
					return (
						<ImageContainer
							image={image}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default page;
