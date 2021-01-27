import React, { Component, Dispatch, Fragment, ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { addTodos, deleteTodos, markTodos, refreshTodos } from './actions/todoAction';
import { RootState } from './reducers';
import { MyState, MyTodo, TodoActionTypes } from './types';

const ALL_TAB = 'ALL TODO TAB';
const CURRENT_TAB = 'CURRENT TODO TAB';
const FINISHED_TAB = 'FINISHED TODO TAB';

const mapStateToProps = (state: RootState) => {
    return {
        allTodos: state.todosState.todos,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<TodoActionTypes>) => {
    return {
        dispatch,
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

class Todo extends Component<Props, MyState> {
    state: MyState = {
        currentTab: CURRENT_TAB,
        currentInput: '',
    };
    onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState((state) => ({
            ...state,
            currentInput: e.target.value,
        }));
    };
    addTodoHandler = (): void => {
        this.props.dispatch(
            addTodos({ text: this.state.currentInput, current: true, finished: false }, this.props.allTodos),
        );
        this.setState((state) => ({
            ...state,
            currentInput: '',
        }));
    };
    deleteTodoHandler = (index: number): void => {
        this.props.dispatch(deleteTodos(index, this.props.allTodos));
    };
    markTodoHandler = (index: number): void => {
        this.props.dispatch(markTodos(index, this.props.allTodos));
    };
    allTab = (): void => {
        this.setState((state) => ({
            ...state,
            currentTab: ALL_TAB,
        }));
    };
    currentTab = (): void => {
        const auxAllTodos = this.props.allTodos.map((todo) => {
            const newTodo = JSON.parse(JSON.stringify(todo)); // deep copy
            if (newTodo.finished) {
                newTodo.current = false;
                return newTodo;
            } else {
                newTodo.current = true;
                return newTodo;
            }
        });
        this.setState((state) => ({
            ...state,
            currentTab: CURRENT_TAB,
        }));
        this.props.dispatch(refreshTodos(auxAllTodos));
    };
    finishedTab = (): void => {
        this.setState((state) => ({
            ...state,
            currentTab: FINISHED_TAB,
        }));
    };
    rowMaker = (todo: MyTodo, i: number): ReactElement => {
        return (
            <Row key={i}>
                <Col>
                    <li
                        onClick={() => this.markTodoHandler(i)}
                        style={{ textDecoration: `${todo.finished ? 'line-through' : 'none'}` }}
                    >
                        {todo.text}
                    </li>
                </Col>
                <Col>
                    <p>{todo.finished ? 'Done' : 'Not done'}</p>
                </Col>
                <Col>
                    <Button variant="primary" onClick={() => this.deleteTodoHandler(i)}>
                        Delete
                    </Button>
                </Col>
            </Row>
        );
    };
    showSelectedList = (currentTab: string): Array<ReactElement> => {
        const selectedList = this.props.allTodos.map((todo, i) => {
            if (currentTab === CURRENT_TAB && todo.current) {
                return this.rowMaker(todo, i);
            } else if (currentTab === FINISHED_TAB && todo.finished) {
                return this.rowMaker(todo, i);
            } else if (currentTab === ALL_TAB) {
                return this.rowMaker(todo, i);
            }
            return <Fragment key={i}></Fragment>; // shouldn't reach here
        });
        return selectedList;
    };
    render(): ReactElement {
        return (
            <div>
                <h1>My Todo with React</h1>
                <hr />
                <Button variant="primary" onClick={() => this.allTab()} style={{ marginRight: '1vh' }}>
                    All todos
                </Button>
                <Button variant="primary" onClick={() => this.currentTab()} style={{ marginRight: '1vh' }}>
                    Current todos
                </Button>
                <Button variant="primary" onClick={() => this.finishedTab()}>
                    Finished todos
                </Button>
                <hr />
                <input
                    type="text"
                    onChange={(e) => this.onChangeHandler(e)}
                    value={this.state.currentInput}
                    style={{ marginRight: '1vh' }}
                />
                <Button variant="primary" onClick={() => this.addTodoHandler()}>
                    Add
                </Button>
                <ul>{this.showSelectedList(this.state.currentTab)}</ul>
            </div>
        );
    }
}

export default connector(Todo);
