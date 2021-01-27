import { ADD_TODO, DELETE_TODO, MARK_TODO, MyTodoState, REFRESH_TODO, TodoActionTypes } from '../types';

const initialState: MyTodoState = {
    todos: [],
};

export default (state: MyTodoState = initialState, action: TodoActionTypes): MyTodoState => {
    switch (action.type) {
        case ADD_TODO:
            return {
                todos: action.payload,
            };
        case DELETE_TODO:
            return {
                todos: action.payload,
            };
        case MARK_TODO:
            return {
                todos: action.payload,
            };
        case REFRESH_TODO:
            return {
                todos: action.payload,
            };
        default:
            return state;
    }
};
