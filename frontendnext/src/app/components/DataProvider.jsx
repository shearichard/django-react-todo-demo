"use client";
import React, { createContext, useState } from 'react';
import axios from 'axios';

const BACKEND_SCHEME_HOST_PORT = 'http://localhost:8000'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch all to-do items
  const fetchTodos = async () => {
    //debugger
    console.log("fetchTodos A");
    try {
      const response = await axios.get(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/`);
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
      const response = await axios.get(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/${id}/`);
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
      const response = await axios.post(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/`, newItem, {
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
      await axios.delete(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  // Update a to-do item by ID (PATCH)
  const updateTodo = async (id, updatedFields) => {
    try {
      console.log("updateTodo A")
      console.log(updatedFields)
      console.log("updateTodo B")
      const response = await axios.patch(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/${id}/`, updatedFields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("updateTodo C")
      console.log(response.data)
      console.log("updateTodo D")
      setData(function(prevData) {
        return prevData.map(function(item) {
          if (item.id === id) {
            console.log("updateTodo D1")
            return response.data;
          } else {
            console.log("updateTodo D2")
            return item;
          }
        });
      });
      console.log("updateTodo E")
      console.log(data)
      console.log("updateTodo F")
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <DataContext.Provider value={[ data, fetchTodos, addTodo, deleteTodo, updateTodo, fetchTodo ]}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider

