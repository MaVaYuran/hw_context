export const TodoControls = ({ isSorted, toggleSort, searchQuery, setSearchQuery }) => {
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
