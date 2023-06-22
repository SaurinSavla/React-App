import { useState } from 'react'

const AddItem = ({ onAdd }) => {
	const [text, setText] = useState('')
	const [quantity, setQuantity] = useState('')
	const [reminder, setReminder] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault()

		if(!text) {
			alert('Please add an item!')
			return
		}

		onAdd({ text, quantity, reminder})

		setText('')
		setQuantity('')
		setReminder(false)
	}

	return (
		<form className = 'add-form' onSubmit = {onSubmit}>
			<div className = 'form-control'>
				<label>Item</label>
				<input type = 'text' placeholder = 'Add Item' value = {text} onChange = {(e) => setText(e.target.value)}></input>
			</div>
			<div className = 'form-control'>
				<label>Quantity</label>
				<input type = 'text' placeholder = 'Add Quantity' value = {quantity} onChange = {(e) => setQuantity(e.target.value)}></input>
			</div>
			<div className = 'form-control form-control-check' >
				<label>Set Reminder</label>
				<input type = 'checkbox' checked = {reminder} value = {reminder} onChange = {(e) => setReminder(e.currentTarget.checked)}></input>
			</div>

			<input type = 'submit' value = 'Save Item' className = 'btn btn-block' />
		</form>
	)
}

export default AddItem