let inputDisplay = document.getElementById('display');
let btns = document.getElementsByClassName('btn');

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', () => {
        if(btns[i].innerHTML === "="){
            let ans = eval(inputDisplay.textContent)
            inputDisplay.textContent = ans

            //change color of the text
            inputDisplay.classList.add('text-green-400')

        }else if(btns[i].innerHTML === 'C' ){

            inputDisplay.innerHTML = "";
            
        }else if( btns[i].innerHTML === 'B'){
            inputDisplay.textContent = inputDisplay.textContent.slice(0,-1)

        }
        else{
            inputDisplay.textContent += btns[i].textContent;
        }

      
    });

    btns[i].classList.add("font-bold")
}

let darkMode = document.getElementById('darkMode')
darkMode.addEventListener('click',()=>{
    let screen = document.getElementById('screen')
    //screen
    screen.classList.toggle('bg-blue-100')
    screen.classList.toggle('bg-black')
    //calculator
    document.getElementById('calculator').classList.toggle('bg-gray-500')
    //display

    document.getElementById('display').classList.toggle('bg-gray-500')
    document.getElementById('keys').classList.toggle('bg-red-200')
    document.getElementById('keys').classList.toggle('bg-gray-800')
    
    // let btns = document.getElementsByClassName('btn')
    for(i = 0; i< btns.length ; i++){
        btns[i].classList.toggle('text-white')
    }
    darkMode.classList.toggle('border-white')
    darkMode.classList.toggle('text-white')
   
}) 