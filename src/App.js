// import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Items from './components/Items';
import AddItem from './components/AddItem';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const [showAddItem, setShowAddItem] = useState(false)
  const [items, setItem] = useState([])
  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchItems()
      setItem(itemsFromServer)
    }

    getItems()
  }, [])

  // Fetch Items
  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items')
    const data = await res.json()

    return data
  }
  const fetchItem = async (id) => {
    const res = await fetch(`http://localhost:5000/items/${id}`)
    const data = await res.json()

    return data
  }

  // Remove Item
  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE'
    })
    setItem(items.filter((item) => item.id !== id))
    // console.log('delete', id)
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const itemToToggle = await fetchItem(id)
    const updItem = { ...itemToToggle, reminder: !itemToToggle.reminder }
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await res.json()

    setItem(items.map((item) => item.id === id ? { ...item, reminder: !data.reminder } : item))
    // console.log(id)
  }

  // Add Item
  const addItem = async (item) => {
    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(item)
    })

    const data = await res.json()

    setItem([...items, data])


    // const id = Math.floor(Math.random()*100) + 1
    // const newItem = { id, ...item}
    // setItem([...items, newItem])
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddItem(!showAddItem)} showAdd={showAddItem} />

        <Routes>
          <Route path='/' exact element= {
            <>
              {showAddItem && <AddItem onAdd={addItem} />}
              {items.length > 0 ? <Items items={items} onDelete={deleteItem} onToggle={toggleReminder} />
                : 'No Items!'}
            </>
          }>

          </Route>
          <Route path='/about' element={<About/>} /></Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


// class App extends React.Component {
//   render() {
//     return <h1>Class based react</h1>
//   }
// }


