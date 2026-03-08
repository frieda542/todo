'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'nextjs-todos';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch {
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const remaining = useMemo(() => todos.filter((todo) => !todo.done).length, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;

    setTodos((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title,
        done: false,
      },
    ]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <main className="container">
      <h1>Todo List</h1>
      <p>{remaining} task(s) remaining</p>

      <form onSubmit={addTodo} className="todo-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
          aria-label="Todo title"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
            </label>
            <button type="button" onClick={() => removeTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
