import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { flexCenter } from '@/utility'

const Editor = ({ handleClick }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');
	console.log(content)


	return (
		<div className={`flex-col ${flexCenter}`}>
			<JoditEditor
				ref={editor}
				value={content}
				// config={config}
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => setContent(newContent)}
				onChange={newContent => setContent(newContent)}
			/>
			<button className="text-blue-700 font-bold rounded-md bg-blue-100 hover:bg-white hover:text-black ease-in-out duration-300 py-2 px-4 m-4 text-2xl" onClick={() => handleClick(content)}>
				Submit
			</button>
		</div>
	);
};

export default Editor