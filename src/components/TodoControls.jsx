import { useContext } from 'react';
import { AppContext } from '../context';

export const TodoControls = () => {
	const { isSorted, toggleSort, searchQuery, setSearchQuery } = useContext(AppContext);
	return (
		<div>
			<label>
				Sort A-Z
				<input type="checkbox" checked={isSorted} onChange={toggleSort} />
			</label>
			<br />
			<input
				type="text"
				value={searchQuery}
				onChange={({ target }) => setSearchQuery(target.value)}
				placeholder="Search todo ..."
			/>
		</div>
	);
};
