import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { AppContext } from '../context';

const TodoList = () => {
	const { todos } = useContext(AppContext);

	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
};

export { TodoList };
