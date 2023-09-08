import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
const [length , setLength] = useState(15)
const [number , setNumber]= useState(false)
const [character , setCharacter] = useState(false) 
const [password , setPassword] = useState("")

// useRef hook
const passwordRef = useRef(null)


const passwordGenerator = useCallback(()=>{
  let pass = ""
  let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number) string += "0123456789"
  if(character) string += "~!@$%&*+-/{}()[]="
  for(let i = 1 ; i <= length ; i++){
    let char = Math.floor((Math.random() * string.length) + 1)
    pass += string.charAt(char)
  }
  setPassword(pass)
},[length,number,character, setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0 ,password.length)
  window.navigator.clipboard.writeText(password)
},[password]) 

useEffect(()=>{
  passwordGenerator()
},[length,number , character , passwordGenerator])
  return (
    <div className='bg-black h-screen w-screen flex justify-center items-center'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
       <h1 className='text-white text-center'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passwordRef}
         />
         <button 
         className='bg-red-100 px-3 border-red-600  hover:bg-red-500 hover:text-white'
         onClick={copyPasswordToClipboard}
         >Copy</button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' 
            onChange={(e) =>setLength(e.target.value) }
          />
          <label> Length ({length})</label>
          <input type='checkbox' 
          defaultChecked={number} 
          onChange={() => setNumber((prev) => !prev)}
          />
          <label>Numbers</label>
          <input type='checkbox' 
          defaultChecked={character} 
          onChange={() => setCharacter((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
       </div>
      </div>
    </div>
  )
}

export default App
