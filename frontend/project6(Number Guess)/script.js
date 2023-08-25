const originalNo = Math.floor(Math.random() * 100) + 1;
console.log(originalNo)

let form = document.querySelector('form')

let button = document.querySelector('#btn')
let attempts = 10
let array = []
button.addEventListener('click',(e)=>{
  e.preventDefault()
  attempts--
  let guessNo = document.querySelector('#guess').value
  if(guessNo > 100 || guessNo < 0){
    alert("Number out of range")
    return
  }
  let prevNo = document.querySelector('#prevNo')
  array.push(guessNo)
  let hints = document.querySelector('#hint')
  if(originalNo == guessNo){
    console.log("you win")
    hints.style.color = "green"
    hints.textContent = "you win"
    setTimeout(()=>{
    location.reload()
      
    },2000)
  } else if(originalNo > guessNo){
    console.log("guess higher")
    hints.textContent = "guess higher"
  }
  else{
    console.log("guess lower")
    hints.textContent = "guess lower"
  }
  prevNo.textContent = array
  
if(attempts == 0){
  console.log("you lose")
  hints.style.color = "red"
  setTimeout(()=>{
    location.reload()
      
    },2000)
}
  let gr = document.querySelector('#gr')
  gr.textContent = attempts
  guess.value =''

  
})
