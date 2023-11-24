import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    setCurrentDay(dayOfWeek);
  }, []);

  const addTodo = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleFilterChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const filteredTodos = todos.filter((todo) => {
    if (status === 'all') return true;
    if (status === 'completed') return todo.completed;
    if (status === 'uncompleted') return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {filteredTodos.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          filteredTodos.map((value, index) => (
            <div className={`todo ${value.completed ? 'completed' : ''}`} key={index}>
              <div className="left">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={value.completed}
                  onChange={() => completeTodo(index)}
                />
                <p>{value.text}</p>
              </div>
              <div className="right">
                <i onClick={() => deleteTodo(index)} className="fas fa-times"></i>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="filters">
        <button
          className={status === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={status === 'uncompleted' ? 'active' : ''}
          onClick={() => handleFilterChange('uncompleted')}
        >
          Active
        </button>
        <button
          className={status === 'completed' ? 'active' : ''}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>
      <div className="clear" onClick={clearCompleted}>
        <button>Clear Completed</button>
      </div>
    </div>
  );
}

export default App;
