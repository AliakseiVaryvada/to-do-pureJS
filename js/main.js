var todoList = document.querySelector(".to-do-list"); // весь список тасков 
var completedList = document.querySelector(".completed-list"); // весь список тасков выполненных
var todoTask = document.querySelector("li.to-do-task"); // каждый отдельный таск
var add = document.querySelector(".add-task"); // кнопка добавить таск
var editPriority = document.querySelector(".select-priority")
var index = 0;

todoList.addEventListener("click", function(event) {

    if (event.target.matches('.remove')) { //проверяем нажатие клавиши удаления
        event.target.closest('li').remove() //удаляем 
    } else if (event.target.matches('.task-complete')) { //кнопка выполнено?
        var nearestTask = event.target.closest('li'); //берем элемент на который произошло нажтие
        var isComplete = nearestTask.classList.contains('completed'); // проверяем есть ли у него класс выполнено
        var element = document.getElementById(nearestTask.id);

        element.lastElementChild.innerHTML = //убераем кнопку редактировать
            '<button class=" btn btn-success h-100 save-after-edit">' +
            '<p class="save-text">SAVE</p>' +
            '</button>' +
            '<button class="btn btn-secondary h-100 hide-dropdown" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<i class="fas fa-ellipsis-v"></i>' +
            '</button>' +
            '<div class="dropdown-menu p-2 flex-column button-section" aria-labelledby="dropdownMenuItem1">' +
            '<button type="button" class="btn btn-success w-100 task-complete">Return in To Do</button>' +
            '<button type="button" class="btn btn-danger w-100  my-2  remove">Delete</button>' +
            '</div>';

        completedList.appendChild(nearestTask);

        nearestTask.classList.remove('completed'); //удаляем этот класс у элемента
        if (!isComplete) { //если класса "выполнено" нет, то дописываем его и возращаем таск обратно в туду
            nearestTask.classList.add('completed');
            todoList.appendChild(nearestTask);
        }
    } else if (event.target.matches('.task-edit')) {


        var editListItem = event.target.closest('li'); //берем элемент списка

        var element = document.getElementById(editListItem.id);

        console.log(element);

        element.querySelector('.task-title').setAttribute('contenteditable', 'true');
        element.querySelector('.task-text').setAttribute('contenteditable', 'true');
        element.querySelector('.hide-dropdown').style.display = 'none';
        element.querySelector('.save-after-edit').style.display = 'block';
        element.querySelector('.task-title').classList.add('edit-change-color');
        element.querySelector('.task-text').classList.add('edit-change-color');
        element.querySelector('.priority')

        else if (event.target.matches('edit-hight')) {
            console.log("yep")
        }



    } else if (event.target.matches('.save-after-edit')) {
        var editListItem = event.target.closest('li'); //берем элемент списка
        var element = document.getElementById(editListItem.id);
        console.log(element);
        element.querySelector('.task-title').setAttribute('contenteditable', 'false');
        element.querySelector('.task-text').setAttribute('contenteditable', 'false');
        element.querySelector('.hide-dropdown').style.display = 'block';
        element.querySelector('.save-after-edit').style.display = 'none';
        element.querySelector('.task-title').classList.remove('edit-change-color');
        element.querySelector('.task-text').classList.remove('edit-change-color');
    }
});

completedList.addEventListener("click", function(event) {
    if (event.target.matches('.task-complete')) {
        var nearestTask = event.target.closest('li');
        var element = document.getElementById(nearestTask.id);
        element.lastElementChild.innerHTML =
            '<button class=" btn btn-success h-100 save-after-edit">' +
            '<p class="save-text">SAVE</p>' +
            '</button>' +
            '<button class="btn btn-secondary h-100 hide-dropdown" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<i class="fas fa-ellipsis-v"></i>' +
            '</button>' +
            '<div class="dropdown-menu p-2 flex-column button-section" aria-labelledby="dropdownMenuItem1">' +
            '<button type="button" class="btn btn-success w-100 task-complete">Complete</button>' +
            '<button type="button" class="btn btn-info w-100 my-2 task-edit">Edit</button>' +
            '<button type="button" class="btn btn-danger w-100 remove">Delete</button>' +
            '</div>';
        nearestTask.classList.add('completed');
        todoList.appendChild(nearestTask);
    }
});

add.addEventListener("click", function(e) {
    event.preventDefault(); //отменяем действие браузера
    index = index + 1;
    var addListItem = document.createElement('li'); //создаем элемент списка
    addListItem.setAttribute("id", index);
    var taskTitle = document.getElementById('inputTitle'); //берем из формы название
    var taskText = document.getElementById('inputText'); //берем текст из поля
    var lowPriority = document.getElementById('Low') //берем приоритет
    var mediumPriority = document.getElementById('Medium')
    var hightPriority = document.getElementById('Hight')
    var priority = '';
    lowPriority.checked ? priority = 'Low Priority' :
        (mediumPriority.checked ? priority = 'Medium Priority' :
            (hightPriority.checked ? priority = 'Hight Priority' : none));

    var taskDate = moment().format('HH:mm MM-DD-YYYY');

    todoList.appendChild(addListItem);

    addListItem.classList.add('to-do-task'); //добовляем классы к новому листу
    addListItem.classList.add('list-group-item');
    addListItem.classList.add('d-flex');
    addListItem.classList.add('w-100');
    addListItem.classList.add('mb-2');

    addListItem.innerHTML = '<div class="w-100 mr-2">' +
        '<div class="d-flex w-100 justify-content-between">' +
        '<h5 class="mb-1 task-title"></h5>' +
        '<div>' +
        '<small class="mr-2 priority"></small>' +
        '<small class="task-date"></small>' +
        '</div>' +
        '</div>' +
        '<p class="mb-1 w-100 task-text"></p>' +
        '</div>' +
        '<div class="dropdown m-2 dropleft">' +
        '<button class=" btn btn-success h-100 save-after-edit">' +
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
    addListItem.querySelector('.priority').appendChild(document.createTextNode(priority));
    taskTitle.value = '';
    addListItem.querySelector('.task-date').appendChild(document.createTextNode(taskDate));
    taskTitle.value = '';
});

//EDIT BLOCK!

/*edit.addEventListener("click", function(e) {
    var editListItem = event.target.closest('li'); //берем элемент списка
    //editListItem.setAttribute("id", index); //

    var element = document.getElementById(editListItem.id);

    console.log(element);

    element.querySelector('.task-title').setAttribute('contenteditable', 'true')

    element.querySelector('.task-text')


    element.querySelector('.priority')
});*/