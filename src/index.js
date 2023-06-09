import './style.css';
import 'boxicons';
import {f,quoteGen} from './functions/headerFunctions.js';
import { getArr,storeArr } from './functions/storageFunctions';


//create Projects
function projectObj(projectName,taskArray){
    this.projectName = projectName;
    this.taskArray = taskArray || [];
}
//Header

//dark light mode toggle
const toggle = document.getElementById('toggleDark');
toggle.addEventListener('click',f);

//Quote Generator
quoteGen()

//Control



//Inbox
let inbox;
if(localStorage.getItem('inbox')){
    inbox = getArr('inbox');
}
else{
    inbox = [];
}


//Project List
let projectList;
if(localStorage.getItem('projectList')){
    projectList = getArr('projectList');
}
else{
    projectList = [];
}


//Tasks
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
        taskDiv.setAttribute('id',`task-${index}`)
        tasks.appendChild(taskDiv);

        taskDiv.innerHTML =
        `<div class="task" id="innerTask-${index}">
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

        let taskInner = document.getElementById(`innerTask-${index}`)
        if(taskPriority == 'P1'){
            taskInner.style.border = '2px solid red'
        }
        else if(taskPriority == 'P2'){
            taskInner.style.border = '2px solid #fa592f'
        }
        else if(taskPriority == 'P3'){
            taskInner.style.border = '2px solid blue'
        }

        //Add checkBox to each taskDiv to remove it on click
        let checkBox = document.getElementById(`${i}`);
        checkBox.addEventListener('click',(e)=>{
            console.log(e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.style.display='none';
            array.splice(array.indexOf(e.target.parentElement.parentElement.parentElement),1)
            storeArr('projectList',projectList);
            storeArr('inbox',inbox);
        })

        //Add edit to boxicon
        let edit = document.getElementById(`edit-${index}`);
        edit.addEventListener('click',(e)=>{
            //e.target.parentElement.parentElement.parentElement.style.display='none';
            let formIndex = parseInt(e.target.id.split('-')[1]);
            let editForm = document.getElementById(`form-${formIndex}`);
            console.log(editForm);
            let taskDiv = e.target.parentElement.parentElement;
            taskDiv.style.display = 'none';
            editForm.style.display = 'flex';
            document.getElementById(`Task-Name-e-${index}`).value = task.TaskName;
            document.getElementById(`desc-e-${index}`).value = task.Description;
            document.getElementById(`due-e-${index}`).value = task.DueDate;
            document.getElementById(`priorities-e-${index}`).value = task.Priority;

            //Submit Button in Edit-Form
            document.getElementById(`submit-e-${index}`).addEventListener('click',(e)=>{
                e.preventDefault();
                task.TaskName = document.getElementById(`Task-Name-e-${index}`).value ;
                task.Description = document.getElementById(`desc-e-${index}`).value;
                task.DueDate = document.getElementById(`due-e-${index}`).value;
                task.Priority = document.getElementById(`priorities-e-${index}`).value;
                taskFill(array);
                storeArr('inbox',inbox);
                storeArr('projectList',projectList);
                console.log(array);
            })

            //Cancel Button in Edit-Form
            document.getElementById(`cancel-e-${index}`).addEventListener('click',(e)=>{
                e.preventDefault();
                let taskName = document.getElementById('Task-Name');
                let desc = document.getElementById('desc');
                let due = document.getElementById('due');
                let priority = document.getElementById('priorities');
                taskName.value = "";
                desc.value = "";
                due.value = "";
                priority.value = "";
                editForm.style.display='none';
                taskDiv.style.display = 'flex';
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
cancel.addEventListener('click',(e)=>{
    e.preventDefault();
    let taskName = document.getElementById('Task-Name');
    let desc = document.getElementById('desc');
    let due = document.getElementById('due');
    let priority = document.getElementById('priorities');
    taskName.value = "";
    desc.value = "";
    due.value = "";
    priority.value = "";
    add.style.display='flex';
    form.style.display='none';
})

//default project open is inbox
let submit = document.getElementById('submit');
submit.addEventListener('click',(e)=>{
    e.preventDefault()
    let taskName = document.getElementById('Task-Name');
    let desc = document.getElementById('desc');
    let due = document.getElementById('due');
    let priority = document.getElementById('priorities');
    if(!taskName.value){
        alert("Ensure you fill in taskName");
    }
    else{
        let task = taskObj(taskName.value,desc.value,due.value,priority.value,"incomplete");
        inbox.push(task);
        
        taskFill(inbox);
        storeArr('inbox',inbox);
        console.log(inbox);
        taskName.value = "";
        desc.value = "";
        due.value="";
        priority.value="";
        form.style.display='none';
        add.style.display='flex';
        
    }
})
taskFill(inbox);

document.querySelector('.inbox').addEventListener('click',()=>{
    taskFill(inbox);
    let submit = document.getElementById('submit');
    let newSubmit = submit.cloneNode(true);
    submit.parentNode.replaceChild(newSubmit, submit);
    submit = newSubmit;
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        let taskName = document.getElementById('Task-Name');
        let desc = document.getElementById('desc');
        let due = document.getElementById('due');
        let priority = document.getElementById('priorities');
        if(!taskName.value){
            alert("Ensure you fill in taskName");
        }
        else{
            let task = taskObj(taskName.value,desc.value,due.value,priority.value,"incomplete");
            inbox.push(task);
            
            taskFill(inbox);
            storeArr('inbox',inbox);
            console.log(inbox);
            taskName.value = "";
            desc.value = "";
            due.value="";
            priority.value="";
            form.style.display='none';
            add.style.display='flex';
        }
    })
})
//Handle Projects

document.getElementById('addProject').addEventListener('click',()=>{
    document.getElementById('projectAddForm').style.display='flex';
})
document.getElementById('cancelProject').addEventListener('click',()=>{
    document.getElementById('projectAddForm').style.display='none';
})
document.getElementById('submitProject').addEventListener('click',()=>{
    let projectName = document.getElementById('projectName').value;
    if(projectName==""){
        alert('Enter Project Name to submit');
    }
    else{
        let project = new projectObj(projectName);
        projectList.push(project);
        projectFill(projectList);
        storeArr('projectList',projectList);
        document.getElementById('projectName').value = "";
        document.getElementById('projectAddForm').style.display='none';
    }
})


//Fill projects in Dom

const projectFill = (array)=>{
    let projectBay = document.querySelector('.project-bay');
    projectBay.innerHTML = '';
    for(let i = 0; i<array.length; i++){
        //Add project Html
        let project = array[i];
        let projectName = project.projectName;
        let taskArray = project.taskArray;
        let projectDiv = document.createElement('div')
        projectDiv.classList.add('projectBox')
        projectBay.appendChild(projectDiv);
        projectDiv.setAttribute('id',`project-${i}`)
        projectDiv.innerHTML =
        `<span class = 'delProj' id=delete-${i}><i class="bi bi-x-circle-fill"></i></span>
        <span>${projectName}</span>
        <span id='projectNo-${i}' style='font-size: 20px; color:grey'>${taskArray.length} tasks remaining</span>`

        projectDiv.addEventListener('click',()=>{
            taskFill(taskArray);
            document.getElementById(`projectNo-${i}`).innerText = `${taskArray.length} tasks remaining`
            //Cloning and replacing submit with clone so that the eventListener gets removed
            let submit = document.getElementById('submit');
            let newSubmit = submit.cloneNode(true);
            submit.parentNode.replaceChild(newSubmit, submit);
            submit = newSubmit;
            submit.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(taskArray);
                let taskName = document.getElementById('Task-Name');
                let desc = document.getElementById('desc');
                let due = document.getElementById('due');
                let priority = document.getElementById('priorities');
                if (!taskName.value) {
                  alert("taskName where");
                }
                else {
                  let task = taskObj(taskName.value, desc.value, due.value, priority.value, "incomplete");
                  taskArray.push(task);
                  document.getElementById(`projectNo-${i}`).innerText = `${taskArray.length} tasks remaining`
                  taskFill(taskArray);
                  console.log(taskArray);
                  storeArr('projectList',projectList);
                  taskName.value = "";
                  desc.value = "";
                  due.value = "";
                  priority.value = "";
                  form.style.display = 'none';
                  add.style.display = 'flex';
                }
            });
        })
        document.getElementById(`delete-${i}`).addEventListener('click',(e)=>{
            
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.style.display = 'none';
            const index = parseInt(e.target.parentElement.id.split('-')[1]);
            console.log(index);
            projectList.splice(index,1)
            console.log(projectList);
            storeArr('projectList',projectList);
        })
    }
}

projectFill(projectList);

