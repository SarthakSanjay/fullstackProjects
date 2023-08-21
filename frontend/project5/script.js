//tasks
//create input
//create add btn
//create show task div
//create element for div
//




const makeTask = () =>{
    let task = document.getElementById('task').value
    if(task === ""){
        alert("task can't be empty")
        return 
    }
    let div = document.createElement('div')
    div.className = "tasks"  
    div.classList.add('bg-blue-200','flex','justify-between','items-center','m-2','rounded-1xl')
    let st = document.getElementById('show-task')

    let divHtml = `
        <p id="text" class="mx-4" ></p>
        <div>
        <button id='Done' class='p-2 mx-2 bg-green-600 '>Done</button>
        <button id='Del' class='p-2 mx-2 bg-red-600 '>Del</button>
        </div>
    `
    
    
    div.innerHTML = divHtml
    // div.textContent = task
    st.appendChild(div)
    document.getElementById('task').value= ""
    
    let textElement = div.querySelector('#text');
    textElement.textContent = task;
    

    let done = div.querySelector('#Done')
    done.addEventListener('click',()=>{
        textElement.classList.add("line-through")
    })
    let del = div.querySelector('#Del')
    del.addEventListener('click',()=>{
        div.innerHTML = ''
    })
    
    
}
task.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        makeTask(); // Call your makeTask function
    }
});



document.getElementById('btn').addEventListener('click',makeTask)   
// document.getElementById('text').classList.add('flex')

// document.getElementById('dark-mode').addEventListener('click',()=>{
//     document.getElementsByTagName("body").classList.toggle('dark')
// })