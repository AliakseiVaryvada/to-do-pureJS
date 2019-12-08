/*
FLAWS:
    -save button does not always work the first time
    -local storage does not work with completed tasks
*/

var todoList = document.querySelector(".to-do-list"); // all task list
var completedList = document.querySelector(".completed-list"); // completed tasks list
var add = document.querySelector(".add-task"); // btn add task
var editPriority = document.querySelector(".select-priority") //priority selector
var filterHigh = document.getElementById('filter-high'); //filter for high priority tasks
var filterMedium = document.getElementById('filter-medium'); //filter for medium priority tasks
var filterLow = document.getElementById('filter-low'); //filter for low priority tasks
var filterFull = document.getElementById('filter-full'); //display full tasks table
var lToHSort = document.getElementById('h-l-sort'); //sort by time(from high to low)
var hToLSort = document.getElementById('l-h-sort'); //sort by time(from low to high)
var toLine = document.getElementById('list-btn'); // set task placement in line
var toTile = document.getElementById('tile-btn'); // set task placement in tile
var nightMode = document.getElementById('night-switch'); // swtch theme mode
var index = 0; // id task counter
var editId; //variable for save editable element id 

// if local storage is not empty loadin task from there
if (localStorage.length > 0) {
    buildFromLocalStorage();
}

// object task constructor for local storage
function MakeObj(index, taskTitle, taskText, taskBackground, priority, taskDate) {

    this.index = index;
    this.taskTitle = taskTitle;
    this.taskText = taskText;
    this.taskBackground = taskBackground;
    this.priority = priority;
    this.taskDate = taskDate;
    return;
}

// function for load tasks from local storage
function buildFromLocalStorage() {
    //max task index
    var count = parseInt(localStorage.getItem('last'));
    //sorting storage
    for (var i = 1; i <= count; i++) {
        console.log(JSON.parse(localStorage.getItem(i)));
        //empty obj case
        if (JSON.parse(localStorage.getItem(i)) == null) {
            continue
        }
        var savedTask = JSON.parse(localStorage.getItem(i));
        //make li element
        var addListItem = document.createElement('li');
        //set li id 
        addListItem.setAttribute("id", savedTask.index);
        //get parametrs from obj
        var taskTitle = savedTask.taskTitle;
        var taskText = savedTask.taskText;
        var priority = savedTask.priority;
        var taskDate = savedTask.taskDate;
        todoList.appendChild(addListItem);

        //add classes
        addListItem.classList.add('to-do-task');
        addListItem.classList.add('list-group-item');
        addListItem.classList.add('d-flex');
        addListItem.classList.add('w-100');
        addListItem.classList.add('mb-2');
        addListItem.classList.add('completed');

        //make HTML li element (can reduce the amount of code by queries)
        addListItem.innerHTML = '<div class="w-100 mr-2">' +
            '<div class="d-flex w-100 justify-content-between">' +
            '<h5 class="mb-1 task-title"></h5>' +
            '<div class="hide-prior-date">' +
            '<small class="mr-2 priority">' + priority + '</small>' +
            '<small class="task-date">' + taskDate + '</small>' +
            '</div>' +
            '<div class="dropdown hide-select-priority select-priority">' +
            '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="dropdown" aria-haspopup="true" ' +
            'aria-expanded="false">' +
            '<small>Select priority</small></button>' +
            '</button>' +
            '<ul class="dropdown-menu dropdown-menu-priority">' +
            '<li class="dropdown-input"><label><input class="edit-high" id="edit-high" type="radio" value="High" ' +
            'name="Priority"> High Priority' +
            '</label></li>' +
            '<li class="dropdown-input"><label><input class="edit-medium" id="edit-medium" type="radio" value="Medium" ' +
            'name="Priority"> Medium Priority' +
            '</label></li>' +
            '<li class="dropdown-input"><label><input class="edit-low" id="edit-low" type="radio" value="Low" ' +
            'name="Priority">Low Priority' +
            ' </label></li>' +
            '</ul>' +
            '</div>' +
            '<div class="dropdown custom-background-color">' +
            '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="dropdown" aria-haspopup="true" ' +
            'aria-expanded="false">' +
            '<small>Select Color</small></button>' +
            '</button>' +
            '<div class="dropdown-menu">' +
            '<input type="color" class="form-control mr-2 color-picker" id="taskBackgroundEdit" name="taskBackgroundEdit" ' +
            'value="#CBF7BC">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="mb-1 w-100 task-text"></p>' +
            '</div>' +
            '<div class="dropdown m-2 dropleft">' +
            '<button class=" btn btn-success h-100 save-after-edit" id= "save">' +
            '<p class="save-text">SAVE</p>' +
            '</button>' +
            '<button class="btn btn-secondary h-100 hide-dropdown" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<i class="fas fa-ellipsis-v"></i>' +
            '</button>' +
            '<div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">' +
            '<button type="button" class="btn btn-success w-100 task-complete">Complete</button>' +
            '<button type="button" class="btn btn-info w-100 my-2 task-edit">Edit</button>' +
            '<button type="button" class="btn btn-danger w-100 remove">Delete</button>' +
            '</div>' +
            '</div>';
        // set title and text value
        addListItem.querySelector('.task-title').appendChild(document.createTextNode(taskTitle));
        taskTitle.value = '';
        addListItem.querySelector('.task-text').appendChild(document.createTextNode(taskText));
        taskText.value = '';
        //set b-color from obj
        document.getElementById(i).style.background = savedTask.taskBackground;
        index = savedTask.index++;

    }
    // get lists length
    countCurrentTasks();
    countCompletedTasks();
}

