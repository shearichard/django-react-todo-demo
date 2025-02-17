import React, { createContext, useState } from 'react';
import axios from 'axios';

import { BACKEND_SCHEME_HOST_PORT } from "./Constants";
import apiClient from "./apiClient";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  // Fetch all to-do items
  /*
  const fetchTodos_HIDE = async () => {
    //debugger
    try {
      const response = await axios.get(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  */
  const fetchTodos = async () => {
    const response = await apiClient.get('/todo/api/v1/todos/');
    setData(response.data);
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
  //
  const addTodo = async (newItem) => {
    const endpoint = `/todo/api/v1/todos/`;
    //
    const response = await apiClient.post(endpoint, newItem, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    // Update the 'data' state with the new object
    setData((prevData) => [...prevData, response.data]);
    //
    return response.data;
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
      //const response = await axios.patch(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/${id}/`, updatedFields, {
      const response = await apiClient.patch(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/${id}/`, updatedFields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(function(prevData) {
        return prevData.map(function(item) {
          if (item.id === id) {
            return response.data;
          } else {
            return item;
          }
        });
      });
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

