import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run only once (set it with '[]' empty parameter)
  useEffect( () => {
    getLocalTodos();
  }, [])

  useEffect( () => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //Save to Local Storage
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  //Get from Local Storage
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todolocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todolocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <Form todos={todos} setTodos={setTodos}
            inputText={inputText} setInputText={setInputText}
            setStatus={setStatus}
      />
      <TodoList todos={todos} setTodos={setTodos}
                filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