// counter actualy tasks quantity
function countCurrentTasks() {
    tasks = (document.getElementById('currentTasks').getElementsByTagName('li').length) / 4;
    document.getElementById('current-tasks-title').innerHTML =
        '<h3 class="my-2" id="current-tasks-title">ToDo (' + tasks + ')</h3>'
    return tasks;
}

// counter tasks quantity
function countCompletedTasks() {
    tasks = (document.getElementById('completedTasks').getElementsByTagName('li').length) / 4;
    document.getElementById('completed-tasks-title').innerHTML =
        '<h3 class="my-2" id="completed-tasks-title">Comleted (' + tasks + ')</h3>'
    return tasks;
}

//filter function
function filterTasksByPriority(priority) {
    //get all li items from html
    allTasks = document.getElementsByTagName('li').length;
    li = document.getElementsByTagName('li');
    //set full tasks table
    for (i = 0; i < allTasks; i = i + 4) {
        li[i].classList.add('d-flex');
    }
    //low case
    if (priority === 'Low Priority') {
        for (i = 0; i < allTasks; i = i + 4) {
            //get priority
            var filterPriority = li[i].querySelector('.priority').innerText;
            console.log(filterPriority)
                //find our case
            if (filterPriority != 'Low Priority') {
                //hide other elements
                li[i].classList.remove('d-flex');
                li[i].style.display = 'none';
            }
        }
        //medium case
    } else if (priority === 'Medium Priority') {
        for (i = 0; i < allTasks; i = i + 4) {
            var filterPriority = li[i].querySelector('.priority').innerHTML;
            console.log(filterPriority)
            if (filterPriority != 'Medium Priority') {
                li[i].classList.remove('d-flex');
                li[i].style.display = 'none';
            }
        }
        //low case
    } else if (priority === 'High Priority') {
        console.log(allTasks);
        for (i = 0; i < allTasks; i = i + 4) {
            console.log(i + 'sd');
            var filterPriority = li[i].querySelector('.priority').innerHTML;
            console.log(filterPriority)
            if (filterPriority != 'High Priority') {
                li[i].classList.remove('d-flex');
                li[i].style.display = 'none';
            }
        }
    }
}

//edit styles for night mode
nightMode.addEventListener("click", function(event) {
    if (nightMode.checked == true) { //enter in night mode
        document.getElementsByClassName('wrapper')[0].style.background = '#163453f2';
        document.getElementsByClassName('wrapper')[0].style.margin = '0px';
        document.getElementsByClassName('modal-body')[0].style.background = '#163453f2';
        document.getElementsByClassName('modal-header')[0].style.background = '#163453f2';
        document.getElementsByClassName('modal-body')[0].style.color = '#b0deff';
        document.getElementsByClassName('modal-header')[0].style.color = '#b0deff';
        document.querySelectorAll('.bg-light')[0].classList.remove('bg-light');
        document.getElementsByClassName('navbar')[0].style.background = '#163453f2';
        document.getElementsByClassName('navbar')[0].style.color = '#b0deff';
        document.querySelectorAll('h3')[0].style.color = '#b0deff';
        document.querySelectorAll('h3')[1].style.color = '#b0deff';
        document.querySelectorAll('h3')[2].style.color = '#b0deff';
        document.querySelectorAll('h3')[3].style.color = '#b0deff';
    }
    if (nightMode.checked == false) { // exit
        document.getElementsByClassName('wrapper')[0].style.background = 'white';
        document.getElementsByClassName('wrapper')[0].style.margin = '15px';
        document.getElementsByClassName('modal-body')[0].style.background = 'white';
        document.getElementsByClassName('modal-header')[0].style.background = 'white';
        document.getElementsByClassName('modal-body')[0].style.color = 'black';
        document.getElementsByClassName('modal-header')[0].style.color = 'black';
        document.querySelectorAll('.navbar')[0].classList.add('bg-light');
        document.getElementsByClassName('navbar')[0].style.background = 'white';
        document.getElementsByClassName('navbar')[0].style.color = 'black';
        document.querySelectorAll('h3')[0].style.color = 'black';
        document.querySelectorAll('h3')[1].style.color = 'black';
        document.querySelectorAll('h3')[2].style.color = 'black';
        document.querySelectorAll('h3')[3].style.color = 'black';
    }
});

