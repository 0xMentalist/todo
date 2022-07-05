'use strict'

let todo = [];

const filterText = {
    searchText: '',
    ifDone: ''
};

todo = getTodos();

renderText(todo, filterText);

document.querySelector('#getText').addEventListener('input', function(e){
    filterText.searchText = e.target.value;
    renderText(todo, filterText);
})

document.querySelector("#newTodo").addEventListener('submit',function(e){
    e.preventDefault();
    if(e.target.elements.todoStuff.value.trim().length > 0){
    todo.push({
        id: uuidv4(),
        item: e.target.elements.todoStuff.value, 
        done: false
    });
    saveToLS(todo);
    renderText(todo, filterText);
    e.target.elements.todoStuff.value = '';
} else {
    throw Error('Type for real yo!')
}})

document.querySelector("#showTodo").addEventListener('change', function(e){
    filterText.done = e.target.checked;
    renderText(todo, filterText);
})
