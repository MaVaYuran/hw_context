const TODO_URL = 'http://localhost:3000/todos';

export const getTodos = () => {
	return fetch(TODO_URL).then((response) => response.json());
};

export const createTodo = (todo) => {
	return fetch(TODO_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify(todo),
	}).then((response) => response.json());
};

export const updateTodo = (id, changes) => {
	return fetch(`${TODO_URL}/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify(changes),
	}).then((response) => response.json());
};

export const deleteTodo = (id) => {
	return fetch(`${TODO_URL}/${id}`, { method: 'DELETE' });
};
