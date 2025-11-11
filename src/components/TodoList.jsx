import { TodoItem } from './TodoItem';

const TodoList = ({ todos, onEdit, onToggle, onDelete }) => {
	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onEdit={onEdit}
					onToggle={onToggle}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
};

export { TodoList };
