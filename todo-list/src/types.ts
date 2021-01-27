export const ADD_TODO = 'ADD TODO';
export const DELETE_TODO = 'DELETE TODO';
export const MARK_TODO = 'MARK TODO';
export const REFRESH_TODO = 'REFRESH TODO';

export interface MyTodo {
    text: string;
    current: boolean;
    finished: boolean;
}

export interface MyTodoState {
    todos: MyTodo[];
}

export interface MyState {
    currentTab: string;
    currentInput: string;
}

export interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: MyTodo[];
}
export interface DeleteTodoAction {
    type: typeof DELETE_TODO;
    payload: MyTodo[];
}
export interface MarkTodoAction {
    type: typeof MARK_TODO;
    payload: MyTodo[];
}
export interface RefreshTodoAction {
    type: typeof REFRESH_TODO;
    payload: MyTodo[];
}
export type TodoActionTypes = AddTodoAction | DeleteTodoAction | MarkTodoAction | RefreshTodoAction;
