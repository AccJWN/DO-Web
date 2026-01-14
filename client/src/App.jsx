import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await axios.post(API_URL, { text: input });
    setTodos([...todos, res.data]);
    setInput('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Todo App</h1>
      <form onSubmit={addTodo} style={{ marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;