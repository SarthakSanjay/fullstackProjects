import { useState } from 'react'

import './App.css'

function App() {
  const [input , setInput] = useState('')
  const [product , setProduct] = useState([])
  const [isChecked , setChecked] = useState(false)
  const handleChange = (e) =>{
    e.preventDefault()
    setInput(e.target.value)
    console.log(e.target.value)

  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    await fetch(` http://localhost:3000/product/search?search=${input}`)
    .then(res => res.json())
    .then(res => {
      setProduct(res.product)
      console.log(res.product[0].name)
     return res.product
    })

    console.log(input)
  }

  const handleClick =async(e) =>{
    setChecked(!isChecked)
    e.preventDefault()
    await fetch(` http://localhost:3000/product/search?search=${e.target.value}`)
    .then(res => res.json())
    .then(res => {
      setProduct(res.product)
      console.log(res.product[0].name)
     return res.product
    })
  }

  return (
    <>
    <div>
      <label>Red</label>
      <input type='checkbox' value="red" checked={isChecked}  onChange={handleClick} />
      <label>White</label>
      <input type='checkbox' value="white" checked={isChecked}  onChange={handleClick} />
    </div>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={handleChange} /> 
          <button type="submit">Search</button>
        </form>

        {
          product && isChecked ? product.map(item =>{
            return <ul style={{listStyle:'none'}} key={item._id}>
            <li>Name: {item.name}</li>
            <li>Category: {item.category}</li>
            <li>Color: {item.color}</li>
          </ul>
          }) : <div>No items</div>
        }
    </>
  )
}

export default App
