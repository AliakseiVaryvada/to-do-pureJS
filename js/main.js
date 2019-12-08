var todoList = document.querySelector(".to-do-list"); // весь список тасков 
var completedList = document.querySelector(".completed-list"); // весь список тасков выполненных
//var todoTask = document.querySelector("li.to-do-task"); // каждый отдельный таск
var add = document.querySelector(".add-task"); // кнопка добавить таск
var editPriority = document.querySelector(".select-priority")
var filterHigh = document.getElementById('filter-high');
var filterMedium = document.getElementById('filter-medium');
var filterLow = document.getElementById('filter-low');
var filterFull = document.getElementById('filter-full');
var lToHSort = document.getElementById('h-l-sort');
var hToLSort = document.getElementById('l-h-sort');

var toLine = document.getElementById('list-btn');
var toTile = document.getElementById('tile-btn');

var nightMode = document.getElementById('night-switch');


var index = 0;
var editId;



function countCurrentTasks() {
    tasks = (document.getElementById('currentTasks').getElementsByTagName('li').length) / 4;
    document.getElementById('current-tasks-title').innerHTML =
        '<h3 class="my-2" id="current-tasks-title">ToDo (' + tasks + ')</h3>'
    return tasks;
}

function countCompletedTasks() {
    tasks = (document.getElementById('completedTasks').getElementsByTagName('li').length) / 4;
    document.getElementById('completed-tasks-title').innerHTML =
        '<h3 class="my-2" id="completed-tasks-title">Comleted (' + tasks + ')</h3>'
    return tasks;
}
countCurrentTasks();
countCompletedTasks();


