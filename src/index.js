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
let i = 0;
let addTask = (task)=>{
    // let taskName = document.getElementById('Task-Name');
    // let desc = document.getElementById('desc');
    // let due = document.getElementById('due');
    let priority = document.getElementById('priorities');
    let tasks = document.querySelector('.tasks');
    let taskDiv = document.createElement('div');
    taskDiv.setAttribute('id',`${task.TaskName}`)
    tasks.appendChild(taskDiv)
    taskDiv.classList.add('task');
    let background = ''
    if(priority.value == 'P1'){
        background = '#f75b2b';
    }
    else if(priority.value == 'P2'){
        background = '#fdbe0e';
    }
    else if(priority.value == 'P3'){
        background = '#1747e7';
    }
    let task_details = `<div style="display: flex; align-items: center;">
                        <div id = "task-${i}" class="check"></div>
                        <div class="desc">${task.TaskName}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <div class="due-date">${task.DueDate}</div>
                        <box-icon type='solid' name='edit' style="height: 28px; width: auto; opacity: 50%;"></box-icon>
                    </div>`
    
    taskDiv.insertAdjacentHTML('beforeend',task_details);
    taskDiv.style.backgroundColor= background;
    let checkBox = document.getElementById(`task-${i}`);
    checkBox.addEventListener('click',(e)=>{
        e.target.parentElement.parentElement.style.display = 'none';
        inbox = inbox.splice(inbox.indexOf(task.TaskName),1);
    });
    console.log(inbox);
    i++;
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

    if(!taskName.value||!due.value||!priority.value){
        alert("Ensure you fill in all fields");
    }
    else{
        let task = taskObj(taskName.value,desc.value,due.value,priority.value,"incomplete");
        inbox.push(task);
        addTask(task);
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