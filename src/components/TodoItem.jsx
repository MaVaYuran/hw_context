const TodoItem = ({ todo, onEdit, onToggle, onDelete }) => {
	const { id, title, completed } = todo;
	return (
		<li>
			<input
				type="checkbox"
				checked={completed}
				onChange={() => onToggle(id, { completed: !completed })}
			/>
			<span>{title}</span>
			<button onClick={() => onEdit(id, { title: prompt('new title', title) })}>
				Edit
			</button>
			<button onClick={() => onDelete(id)}>Delete</button>
		</li>
	);
};

export { TodoItem };
