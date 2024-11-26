"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';
//
import { DeleteIconAndConfirmation } from "./DeleteIconAndConfirmation";
import { UpdateIconAndForm } from "./UpdateIconAndForm";
import { ToggleCompletedIconAndConfirmation } from "./ToggleCompletedIconAndConfirmation";
//
export const ToDoList = ({ data, data_length, handleDeleteTodo, handleToggleCompletion, handleUpdateTodo, handleAddTodo, fetchTodo, updateTodo, logtestfunction }) => {
  return(
    <table className="table table-responsive table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">Task</th>
          <th scope="col">Completed ?</th>
          <th scope="col">Complete By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} data-testid={`row-${item.id}`}>
            <td>
              <UpdateIconAndForm
                updateTodo={updateTodo} 
                logtestfunction={logtestfunction} 
                todoid={item.id} 
                fetchTodo={fetchTodo}
              />
            </td>
            <td>
              <DeleteIconAndConfirmation 
                handleDeleteTodo={handleDeleteTodo} 
                logtestfunction={logtestfunction} 
                todoid={item.id} 
              />
            </td>
            <td>
              {item.title} (id={item.id})
            </td>
            <td>
              <ToggleCompletedIconAndConfirmation 
                handleToggleCompletion={handleToggleCompletion} 
                logtestfunction={logtestfunction} 
                todoid={item.id} 
                isCompleted={item.is_completed} 
              />
            </td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default ToDoList;

