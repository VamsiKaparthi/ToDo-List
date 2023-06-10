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
let empty = [];
let taskObj = (TaskName,Description,DueDate,Priority,status)=>{
    return{TaskName,Description,DueDate,Priority,status};
};



//taskFill-> Will monitor the project Array constantly for changes

function taskFill(array){
    const tasks = document.querySelector('.tasks');
    //clear innerHtml to avoid duplicating tasks
    tasks.innerHTML=``
    let i = 0;
    for (let index = 0; index < array.length; index++) {
        let task = array[index]
        let taskName = task.TaskName;
        let taskDesc = task.Description;
        let taskDue = task.DueDate;
        let taskPriority = task.Priority;
        let taskStatus = task.status;
    
        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task-structure');
        
        tasks.appendChild(taskDiv);
    
        taskDiv.innerHTML = 
        `<div class="task">
            <div style="display: flex; align-items: center;">
                <div class="check" id='${i}'></div>
                <div class="desc">${taskName}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
                <div class="due-date">${taskDue}</div>
                <box-icon type='solid' name='edit' id='edit-${i}' style="height: 28px; width: auto;"></box-icon>
            </div>
        </div>
        </div>
        <form class="edit" id="form-${index}">
            <fieldset>
                <div>
                    <label for="Task-Name-e-${index}"></label>
                    <input type="text" id="Task-Name-e-${index}" placeholder="Task Name" style="font-size: max(16px,1vw);">
                </div>
                <div>
                    <label for="desc-e-${index}"></label>
                    <input type="text" id="desc-e-${index}" placeholder="Description" style=" height: 25px; font-size: max(15px,0.9vw); margin-bottom: 10px;">
                </div>
                <div class="features">
                    <div>
                        <label for="due-e-${index}"></label>
                        <input type="text" id="due-e-${index}" style="width: 90px;" placeholder="Due Date" onfocus="(this.type ='date')" onblur="this.type='text'">
                    </div>
                    <div>
                        <label for="priorities-e-${index}" ></label>
                        <input list="priority-${index}" id="priorities-e-${index}" placeholder="Priority" style="width: 90px; text-align: center;">
                        <datalist id="priority-${index}">
                            <option value="P1">
                            <option value="P2">
                            <option value="P3">
                        </datalist>
                    </div>
                </div>
                <div class="options">
                    <button type="submit" id="submit-e-${index}" style="background-color: #f86234;">Add Task</button>
                    <button type="reset" style="background-color: #04c4ad;">Reset</button>
                    <button id="cancel-e-${index}" style="background-color: #ee9694;">Cancel</button>
                </div>
            </fieldset>
        </form>`


        //Add checkBox to each taskDiv to remove it on click
        let checkBox = document.getElementById(`${i}`);
        checkBox.addEventListener('click',(e)=>{
            console.log(e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.style.display='none';
            array.splice(array.indexOf(e.target.parentElement.parentElement.parentElement),1)
        })

        //Add edit to boxicon
        let edit = document.getElementById(`edit-${index}`);
        edit.addEventListener('click',(e)=>{
            //e.target.parentElement.parentElement.parentElement.style.display='none';
            let formIndex = parseInt(e.target.id.split('-')[1]);
            let editForm = document.getElementById(`form-${formIndex}`);
            console.log(editForm);
            e.target.parentElement.parentElement.style.display='none';
            editForm.style.display = 'flex';
            document.getElementById(`Task-Name-e-${index}`).value = task.TaskName;
            document.getElementById(`desc-e-${index}`).value = task.Description;
            document.getElementById(`due-e-${index}`).value = task.DueDate;
            document.getElementById(`priorities-e-${index}`).value = task.Priority;

            //Submit button in form
            document.getElementById(`submit-e-${index}`).addEventListener('click',(e)=>{
                e.preventDefault();
                task.TaskName = document.getElementById(`Task-Name-e-${index}`).value ;
                task.Description = document.getElementById(`desc-e-${index}`).value;
                task.DueDate = document.getElementById(`due-e-${index}`).value;
                task.Priority = document.getElementById(`priorities-e-${index}`).value;
                taskFill(inbox);
                console.log(inbox);
            })
        })
        i++;
    }
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
        //taskFill(empty);
        taskFill(inbox);
        console.log(inbox);
        taskName.value = "";
        desc.value = "";
        due.value="";
        priority.value="";
        form.style.display='none';
        add.style.display='flex';
    }
})