//line task mode, change styles for every task amd task container
toLine.addEventListener("click", function(event) {
    var block = document.querySelectorAll("li.d-flex");

    document.getElementById('currentTasks').style.flexDirection = 'column';
    document.getElementById('completedTasks').style.flexDirection = 'column';

    for (i = 0; i < block.length; i++) {
        document.querySelectorAll("li.d-flex")[i].classList.add('w-100');
        document.querySelectorAll("li.d-flex")[i].style.width = '100%';
        document.querySelectorAll("li.d-flex")[i].style.justifyContent = 'space-between';
        document.querySelectorAll(".task-text")[i].style.display = '';
    }
});

//tile task mode, change styles for every task amd task container
toTile.addEventListener("click", function(event) {
    var block = document.querySelectorAll("li.d-flex");

    document.getElementById('currentTasks').style.flexDirection = 'row';
    document.getElementById('completedTasks').style.flexDirection = 'row';

    for (i = 0; i < block.length; i++) {
        document.querySelectorAll("li.d-flex")[i].classList.remove('w-100');
        document.querySelectorAll("li.d-flex")[i].style.width = '30%';
        document.querySelectorAll("li.d-flex")[i].style.justifyContent = 'space-between';
        document.querySelectorAll(".task-text")[i].style.display = 'none';
    }
});

// event for filter function
filterHigh.addEventListener("click", function(event) {

    filterTasksByPriority('High Priority');
});

// event for filter function
filterMedium.addEventListener("click", function(event) {

    filterTasksByPriority('Medium Priority');
});

// event for filter function
filterLow.addEventListener("click", function(event) {

    filterTasksByPriority('Low Priority');
});

// event for full task table 
filterFull.addEventListener("click", function(event) {
    allTasks = document.getElementsByTagName('li').length;
    li = document.getElementsByTagName('li');
    for (i = 0; i < allTasks; i = i + 4) {
        li[i].classList.add('d-flex');
    }
});

//task sort by date (using moment.js)
hToLSort.addEventListener("click", function(event) {
    var list = document.getElementsByClassName('to-do-task');
    var container = document.getElementById('currentTasks');
    var tasks = Array.prototype.slice.call(list);
    tasks.sort(function(a, b) {
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() >
            moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return 1;
        }
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() <
            moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return -1;
        }
        return 0;
    })
    for (var i = 0; i < tasks.length; i++) {
        container.appendChild(tasks[i]);
    }
});

//task sort by date (using moment.js)
lToHSort.addEventListener("click", function(event) {
    var list = document.getElementsByClassName('to-do-task');
    var container = document.getElementById('currentTasks');
    var tasks = Array.prototype.slice.call(list);
    tasks.sort(function(a, b) {
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() <
            moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return 1;
        }
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() >
            moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return -1;
        }
        return 0;
    })
    for (var i = 0; i < tasks.length; i++) {
        container.appendChild(tasks[i]);
    }
});


