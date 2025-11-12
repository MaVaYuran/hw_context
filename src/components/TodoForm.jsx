import React, { useContext, useState } from 'react';
import { AppContext } from '../context';

const TodoForm = () => {
	const [title, setTitle] = useState('');
	const { addTodo } = useContext(AppContext);

	const handdleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		addTodo(title);
		setTitle('');
	};

	return (
		<div>
			<form onSubmit={handdleSubmit}>
				<input
					type="text"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<button>Create</button>
			</form>
		</div>
	);
};

export { TodoForm };
