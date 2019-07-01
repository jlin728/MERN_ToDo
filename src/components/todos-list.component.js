import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Todo = (props) => (
    <tr>
        <td className={props.todo.todo_complete ? 'complete' : ' ' }>{props.todo.todo_desc}</td>
        <td className={props.todo.todo_complete ? 'complete' : ' ' }>{props.todo.todo_resp}</td>
        <td className={props.todo.todo_complete ? 'complete' : ' ' }>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+ props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component { 

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
        .then(res => {
            this.setState({todos: res.data});
        })
        .catch( (err) => {
            console.log(err);
        })
    }

// Issue with page not refreshing after changes have been made (P4@38)
// Suggested to use componentDidUpdate. However, app works without it... why? 

    todoList(){
        return this.state.todos.map( (currentTodo, i)=>{
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {

        return(
            <div>
                <h3>To-Dos List</h3>
                <table className='table table-striped' style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }


}