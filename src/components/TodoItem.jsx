import { AppContext } from '../context';
import { useContext } from 'react';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo }) => {
	const { editTodo, removeTodo } = useContext(AppContext);
	const { id, title, completed } = todo;
	return (
		<li>
			<input
				type="checkbox"
				checked={completed}
				onChange={() => editTodo(id, { completed: !completed })}
			/>
			<span>{title}</span>
			<div className={styles.buttonBlock}>
				<button onClick={() => editTodo(id, { title: prompt('new title', title) })}>
					Edit
				</button>
				<button onClick={() => removeTodo(id)}>Delete</button>
			</div>
		</li>
	);
};

export { TodoItem };
