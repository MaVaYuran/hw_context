import { TodoForm } from './components/TodoForm';
import { TodoControls } from './components/TodoControls';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import styles from './App.module.css';
import { AppContext } from './context';

export const App = () => {
	const todoState = useTodos();
	const { isLoading } = useTodos();
	if (isLoading) return <p>Loading ...</p>;

	return (
		<AppContext value={todoState}>
			<div className={styles.app}>
				<h3>Todos:</h3>
				<TodoControls />
				<TodoForm />
				<TodoList />
			</div>
		</AppContext>
	);
};
