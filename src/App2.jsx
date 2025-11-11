import { useEffect, useState } from 'react';

import styles from './App.module.css';

const TODOS_URL = 'http://localhost:3000/todos';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editingTitle, setEditingTitle] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [originalTodos, setOriginalTodos] = useState([]);

	const [searchQuery, setSearchQuery] = useState('');

	const onSortTodosToggle = (checked) => {
		const sorted = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		if (checked) {
			setTodos(sorted);
			setIsSorted(true);
		} else {
			setTodos(originalTodos);
			setIsSorted(false);
		}
	};

	const searchedTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	useEffect(() => {
		fetch(TODOS_URL)
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
				setOriginalTodos(data);
			});
	}, []);

	const onCreateTodo = (e) => {
		e.preventDefault();
		fetch(TODOS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
				completed: false,
			}),
		})
			.then((response) => response.json())
			.then((newTodo) => {
				setTodos((prevTodos) => [...prevTodos, newTodo]);
				setOriginalTodos((prevTodos) => [...prevTodos, newTodo]);
			});
		setTitle('');
	};

	const onToggleCompleted = (id, currentCompleted) => {
		fetch(`${TODOS_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ completed: !currentCompleted }),
		})
			.then((response) => response.json())
			.then((updatedTodo) =>
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				),
			);
	};

	const onEditTodo = (id) => {
		fetch(`${TODOS_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: editingTitle }),
		})
			.then((response) => response.json())
			.then((updatedTodo) =>
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				),
			);
		setEditingId(null);
		setEditingTitle('');
	};

	const onDeleteTodo = (id) => {
		fetch(`${TODOS_URL}/${id}`, { method: 'DELETE' }).then(() =>
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)),
		);
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onCreateTodo}>
				<input
					type="text"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>

				<button className={styles.btn}>Create</button>
			</form>
			<label>
				Sort
				<input
					type="checkbox"
					checked={isSorted}
					onChange={({ target }) => onSortTodosToggle(target.checked)}
				/>
			</label>
			<input
				type="text"
				value={searchQuery}
				onChange={({ target }) => setSearchQuery(target.value)}
				onBlur={() => setSearchQuery('')}
				placeholder="Search todo ..."
			/>
			{todos.length > 0 && <h3>Todos:</h3>}
			<ul className={styles.list}>
				{searchedTodos.map(({ id, title, completed }) => (
					<li className={styles.listItem} key={id}>
						{editingId === id ? (
							<input
								type="text"
								value={editingTitle}
								onChange={({ target }) => setEditingTitle(target.value)}
								onBlur={() => onEditTodo(id)}
							/>
						) : (
							<>
								<input
									type="checkbox"
									checked={completed}
									onChange={() => onToggleCompleted(id, completed)}
								/>
								<p>{title}</p>
								<button
									onClick={() => {
										setEditingId(id);
										setEditingTitle(title);
									}}
								>
									Edit
								</button>
								<button onClick={() => onDeleteTodo(id)}>Delete</button>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};
