import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSorted, setIsSorted] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		getTodos().then((loadedTodos) => {
			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	const addTodo = async (title) => {
		const newTodo = await createTodo({ title, completed: false });
		setTodos((prev) => [...prev, newTodo]);
	};

	const editTodo = async (id, data) => {
		const updated = await updateTodo(id, data);
		setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
	};

	const removeTodo = async (id) => {
		await deleteTodo(id);
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	const toggleSort = () => setIsSorted((prev) => !prev);

	const sortedTodos = isSorted
		? [...todos].sort((a, b) => a.title.localeCompare(b.title))
		: todos;

	const displayedTodos = sortedTodos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return {
		todos: displayedTodos,
		isLoading,
		addTodo,
		editTodo,
		removeTodo,
		isSorted,
		toggleSort,
		searchQuery,
		setSearchQuery,
	};
};