todoList.addEventListener("click", function(event) {

    // remove case
    if (event.target.matches('.remove')) {
        var nearestTask = event.target.closest('li');
        //delete from localStorage and list
        localStorage.removeItem(nearestTask.id);
        event.target.closest('li').remove()

        countCurrentTasks();
        countCompletedTasks();

        //complete case
    } else if (event.target.matches('.task-complete')) {

        //get nearlest element
        var nearestTask = event.target.closest('li');
        var element = document.getElementById(nearestTask.id);

        //set style for completed list
        nearestTask.querySelector('.task-edit').style.display = 'none';
        nearestTask.querySelector('.remove').classList.add('my-2');
        nearestTask.querySelector('.task-complete').innerHTML = "Return in To Do"

        completedList.appendChild(nearestTask);

        nearestTask.classList.remove('completed');
        //delete completed task from localStorage
        localStorage.removeItem(nearestTask.id);

        countCurrentTasks();
        countCompletedTasks();

        //edit case
    } else if (event.target.matches('.task-edit')) {

        var editListItem = event.target.closest('li');
        var element = document.getElementById(editListItem.id);

        //set edit mode, add styles
        element.querySelector('.task-title').setAttribute('contenteditable', 'true');
        element.querySelector('.task-text').setAttribute('contenteditable', 'true');

        element.querySelector('.hide-dropdown').style.display = 'none';
        element.querySelector('.save-after-edit').style.display = 'block';

        element.querySelector('.hide-prior-date').style.display = 'none';
        element.querySelector('.hide-select-priority').style.display = 'block';
        element.querySelector('.custom-background-color').style.display = 'block';

        element.querySelector('.task-title').classList.add('edit-change-color');
        element.querySelector('.task-text').classList.add('edit-change-color');

        // fix id for edit element
        editId = element.id;
        console.log(editId + 'old');

        // press save button case
    } else if (event.target.matches('.save-after-edit')) {

        var element = document.getElementById(editId);

        //add colorpicker and set bg color
        var taskBackgroundEdit = element.getElementsByClassName('color-picker')[0];
        element.style.background = taskBackgroundEdit.value;

        //add dropdown priority selector and set priority
        var lowPriority = element.getElementsByClassName('edit-low')[0]; //берем приоритет
        var mediumPriority = element.getElementsByClassName('edit-medium')[0];
        var highPriority = element.getElementsByClassName('edit-high')[0];

        var priority = '';

        lowPriority.checked ? priority = 'Low Priority' :
            (mediumPriority.checked ? priority = 'Medium Priority' :
                (highPriority.checked ? priority = 'High Priority' :
                    priority = element.getElementsByClassName('priority')[0].innerHTML));

        let obj = new MakeObj(element.id,
            element.querySelector('.task-title').innerHTML,
            element.querySelector('.task-text').innerHTML,
            window.getComputedStyle(document.getElementById(element.id), null).backgroundColor,
            element.querySelector('.priority').innerHTML,
            element.querySelector('.task-date').innerHTML);

        localStorage.setItem(element.id, JSON.stringify(obj));
        console.log(obj);
        console.log(priority);



        //return style to normal mode
        element.querySelector('.priority').innerHTML = priority;

        element.querySelector('.task-title').setAttribute('contenteditable', 'false');
        element.querySelector('.task-text').setAttribute('contenteditable', 'false');
        element.querySelector('.hide-dropdown').style.display = 'block';
        element.querySelector('.save-after-edit').style.display = 'none';

        element.querySelector('.hide-prior-date').style.display = 'block';
        element.querySelector('.hide-select-priority').style.display = 'none';
        element.querySelector('.custom-background-color').style.display = 'none';

        element.querySelector('.task-title').classList.remove('edit-change-color');
        element.querySelector('.task-text').classList.remove('edit-change-color');

    }
});

// event for move task in complete list
completedList.addEventListener("click", function(event) {
    if (event.target.matches('.remove')) {
        var nearestTask = event.target.closest('li');
        //delete from localStorage and list
        event.target.closest('li').remove()

        countCurrentTasks();
        countCompletedTasks();
    } else if (event.target.matches('.task-complete')) {

        // get element
        var nearestTask = event.target.closest('li');
        var element = document.getElementById(nearestTask.id);

        //change style right drop menu
        nearestTask.querySelector('.task-edit').style.display = 'block';
        nearestTask.querySelector('.remove').classList.remove('my-2');
        nearestTask.querySelector('.task-complete').innerHTML = "Complete"

        //add to local storage element from completed tasks
        let obj = new MakeObj(nearestTask.id,
            element.querySelector('.task-title').innerHTML,
            element.querySelector('.task-text').innerHTML,
            window.getComputedStyle(document.getElementById(nearestTask.id), null).backgroundColor,
            element.querySelector('.priority').innerHTML,
            element.querySelector('.task-date').innerHTML);

        localStorage.setItem(nearestTask.id, JSON.stringify(obj));
        nearestTask.classList.add('completed');
        todoList.appendChild(nearestTask);

        countCurrentTasks();
        countCompletedTasks();
    }
});