function filterTasksByPriority(priority) {
    allTasks = document.getElementsByTagName('li').length;
    li = document.getElementsByTagName('li');
    console.log(allTasks);
    for (i = 0; i < allTasks; i = i + 4) {
        li[i].classList.add('d-flex');

    }
    if (priority === 'Low Priority') {

        for (i = 0; i < allTasks; i = i + 4) {
            var filterPriority = li[i].querySelector('.priority').innerText;
            console.log(filterPriority)
            if (filterPriority != 'Low Priority') {
                li[i].classList.remove('d-flex');
                li[i].style.display = 'none';
            }

        }
        console.log(allTasks);
    } else if (priority === 'Medium Priority') {
        for (i = 0; i < allTasks; i = i + 4) {
            var filterPriority = li[i].querySelector('.priority').innerHTML;
            console.log(filterPriority)
            if (filterPriority != 'Medium Priority') {
                li[i].classList.remove('d-flex');
                li[i].style.display = 'none';
            }

        }
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

nightMode.addEventListener("click", function(event) {
    if (nightMode.checked == true) {
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
    if (nightMode.checked == false) {
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


toLine.addEventListener("click", function(event) {
    var block = document.querySelectorAll("li.d-flex");
    console.log(block);

    document.getElementById('currentTasks').style.flexDirection = 'column';
    document.getElementById('completedTasks').style.flexDirection = 'column';


    for (i = 0; i < block.length; i++) {
        document.querySelectorAll("li.d-flex")[i].classList.add('w-100');
        document.querySelectorAll("li.d-flex")[i].style.width = '100%';
        document.querySelectorAll("li.d-flex")[i].style.justifyContent = 'space-between';
        document.querySelectorAll(".task-text")[i].style.display = '';
    }
});

toTile.addEventListener("click", function(event) {
    var block = document.querySelectorAll("li.d-flex");
    console.log(block);

    document.getElementById('currentTasks').style.flexDirection = 'row';
    document.getElementById('completedTasks').style.flexDirection = 'row';


    for (i = 0; i < block.length; i++) {
        document.querySelectorAll("li.d-flex")[i].classList.remove('w-100');
        document.querySelectorAll("li.d-flex")[i].style.width = '30%';
        document.querySelectorAll("li.d-flex")[i].style.justifyContent = 'space-between';
        document.querySelectorAll(".task-text")[i].style.display = 'none';
    }
});


filterHigh.addEventListener("click", function(event) {

    filterTasksByPriority('High Priority');
});

filterMedium.addEventListener("click", function(event) {

    filterTasksByPriority('Medium Priority');
});

filterLow.addEventListener("click", function(event) {

    filterTasksByPriority('Low Priority');
});


filterFull.addEventListener("click", function(event) {
    allTasks = document.getElementsByTagName('li').length;
    li = document.getElementsByTagName('li');
    for (i = 0; i < allTasks; i = i + 4) {
        li[i].classList.add('d-flex');

    }
});


hToLSort.addEventListener("click", function(event) {
    var list = document.getElementsByClassName('to-do-task');
    var container = document.getElementById('currentTasks');
    var tasks = Array.prototype.slice.call(list);
    tasks.sort(function(a, b) {
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() > moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return 1;
        }
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() < moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return -1;
        }
        return 0;
    })
    for (var i = 0; i < tasks.length; i++) {
        container.appendChild(tasks[i]);
    }
});



lToHSort.addEventListener("click", function(event) {
    var list = document.getElementsByClassName('to-do-task');
    var container = document.getElementById('currentTasks');
    var tasks = Array.prototype.slice.call(list);
    tasks.sort(function(a, b) {
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() < moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return 1;
        }
        if (moment(a.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate() > moment(b.querySelector('.task-date').innerHTML, 'HH:mm MM-DD-YYYY').toDate()) {
            return -1;
        }
        return 0;
    })
    for (var i = 0; i < tasks.length; i++) {
        container.appendChild(tasks[i]);
    }
});




todoList.addEventListener("click", function(event) {

    if (event.target.matches('.remove')) { //проверяем нажатие клавиши удаления
        event.target.closest('li').remove() //удаляем 
        countCurrentTasks();
        countCompletedTasks();

    } else if (event.target.matches('.task-complete')) { //кнопка выполнено?
        var nearestTask = event.target.closest('li'); //берем элемент на который произошло нажтие
        var isComplete = nearestTask.classList.contains('completed'); // проверяем есть ли у него класс выполнено
        var element = document.getElementById(nearestTask.id);

        nearestTask.querySelector('.task-edit').style.display = 'none';
        nearestTask.querySelector('.remove').classList.add('my-2');
        nearestTask.querySelector('.task-complete').innerHTML = "Return in To Do"

        completedList.appendChild(nearestTask);

        nearestTask.classList.remove('completed'); //удаляем этот класс у элемента

        if (!isComplete) { //если класса "выполнено" нет, то дописываем его и возращаем таск обратно в туду
            nearestTask.classList.add('completed');
            todoList.appendChild(nearestTask);
        }
        countCurrentTasks();
        countCompletedTasks();
    } else if (event.target.matches('.task-edit')) {


        var editListItem = event.target.closest('li'); //берем элемент списка

        var element = document.getElementById(editListItem.id);

        console.log(element);

        element.querySelector('.task-title').setAttribute('contenteditable', 'true');
        element.querySelector('.task-text').setAttribute('contenteditable', 'true');

        element.querySelector('.hide-dropdown').style.display = 'none';
        element.querySelector('.save-after-edit').style.display = 'block';

        element.querySelector('.hide-prior-date').style.display = 'none';
        element.querySelector('.hide-select-priority').style.display = 'block';
        element.querySelector('.custom-background-color').style.display = 'block';



        element.querySelector('.task-title').classList.add('edit-change-color');
        element.querySelector('.task-text').classList.add('edit-change-color');

        editId = element.id;
        console.log(editId + 'old');

        // element.querySelector('.priority')
    } else if (event.target.matches('.save-after-edit')) {
        console.log(editId);
        //var editListItem = event.target.closest('li'); //берем элемент списка
        var element = document.getElementById(editId);

        var taskBackgroundEdit = element.getElementsByClassName('color-picker')[0];
        element.style.background = taskBackgroundEdit.value;

        console.log(element.id);
        console.log(element.querySelector('.priority'));
        var lowPriority = element.getElementsByClassName('edit-low')[0]; //берем приоритет
        console.log(lowPriority);
        var mediumPriority = element.getElementsByClassName('edit-medium')[0];
        console.log(mediumPriority);
        var highPriority = element.getElementsByClassName('edit-high')[0];
        console.log(highPriority);
        var priority = '';
        console.log(priority + '!!!');

        lowPriority.checked ? priority = 'Low Priority' :
            (mediumPriority.checked ? priority = 'Medium Priority' :
                (highPriority.checked ? priority = 'High Priority' :
                    priority = element.getElementsByClassName('priority')[0].innerHTML));

        console.log(priority);

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




completedList.addEventListener("click", function(event) {
    if (event.target.matches('.task-complete')) {
        var nearestTask = event.target.closest('li');
        var element = document.getElementById(nearestTask.id);

        nearestTask.querySelector('.task-edit').style.display = 'block';
        nearestTask.querySelector('.remove').classList.remove('my-2');
        nearestTask.querySelector('.task-complete').innerHTML = "Complete"

        nearestTask.classList.add('completed');
        todoList.appendChild(nearestTask);
        countCurrentTasks();
        countCompletedTasks();
    }
});

add.addEventListener("click", function(e) {
    event.preventDefault(); //отменяем действие браузера
    index = index + 1;
    var addListItem = document.createElement('li'); //создаем элемент списка
    addListItem.setAttribute("id", index);
    var taskTitle = document.getElementById('inputTitle'); //берем из формы название
    var taskText = document.getElementById('inputText'); //берем текст из поля
    var taskBackground = document.getElementById('taskBackground');
    var lowPriority = document.getElementById('Low') //берем приоритет
    var mediumPriority = document.getElementById('Medium')
    var highPriority = document.getElementById('High')

    var priority = '';

    lowPriority.checked ? priority = 'Low Priority' :
        (mediumPriority.checked ? priority = 'Medium Priority' :
            (highPriority.checked ? priority = 'High Priority' : null));

    var taskDate = moment().format('HH:mm MM-DD-YYYY');

    todoList.appendChild(addListItem);

    addListItem.classList.add('to-do-task'); //добовляем классы к новому листу
    addListItem.classList.add('list-group-item');
    addListItem.classList.add('d-flex');
    addListItem.classList.add('w-100');
    addListItem.classList.add('mb-2');
    addListItem.classList.add('completed');


    addListItem.innerHTML = '<div class="w-100 mr-2">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1 task-title"></h5>' +
        '<div class="hide-prior-date">' +
        '<small class="mr-2 priority">' + priority + '</small>' +
        '<small class="task-date">' + taskDate + '</small>' +
        '</div>' +
        '<div class="dropdown hide-select-priority select-priority">' +
        '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<small>Select priority</small></button>' +
        '</button>' +
        '<ul class="dropdown-menu dropdown-menu-priority">' +
        '<li class="dropdown-input"><label><input class="edit-high" id="edit-high" type="radio" value="High" name="Priority"> High Priority' +
        '</label></li>' +
        '<li class="dropdown-input"><label><input class="edit-medium" id="edit-medium" type="radio" value="Medium" name="Priority"> Medium Priority' +
        '</label></li>' +
        '<li class="dropdown-input"><label><input class="edit-low" id="edit-low" type="radio" value="Low" name="Priority">Low Priority' +
        ' </label></li>' +
        '</ul>' +
        '</div>' +
        '<div class="dropdown custom-background-color">' +
        '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<small>Select Color</small></button>' +
        '</button>' +
        '<div class="dropdown-menu">' +
        '<input type="color" class="form-control mr-2 color-picker" id="taskBackgroundEdit" name="taskBackgroundEdit" value="#CBF7BC">' +
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
    addListItem.querySelector('.task-title').appendChild(document.createTextNode(taskTitle.value));
    taskTitle.value = '';
    addListItem.querySelector('.task-text').appendChild(document.createTextNode(taskText.value));
    taskTitle.value = '';
    //addListItem.querySelector('.priority').appendChild(document.createTextNode(priority));
    //taskTitle.value = '';
    //addListItem.querySelector('.task-date').appendChild(document.createTextNode(taskDate));
    //taskTitle.value = '';
    document.getElementById(index).style.background = taskBackground.value;
    countCurrentTasks();
    countCompletedTasks();
});