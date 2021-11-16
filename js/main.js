// getting all required elements 
const inputBox= document.querySelector(".inField input");
const addBtn= document.querySelector(".inField button");
const toDoList= document.querySelector(".toDoList");
const clearAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
    let userData = inputBox.value ;  //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only space 
        addBtn.classList.add('active'); //active the add button
    }else{
        addBtn.classList.remove('active'); //unactive the add button
    }
}

showTasks(); //calling showTasks function


//if user click on the add button 
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem('New Todo'); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding userdata
    localStorage.setItem('New Todo' , JSON.stringify(listArr)); //transforming js object into a json string

    showTasks(); //calling showTasks function
} 

// function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }

    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length ; //passing the length value in panding num 

    if(listArr.length >0){
        clearAllBtn.classList.add('active');
    }else{
        clearAllBtn.classList.remove('active');
    }
    let newLiTag = '' ;
    listArr.forEach( (element , index) => {
    
    newLiTag += `<li>${element}<span onclick='deleteTask(${index})';><i class="fas fa-trash"></i></span></li>`;
    });

    toDoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank 
}

//delete task function 
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage); 

    listArr.splice(index, 1); //delete or remove the particular indexed li

    //after remove the li again update the local storage
    localStorage.setItem('New Todo' , JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function

    
}

//delete all tasks function 
clearAllBtn.onclick = () =>{
    listArr = []; //empty an array

     //after delete task again update the local storage
     localStorage.setItem('New Todo' , JSON.stringify(listArr)); //transforming js object into a json string
     showTasks(); //calling showTasks function
}













