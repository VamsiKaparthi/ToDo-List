import './style.css';
import 'boxicons';
import {f,quoteGen} from './functions/headerFunctions.js';

//Header

//dark light mode toggle
const toggle = document.getElementById('toggleDark');
toggle.addEventListener('click',f);

//Quote Generator
quoteGen()

//Control
let inbox = [];

let taskObj = (TaskName,Description,DueDate,Priority,status)=>{
    return{TaskName,Description,DueDate,Priority,status};
};

let addTask = (task)=>{
    let taskName = document.getElementById('Task-Name');
    let desc = document.getElementById('desc');
    let due = document.getElementById('due');
    let priority = document.getElementById('priorities');
    let taskDiv = document.createElement('div');

}
let add = document.querySelector('.add')
let form = document.getElementById('popup-form')
add.addEventListener('click',()=>{
    add.style.display='none';
    form.style.display='flex';
})
let cancel = document.getElementById('cancel')
cancel.addEventListener('click',()=>{
    add.style.display='flex';
    form.style.display='none';
    
})
let submit = document.getElementById('submit')
submit.addEventListener('click',(e)=>{
    e.preventDefault()
    
    let taskName = document.getElementById('Task-Name');
    let desc = document.getElementById('desc');
    let due = document.getElementById('due');
    let priority = document.getElementById('priorities');

    if(!taskName||!due||!priority){
        alert("Ensure you fill in all fields");
    }
    else{
        let task = taskObj(taskName.value,desc.value,due.value,priority.value,"incomplete");
        inbox.push(task);
        console.log(inbox);
        taskName.value = "";
        desc.value = "";
        due.value="";
        priority.value="";
        form.style.display='none';
        add.style.display='flex';
    }
})
let check = document.querySelector('.check');
check.addEventListener('click',(e)=>{
    console.log(e.target.parentElement.parentElement)
    e.target.parentElement.parentElement.style.display='none';
})