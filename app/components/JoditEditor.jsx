import React, { useState, useRef, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import { flexCenter } from '@/utility'
import AutoComplete from '../components/Autocomplete'

const Editor = ({ handleClick, tagOptions }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');
	const [title, setTitle] = useState("")
	const [summary, setSummary] = useState("")
	const [selectedTags, setSelectedTags] = useState([])

	console.log(tagOptions, selectedTags)
	const onBlur = useCallback(
		(newContent) => {
			setContent(newContent);
		},
		[setContent]
	);
	return (
		<div className={`flex-col ${flexCenter}`}>
			<div className='m-4 w-full'>
				<label for="title" class="block mb-2  font-medium text-gray-900 dark:text-white">Title <span className='text-xs'>(required)</span></label>
				<input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required={true} value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div className='m-4 w-full '>

				<label for="message" class="block mb-2 font-medium text-gray-900 dark:text-white">Summary <span className='text-xs'>(optional)</span></label>
				<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your summary here..." value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>

			</div>
			<div className='m-4 w-full '>
				<JoditEditor
					ref={editor}
					value={content}
					// config={config}
					tabIndex={1} // tabIndex of textarea
					onBlur={onBlur}
					onChange={newContent => setContent(newContent)}
				/>
			</div>

			<AutoComplete options={tagOptions} setSelectedTags={setSelectedTags} />

			<button className="text-blue-700 font-bold rounded-md bg-blue-100 hover:bg-white hover:cursor-pointer hover:text-black ease-in-out duration-300 py-2 px-4 mt-8 text-2xl" onClick={() => handleClick(title, content, summary, selectedTags)}>
				Submit
			</button>
		</div>
	);
};

export default Editor