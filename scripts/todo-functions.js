'use strict'

// Fetching existing todos.

const getTodos = () => {
    const todoJSON = localStorage.getItem('todo');
    try {
        return todoJSON ? JSON.parse(todoJSON) : [];
    }
    catch (e){
        return [];
    }


}

// Save todos to local storage.

const saveToLS = (todo) => {
    localStorage.setItem('todo', JSON.stringify(todo));
}

// Remove Todo

const removeItem = (removed) => {
    const toDel = todo.findIndex((x) => x.id === removed);
    if(toDel > -1 ){
        todo.splice(toDel,1);
    }
 }

// Render todos 

const renderText = (todo, toSearch) => {
    const filteredTodos = todo.filter(function(todos){
    return todos.item.toLowerCase().includes(toSearch.searchText.toLowerCase());
   });

const todoHere = document.querySelector('#todoHere')


const todoLeft = filteredTodos.filter((doThis) => doThis.done === false);

createDOMEl(filteredTodos);

todoHere.innerHTML = '';

summaryDOM(todoLeft);

if(filteredTodos.length > 0) {

if(toSearch.done){
todoLeft.forEach(function(things){
        createDOMEl(things);
})
}
else {
    filteredTodos.forEach((things) => {
            createDOMEl(things);
        })
}
   }
 
    else {
        const emptyEl = document.createElement('p')
        emptyEl.classList.add('empty-message')
        emptyEl.textContent = 'Do something!'
        todoHere.appendChild(emptyEl);

   }

}

//Toggle and change LS

const toggleThis = (thisOne, e) => {
        thisOne.done = e
        saveToLS(todo);
        renderText(todo,filterText);

}

// Create DOM Element

const createDOMEl = (things) => {
    // made a new div to create each note

    const todoHere = document.querySelector('#todoHere')


    const newDiv = document.createElement('label')
    newDiv.classList.add('list-item')

    const newDive = document.createElement('div')
    newDive.classList.add('list-item__container')

    // made note to span so it renders o the side of the button
    const thing = document.createElement('span');
    thing.textContent = things.item;
    thing.classList.add('list-item__title')

    const buttonX = document.createElement('button');
    buttonX.textContent = 'remove';
    buttonX.classList.add('button','button--text')
    buttonX.addEventListener('click', function(){
        removeItem(things.id);
        renderText(todo,filterText);
        saveToLS(todo);
    })

    const doneOrNot = document.createElement('input');
    doneOrNot.setAttribute('type', 'checkbox');
    doneOrNot.checked = things.done;
    doneOrNot.addEventListener('change', function(e){
     toggleThis(things,e.target.checked);
    })

    todoHere.appendChild(newDiv);


    // rendering to the div 

    newDive.appendChild(doneOrNot);
    newDive.appendChild(thing);
    newDiv.appendChild(newDive)
    newDiv.appendChild(buttonX);
}


// Generate Summary DOM

const summaryDOM = (todoLeft) => {
const summary = document.createElement('h2');
summary.classList.add('list-title')
if(todoLeft.length > 1 ) {
summary.textContent = `Still gotta do ${todoLeft.length} things!`;

} else if(todoLeft.length < 1){
summary.textContent = `Nothing left to do!`;

} else {
summary.textContent = `Still gotta do 1 thing!`;
}
document.querySelector('#todoHere').appendChild(summary);
}

