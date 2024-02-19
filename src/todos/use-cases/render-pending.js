import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param {String} ElementId 
 */

export const renderPending = (ElementId)=>{
    if (!element)
    element = document.querySelector(ElementId);
    if (!element)
    throw new Error(`Element ${ElementId} not found`)

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
    

}