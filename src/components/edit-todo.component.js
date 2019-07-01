import React, {Component} from "react";
import axios from "axios";



export default class EditTodo extends Component { 
    constructor(props) {
        super(props);

        this.onChangeTodoDesc = this.onChangeTodoDesc.bind(this);
        this.onChangeTodoResp = this.onChangeTodoResp.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_desc: " ",
            todo_resp: " ",
            todo_priority: " ",
            todo_complete: false
        }
    }

    componentDidMount () {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)          // responding with a promise, can chain actions
            .then(res => {
                this.setState({
                    todo_desc: res.data.todo_desc,
                    todo_resp: res.data.todo_resp,
                    todo_priority: res.data.todo_priority,
                    todo_complete: res.data.todo_complete,
            })
    })
    .catch( (err) =>{
        console.log(err)
    })

    }

 
    onChangeTodoDesc(e) {
        this.setState({
            todo_desc: e.target.value
        });
    }

    onChangeTodoResp(e) {
        this.setState({
            todo_resp: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_complete: !this.state.todo_complete
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            todo_desc: this.state.todo_desc,
            todo_resp: this.state.todo_resp,
            todo_priority: this.state.todo_priority,
            todo_complete: this.state.todo_complete
        };
        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
         this.props.history.push('/');
    }

    render() {
        return(
            <div>
                <h3>Update To-Do</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="test"
                            className="form-control"
                            value={this.state.todo_desc}
                            onChange={this.onChangeTodoDesc} />
                    </div>

                    <div className="form-group">
                        <label>Assigned To: </label>
                        <input type="test"
                            className="form-control"
                            value={this.state.todo_resp}
                            onChange={this.onChangeTodoResp} />
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
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo_priority==="Medium"}
                                    onChange={this.onChangeTodoPriority}
                                />
                            <label className="form-check-label">Medium</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
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

                        <div className="form-check">
                            <input type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckBox"
                                    name="completedCheckBox"
                                    onChange={this.onChangeTodoCompleted}
                                    checked={this.state.todo_complete}
                                    value={this.state.todo_complete}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckBox">Completed</label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update To-Do" className="btn btn-primary" />
                        </div>



                    </div>
                </form>
            </div>
        )
    }
}
