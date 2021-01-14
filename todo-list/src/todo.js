import React, { Component, Fragment } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ALL_TAB = "ALL TODO TAB";
const CURRENT_TAB = "CURRENT TODO TAB";
const FINISHED_TAB = "FINISHED TODO TAB";

export default class Todo extends Component {
    state = {
        allTodos: [],
        currentTab: CURRENT_TAB,
        currentInput: "",
    }

    onChangeHandler = (e) => {
        this.setState(state => ({
            ...state,
            currentInput: e.target.value
        }))
    }
    addTodoHandler = () => {
        this.setState(state => ({
            ...state,
            allTodos: [...state.allTodos, { text: state.currentInput, current: true, finished: false}],
        }))
        this.setState(state => ({
            ...state,
            currentInput: '',
        }))
    }
    deleteTodoHandler = (index) => {
        this.setState(state => ({
            ...state,
            allTodos: state.allTodos.filter((_, i) => i !== index),
        }))
    }
    markTodoHandler = (index) => {
        let auxAllTodos = [...this.state.allTodos];
        auxAllTodos[index].finished = true;
        this.setState(state => ({
            ...state,
            allTodos: auxAllTodos,
        }))
    }
    allTab = () => {
        this.setState(state => ({
            ...state,
            currentTab: ALL_TAB
        }))
    }
    currentTab = () => {
        const auxAllTodos = this.state.allTodos.map((todo, i) => {
            let newTodo = todo;
            if (newTodo.finished) {
                newTodo.current = false;
                return newTodo;
            } else {
                return newTodo
            }
        })
        this.setState(state => ({
            ...state,
            currentTab: CURRENT_TAB,
            allTodos: auxAllTodos,
        }))
    }
    finishedTab = () => {
        this.setState(state => ({
            ...state,
            currentTab: FINISHED_TAB
        }))
    }
    rowMaker = (todo, i) => {
        return (
            <Row>
                <Col>
                    <li key={i} onClick={()=>this.markTodoHandler(i)} style={{textDecoration: `${todo.finished ? 'line-through':null}`}}>
                        {todo.text}</li>
                </Col>
                <Col>
                    <p>{todo.finished ? "Done" : "Not done"}</p>
                </Col>
                <Col>
                    <Button variant="primary" onClick={()=>this.deleteTodoHandler(i)}>Delete</Button>
                </Col>
            </Row>
        )
    }
    showSelectedList = (currentTab) => {
        console.log(this.state.allTodos)
        return (
            this.state.allTodos.map((todo, i) => {
                if (currentTab === CURRENT_TAB && todo.current) {
                    return this.rowMaker(todo, i);
                } else if (currentTab === FINISHED_TAB && todo.finished) {
                    return this.rowMaker(todo, i);
                } else if (currentTab === ALL_TAB) {
                    return this.rowMaker(todo, i);
                }
            })
        )
    }
    render() {
        return (
            <div>
                <h1>My Todo with React</h1>
                <hr />
                <Button variant="primary" onClick={() => this.allTab()} style={{marginRight:'1vh'}}>All todos</Button>
                <Button variant="primary" onClick={() => this.currentTab()} style={{marginRight:'1vh'}}>Current todos</Button>
                <Button variant="primary" onClick={() => this.finishedTab()}>Finished todos</Button>
                <hr/>
                <input type="text" onChange={e => this.onChangeHandler(e)} value={this.state.currentInput} style={{marginRight:'1vh'}}/>
                <Button variant="primary" onClick={() => this.addTodoHandler()}>Add</Button>
                <ul>
                    {this.showSelectedList(this.state.currentTab)}
                </ul>
            </div>
        )
    }
}