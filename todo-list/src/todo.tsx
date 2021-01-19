import React, { Component, Fragment, ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ALL_TAB = 'ALL TODO TAB';
const CURRENT_TAB = 'CURRENT TODO TAB';
const FINISHED_TAB = 'FINISHED TODO TAB';

type MyTodo = {
    text: string;
    current: boolean;
    finished: boolean;
};
type MyState = {
    allTodos: Array<MyTodo>;
    currentTab: string;
    currentInput: string;
};
export default class Todo extends Component<Record<string, unknown>, MyState> {
    state: MyState = {
        allTodos: [],
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
        this.setState((state) => ({
            ...state,
            allTodos: [...state.allTodos, { text: state.currentInput, current: true, finished: false }],
        }));
        this.setState((state) => ({
            ...state,
            currentInput: '',
        }));
    };
    deleteTodoHandler = (index: number): void => {
        this.setState((state) => ({
            ...state,
            allTodos: state.allTodos.filter((_, i) => i !== index),
        }));
    };
    markTodoHandler = (index: number): void => {
        const auxAllTodos = [...this.state.allTodos];
        auxAllTodos[index].finished = !auxAllTodos[index].finished;
        this.setState((state) => ({
            ...state,
            allTodos: auxAllTodos,
        }));
    };
    allTab = (): void => {
        this.setState((state) => ({
            ...state,
            currentTab: ALL_TAB,
        }));
    };
    currentTab = (): void => {
        const auxAllTodos = this.state.allTodos.map((todo) => {
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
            allTodos: auxAllTodos,
        }));
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
        console.log(this.state.allTodos);
        const selectedList = this.state.allTodos.map((todo, i) => {
            if (currentTab === CURRENT_TAB && todo.current) {
                return this.rowMaker(todo, i);
            } else if (currentTab === FINISHED_TAB && todo.finished) {
                return this.rowMaker(todo, i);
            } else if (currentTab === ALL_TAB) {
                return this.rowMaker(todo, i);
            }
            return <Fragment key={i}></Fragment>; // shouldn't reach here
        });
        console.log(selectedList);
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
