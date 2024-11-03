"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';
//
import { DeleteIconAndConfirmation } from "./DeleteIconAndConfirmation";
//
export const ToDoList = ({ data, data_length, handleDeleteTodo, logtestfunction }) => {
  return(
    <table className="table table-responsive table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Task</th>
          <th scope="col">Completed ?</th>
          <th scope="col">Complete By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <DeleteIconAndConfirmation handleDeleteTodo={handleDeleteTodo} logtestfunction={logtestfunction} todoid={item.id} />
            </td>
            <td>
              {item.title} (id={item.id})
            </td>
            <td>
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