//add element function
add.addEventListener("click", function(e) {
    //off browser submit
    event.preventDefault();
    //inc id
    index = index + 1;
    //add new item in list
    var addListItem = document.createElement('li');
    addListItem.setAttribute("id", index);
    //get title from form
    var taskTitle = document.getElementById('inputTitle');
    //empty title input case 
    if (taskTitle.value == '') {
        alert('Please, enter title!!');
        return;
    }
    //get other elements from form
    var taskText = document.getElementById('inputText');
    if (taskText.value == '') {
        alert('Please, enter description!!');
        return;
    }
    var taskBackground = document.getElementById('taskBackground');
    var lowPriority = document.getElementById('Low')
    var mediumPriority = document.getElementById('Medium')
    var highPriority = document.getElementById('High')

    var priority = '';

    lowPriority.checked ? priority = 'Low Priority' :
        (mediumPriority.checked ? priority = 'Medium Priority' :
            (highPriority.checked ? priority = 'High Priority' : null));

    //set date(use moment.js)
    var taskDate = moment().format('HH:mm MM-DD-YYYY');

    todoList.appendChild(addListItem);

    //add classes
    addListItem.classList.add('to-do-task');
    addListItem.classList.add('list-group-item');
    addListItem.classList.add('d-flex');
    addListItem.classList.add('w-100');
    addListItem.classList.add('mb-2');
    addListItem.classList.add('completed');

    //make HTML li element (can reduce the amount of code by queries)
    addListItem.innerHTML = '<div class="w-100 mr-2">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1 task-title"></h5>' +
        '<div class="hide-prior-date">' +
        '<small class="mr-2 priority">' + priority + '</small>' +
        '<small class="task-date">' + taskDate + '</small>' +
        '</div>' +
        '<div class="dropdown hide-select-priority select-priority">' +
        '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="dropdown" ' +
        'aria-haspopup="true" aria-expanded="false">' +
        '<small>Select priority</small></button>' +
        '</button>' +
        '<ul class="dropdown-menu dropdown-menu-priority">' +
        '<li class="dropdown-input"><label><input class="edit-high" id="edit-high" type="radio" ' +
        'value="High" name="Priority"> High Priority' +
        '</label></li>' +
        '<li class="dropdown-input"><label><input class="edit-medium" id="edit-medium" type="radio" ' +
        'value="Medium" name="Priority"> Medium Priority' +
        '</label></li>' +
        '<li class="dropdown-input"><label><input class="edit-low" id="edit-low" type="radio" ' +
        'value="Low" name="Priority">Low Priority' +
        ' </label></li>' +
        '</ul>' +
        '</div>' +
        '<div class="dropdown custom-background-color">' +
        '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="dropdown" aria-haspopup="true" ' +
        'aria-expanded="false">' +
        '<small>Select Color</small></button>' +
        '</button>' +
        '<div class="dropdown-menu">' +
        '<input type="color" class="form-control mr-2 color-picker" id="taskBackgroundEdit" name="taskBackgroundEdit" ' +
        'value="#CBF7BC">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<p class="mb-1 w-100 task-text"></p>' +
        '</div>' +
        '<div class="dropdown m-2 dropleft">' +
        '<button class=" btn btn-success h-100 save-after-edit" id= "save">' +
        '<p class="save-text">SAVE</p>' +
        '</button>' +
        '<button class="btn btn-secondary h-100 hide-dropdown" type="button" id="dropdownMenuItem1" data-toggle="dropdown" ' +
        'aria-haspopup="true" aria-expanded="false">' +
        '<i class="fas fa-ellipsis-v"></i>' +
        '</button>' +
        '<div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">' +
        '<button type="button" class="btn btn-success w-100 task-complete">Complete</button>' +
        '<button type="button" class="btn btn-info w-100 my-2 task-edit">Edit</button>' +
        '<button type="button" class="btn btn-danger w-100 remove">Delete</button>' +
        '</div>' +
        '</div>';

    //make obj for local storage
    let obj = new MakeObj(index, taskTitle.value, taskText.value, taskBackground.value, priority, taskDate);
    localStorage.setItem(index, JSON.stringify(obj));
    localStorage.setItem('last', index);

    //add text an title value
    addListItem.querySelector('.task-title').appendChild(document.createTextNode(taskTitle.value));
    taskTitle.value = '';
    addListItem.querySelector('.task-text').appendChild(document.createTextNode(taskText.value));
    taskText.value = '';

    //set background 
    document.getElementById(index).style.background = taskBackground.value;

    countCurrentTasks();
    countCompletedTasks();
});