import { useState } from 'react'

import './App.css'

function App() {
  const [input , setInput] = useState('')
  const [product , setProduct] = useState([])
  const [checkedStatus, setCheckedStatus] = useState({
    red: false,
    white: false,
    black: false,
  });
  const [colorArray , setColorArray] = useState([])
  const handleChange = (e) =>{
    // e.preventDefault()
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
    const color = e.target.value;
   
    setColorArray(prevColorArray => [...prevColorArray, color]); 
   
    
    setCheckedStatus({
      ...checkedStatus,
      [color]: !checkedStatus[color],
    });
    // e.preventDefault()
    await fetch(` http://localhost:3000/product/filter?colors=${colorArray.toString()}`)
    .then(res => res.json())
    .then(res => {
      setProduct(res.product)
      console.log(res.product[0].name)
     return res.product
    })
  }
  console.log(colorArray.toString())

  const listStyle = {
    cursor: "pointer"
  }
  return (
    <>
    <div>
      <label>Red</label>
      <input style={listStyle} type='checkbox' checked={checkedStatus.red} value="red"   onChange={handleClick} />
      <label>White</label>
      <input style={listStyle} type='checkbox' value="white" checked={checkedStatus.white}  onChange={handleClick} />
      <label>Black</label>
      <input style={listStyle} type='checkbox' value="black" checked={checkedStatus.black}  onChange={handleClick} />

    </div>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={handleChange} /> 
          <button type="submit">Search</button>
        </form>

        {
          product  ? product.map(item =>{
            return <ul style={{listStyle:'none', textAlign:'start'}} key={item._id}>
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
