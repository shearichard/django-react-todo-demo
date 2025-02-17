"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';
//
import { DeleteIconAndConfirmation } from "./DeleteIconAndConfirmation";
import { UpdateIconAndForm } from "./UpdateIconAndForm";
import { AddIconAndForm } from "./AddIconAndForm";
import { ToggleCompletedIconAndConfirmation } from "./ToggleCompletedIconAndConfirmation";
//
export const ToDoList = ({ data, data_length, handleDeleteTodo, handleToggleCompletion, handleUpdateTodo, handleAddTodo, fetchTodo, updateTodo, addTodo, logtestfunction }) => {
  function formatDate(isoDate) {
      if (!isoDate.trim()) return isoDate; 
      //
      const date = new Date(isoDate);
      //
      if (isNaN(date)) return isoDate; // Return unmodified value if invalid
      //
      return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
  }
  //
  return(
    <table className="table table-responsive table-striped">
      <thead>
        <tr>
          <th scope="col">
            <AddIconAndForm
              addTodo={addTodo} 
            />
          </th>
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
                fetchTodo={fetchTodo}
              />
            </td>
            <td>
              {item.title}
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
              {item.should_be_completed_by_date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default ToDoList;

