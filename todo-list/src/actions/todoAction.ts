import {
    AddTodoAction,
    ADD_TODO,
    DeleteTodoAction,
    DELETE_TODO,
    MarkTodoAction,
    MARK_TODO,
    MyTodo,
    RefreshTodoAction,
    REFRESH_TODO,
} from '../types';

export const markTodos = (index: number, currentTodos: MyTodo[]): MarkTodoAction => {
    const auxTodos = [...currentTodos];
    auxTodos[index].finished = !auxTodos[index].finished;
    const updatedTodos = auxTodos;
    return {
        type: MARK_TODO,
        payload: updatedTodos,
    };
};
export const deleteTodos = (index: number, currentTodos: MyTodo[]): DeleteTodoAction => {
    const updatedTodos = currentTodos.filter((_, i: number) => i !== index);
    return {
        type: DELETE_TODO,
        payload: updatedTodos,
    };
};
export const addTodos = (toAddTodo: MyTodo, currentTodos: MyTodo[]): AddTodoAction => {
    const updatedTodos = [...currentTodos, toAddTodo];
    return {
        type: ADD_TODO,
        payload: updatedTodos,
    };
};

export const refreshTodos = (currentTodos: MyTodo[]): RefreshTodoAction => {
    return {
        type: REFRESH_TODO,
        payload: currentTodos,
    };
};
