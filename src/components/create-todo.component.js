import React, {Component} from "react";
import axios from "axios";

export default class CreateTodo extends Component { 

    constructor(props) {
        super(props);

        this.onChangeTodoDesc = this.onChangeTodoDesc.bind(this);
        this.onChangeTodoResp = this.onChangeTodoResp.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoComplete = this.onChangeTodoComplete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            todo_desc: ' ',         // set to empty string, description
            todo_resp: ' ',         // set to empty string, who is responsible
            todo_priority: ' ',     // set to empty string, priority
            todo_complete: false    // this is creating attributes of each record
        }
    }

//Methods
//e = event object
    onChangeTodoDesc (e){
        this.setState({
            todo_desc: e.target.value
        });
    }

    onChangeTodoResp (e){
        this.setState({
            todo_resp: e.target.value
        });
    }

    onChangeTodoPriority (e){
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoComplete (e){
        this.setState({
            todo_complete: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); //P1@39:39
        
        console.log('Form Submitted:');
        console.log(`Todo Description: ${this.state.todo_desc}`);   // In ES6, must use backticks ` ` when using template literals ${ }
        console.log(`Todo Responsible: ${this.state.todo_resp}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Status: ${this.state.todo_complete}`);

        const newTodo = {
            todo_desc: this.state.todo_desc,
            todo_resp: this.state.todo_resp,
            todo_priority: this.state.todo_priority,
            todo_complete: this.state.todo_complete
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));                    //res.data <= data is...?

        this.setState({
            todo_desc: " ",
            todo_resp: " ",
            todo_priority: " ",
            todo_complete: false


        })

    }

    render() {

        return(
            <div style={{marginTop: 20}}>
                <h3>Create New To-Do</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_desc}
                                onChange={this.onChangeTodoDesc}
                                />
                    </div>

                    <div className="form-group">
                        <label>Responsible:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_resp}
                                onChange={this.onChangeTodoResp}
                                />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <label>Priority: </label>
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo_priority==="Low"}
                                    onChange={this.onChangeTodoPriority}
                                />
                            <label className="form-check-label">Low</label>

                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo_priority==="Medium"}
                                    onChange={this.onChangeTodoPriority}
                                />
                            <label className="form-check-label">Medium</label>

                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.todo_priority==="High"}
                                    onChange={this.onChangeTodoPriority}
                                />
                            <label className="form-check-label">High</label>

                        </div>                   
                    </div>

                    <div className="form-group">
                        <label>Completion Status:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_complete}
                                onChange={this.onChangeTodoComplete}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create To Do" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }


}