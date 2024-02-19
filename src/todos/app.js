import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, renderTodos } from './use-cases';


const ElementsIDs  = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    todoFilters: '.filtro',
    pendingCountLablel: '#pending-count',

}

/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId)=> {

    const displayTodos =()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementsIDs.TodoList, todos)
        updatePendingCount();
    }

    const updatePendingCount = ()=>{
        renderPending(ElementsIDs.pendingCountLablel)
    }
    
    //cuando la función se llama
    (()=> {
        document.createElement('div');
        app.innerHTML = html;
        displayTodos()
        
    })();
    
    //Ref HTML 

    const newDescriptionInput = document.querySelector(ElementsIDs.newTodoInput);
    const todoListUL = document.querySelector(ElementsIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementsIDs.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll(ElementsIDs.todoFilters);

    //Listener
    newDescriptionInput.addEventListener('keyup', (event)=>{
        if ( event.keyCode !== 13 ) return; 
        if (event.target.value.trim().length === 0) return; 

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';


    });

    todoListUL.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute ('data-id'));
        displayTodos()

    })
    
    todoListUL.addEventListener('click', (event)=>{
        
        
        const elementDestroy = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        
        if (!element || !elementDestroy ) return; 
        
        todoStore.deleteTodo(element.getAttribute ('data-id'));
        displayTodos()
        
    })
    
    clearCompletedButton.addEventListener('click', ()=>{
        todoStore.deleteCompleted();
        displayTodos()
    
        })

    filtersLIs.forEach(element =>{
        element.addEventListener('click', (element)=>{
            filtersLIs.forEach(el=>el.classList.remove('selected'))
            element.target.classList.add('selected');
            console.log(element.target.text);
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break;
            }
            displayTodos()
        })
    })

} 