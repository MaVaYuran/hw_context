import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
	const [title, setTitle] = useState('');

	const handdleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		onAdd(title);
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
