"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useId } from 'react';
//import { DataContext } from '../components/DataProviderTester';
import { DataContext } from '../components/DataProvider';

const Home = () => {


  const [data, fetchTodos, addTodo, deleteTodo, updateTodo, fetchTodo] = useContext(DataContext);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateTask, setUpdateTask] = useState('');
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTodos(); 
  }, []);

  const handleAddTodo = async () => {
    if (newTask.trim() && newDate.trim()) {
      const newItem = { title: newTask, should_be_completed_by_date: newDate, description: "Hardcoded temporary value" };
      console.log("handleAddTodo A")
      console.log(newItem)
      console.log("handleAddTodo B")
      console.log(addTodo)
      console.log("handleAddTodo C")
      await addTodo(newItem);
      setNewTask('');
      setNewDate('');
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = () => {
    if (updateId.trim() && updateTask.trim()) {
      const updatedFields = { title: updateTask };
      updateTodo(updateId, updatedFields);
      setUpdateId('');
      setUpdateTask('');
    }
  };

  const handleFetchTodo = async (id) => {
    const fetchedTodo = await fetchTodo(id);
    setTodo(fetchedTodo);
  };

  return (
    <>
      <h2>Todos</h2>
      <h3>{data.length}</h3>
      {data.length === 0 ? (
        <p>No Data</p>
      ) : (
				<div>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
				</div>
      )}
      <h3>Add New Item</h3>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
      />
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        placeholder="Enter date"
      />
      <button onClick={handleAddTodo}>Add Item</button>

      <h3>Update Item</h3>
      <input
        type="text"
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
        placeholder="Enter ID"
      />
      <input
        type="text"
        value={updateTask}
        onChange={(e) => setUpdateTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={handleUpdateTodo}>Update Item</button>

      <h3>Fetch Single Item</h3>
      <input
        type="text"
        placeholder="Enter ID to fetch"
        onBlur={(e) => handleFetchTodo(e.target.value)}
      />
      {todo && (
        <p>
          Fetched Todo: {todo.title} - {todo.should_be_completed_by_date}
        </p>
      )}
    </>
  );
};

export default Home;

