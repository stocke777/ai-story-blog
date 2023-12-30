'use client'
import React, {useState} from "react";
import Editor from "@/app/components/JoditEditor";


type Props = {};

const page = (props: Props) => {

    const handleClick = (content:string) => {
        alert(content)
    }
	return (
		<div className="w-[80%] flex flex-col justify-center items-center mx-auto">
            <h1 className="text-4xl p-4 my-4 text-blue">Please write your article here</h1>
			<div>
				<Editor handleClick={handleClick} />
			</div>
            
		</div>
	);
};

export default page;
