import { useEffect, useState } from 'react'

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
      // console.log(res.product[0].name)
     return res.product
    })

    console.log(input)
  }
  
  const handleClick =async(e) =>{
    // let arr = []
    const color = e.target.value;


    
    if(colorArray.includes(color)){
     let updatedArray = colorArray.filter((item) => item !== color)
    setColorArray(updatedArray)
    console.log(updatedArray);
    }else{
      colorArray.push(color)
      
    }
    // console.log(colorArray);
  
    // setColorArray(prevColorArray => [...prevColorArray, color]); 
    // console.log(colorArray);
  //  await setColorArray(prevColorArray => [...prevColorArray, color]); 
    
    await fetch(` http://localhost:3000/product/filter?colors=${colorArray.toString()}`)
    .then(res => res.json())
    .then(res => {
     
      setProduct(res.product)
      // console.log(res.product[0].name)
     return res.product
    })
   
    
    setCheckedStatus({
      ...checkedStatus,
      [color]: !checkedStatus[color],
    });
    // e.preventDefault()
  }

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
