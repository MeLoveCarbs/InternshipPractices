import { combineReducers } from 'redux';
import todosState from './todoReducer';

export const rootReducer = combineReducers({
    todosState,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
