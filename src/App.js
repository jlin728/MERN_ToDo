import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import TodosList from "./components/todos-list.component";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";

import logo from "./sun.png";


function App() {
  return (
    <Router> 
    <div className = "container">
      
      <nav className = "navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://www.google.com" target="_blank">
        <img src={logo} width="30" height="30" alt="Sun logo" />
        </a>
        <Link to="/"  className="navbar-brand">MERN To-Do App </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/" className="nav-link">To Dos</Link>
            </li>
            <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Items</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Route path = "/" exact component={TodosList} /> {/* This is the default route*/}
      <Route path = "/create" component={CreateTodo} />
      <Route path = "/edit/:id" component={EditTodo} />
    </div>
    </Router>
  );
}

export default App;
