import { TodoForm } from './components/TodoForm';
import { TodoControls } from './components/TodoControls';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import styles from './App.module.css';

export const App = () => {
	const {
		todos,
		isLoading,
		addTodo,
		editTodo,
		removeTodo,
		isSorted,
		toggleSort,
		searchQuery,
		setSearchQuery,
	} = useTodos();
	if (isLoading) return <p>Loading ...</p>;

	return (
		<div className={styles.app}>
			<h3>Todos:</h3>
			<TodoControls
				isSorted={isSorted}
				toggleSort={toggleSort}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<TodoForm onAdd={addTodo} />
			<TodoList
				todos={todos}
				onEdit={editTodo}
				onToggle={editTodo}
				onDelete={removeTodo}
			/>
		</div>
	);
};
