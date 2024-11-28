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
    try {
      const response = await axios.get(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/`);
      setData(response.data);
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
  const addTodoHIDE = async (newItem) => {
      const endpoint = `${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/`;
      try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(newItem),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.errors?.map(err => err.detail).join(', ') || 'Unknown error'
            );
        }
        return await response.json();
      } catch (error) {
        console.error("addTodo Error Caught:", error.message);
        throw error;
      }
  };
//
	const addTodo = async (newItem) => {
			const endpoint = `${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/`;
			try {
					const response = await axios.post(endpoint, newItem, {
							headers: {
									'Content-Type': 'application/json',
									Accept: 'application/json',
							},
					});
					return response.data;
			} catch (error) {
					if (error.response) {
							// Handle errors returned by the backend
							const errorData = error.response.data;
							const errorMessage =
									errorData.errors?.map(err => err.detail).join(', ') || 'Unknown error';
							//console.error("addTodo Error Caught:", errorMessage);
							throw new Error(errorMessage);
					} else {
							// Handle network or other errors
							//console.error("addTodo Network/Error Caught:", error.message);
							throw error;
					}
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
      const response = await axios.patch(`${BACKEND_SCHEME_HOST_PORT}/todo/api/v1/todos/${id}/`, updatedFields, {
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

