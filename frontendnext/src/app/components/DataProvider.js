"use client";
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch all to-do items
  const fetchTodos = async () => {
    //debugger
    console.log("fetchTodos A");
    try {
      const response = await axios.get('http://localhost:8000/api/v1/todos/');
      console.log("fetchTodos B");
      console.log(response.data);
      setData(response.data);
      console.log("fetchTodos C");
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };


  // Fetch a single to-do item by ID
  const fetchTodo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/todos/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo:', error);
      return null;
    }
  };

  // Create a new to-do item
  const addTodo = async (newItem) => {
    try {
      console.log("addTodo A")	    
      console.log(newItem)	    
      console.log("addTodo B")	    
      const response = await axios.post('http://localhost:8000/api/v1/todos/', newItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("addTodo C")	    
      console.log(response)
      console.log("addTodo D")	    
      console.log(response.data)
      console.log("addTodo E")	    
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Delete a to-do item by ID
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todos/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Update a to-do item by ID (PATCH)
  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/todos/${id}/`, updatedFields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

    //<DataContext.Provider value={[ "1", "2", "3", "4", "5", updateTodo]}>
  //const [data, fetchTodos, addTodo, deleteTodo, updateTodo, fetchTodo] = useContext(DataContext);
  return (
    <DataContext.Provider value={[ data, fetchTodos, addTodo, deleteTodo, updateTodo, fetchTodo ]}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider

