import Item from "./Item"

const Items = ({ items, onDelete, onToggle }) => {

	return (
		<>
			{items.map((item, index) => (
				<Item
					key={index}
					item={item}
					onDelete={onDelete}
					onToggle={onToggle} />
			))}
		</>
	)
}

export default Items