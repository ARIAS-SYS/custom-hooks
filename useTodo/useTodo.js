import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => {
    return JSON.parse( localStorage.getItem("todos") ) || [] ;
} 

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init )


    const handleNewTodo = ( todo ) => {
        const action = {
            type: "[TODO] Add Todo",
            payload: todo
        }
        dispatch(action);
    }

    const handleRemoveTodo = ( id ) => {
        const action = {
            type: "[TODO] Delete Todo",
            payload: id
        }
        dispatch(action);
    }

    const handleTogleTodo = ( id ) => {
        const action = {
            type: "[TODO] Toggle Todo",
            payload: id
        }
        dispatch(action);
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [ todos ])
    

    return {
        todos,
        handleNewTodo,
        handleRemoveTodo,
        handleTogleTodo,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        todosCount: todos.length
    }
}
