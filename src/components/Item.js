import { FaTimes } from 'react-icons/fa'

const Item = ({ item, onDelete, onToggle }) => {
	return (
		<div className={`task ${item.reminder ? 'reminder' : ''}`} onDoubleClick = {() => onToggle(item.id)}>
			<h3>
				{item.text}
				<FaTimes
					style={{ color: 'darkred', cursor: 'pointer' }}
					onClick={() => onDelete(item.id)} /> </h3>
			<p>{item.quantity}</p>
		</div>
	)
}

export default Item