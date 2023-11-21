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
  const [uniqueColor , setUniqueColor] = useState([])
  // console.log("product",product)
  // console.log('color array', colorArray)

  useEffect(()=>{
    const fetchProduct = async() =>{
      await fetch('http://localhost:3000/product/all')
      .then(res => res.json())
      .then(res => {
        let productArray = [...new Set(res.product.map(item => item.color))]
        console.log(productArray)
        setUniqueColor(productArray)
        setProduct(res.product)
      })
      .catch(err => console.log(err.message))
    }
    fetchProduct()

  
  },[])
  const handleChange = (e) =>{
    e.preventDefault()
    setInput(e.target.value)
    // console.log(e.target.value)

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

    // console.log(input)
  }
  
  const handleClick =async(e) =>{
    e.preventDefault()
    const color = e.target.value;

    let updatedArray;
    
    if(colorArray.includes(color)){
     updatedArray = colorArray.filter((item) => item !== color)
    //  setColorArray(updatedArray)
    //  console.log(updatedArray);
    }else{
      // colorArray.push(color)
      updatedArray = [...colorArray, color];
      
    }
   setColorArray(updatedArray)

    
    await fetch(` http://localhost:3000/product/filter?colors=${updatedArray.toString()}`)
    .then(res => res.json())
    .then(res => {
     
      setProduct(res.product)

     return res.product
    })
   
    
    setCheckedStatus({
      ...checkedStatus,
      [color]: !checkedStatus[color],
    });
  }

  const listStyle = {
    cursor: "pointer"
  }
  

  return (
    <>
    <h3>SEARCH AND FILTER FUNCTIONALITY</h3>
    <div>
      {
       uniqueColor.map(item => {
        return <div key={item._id}>
          <label>{item}</label>
      <input style={listStyle} type='checkbox' checked={checkedStatus[item]} value={item}   onChange={handleClick} />
          </div>
       })
      }

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
