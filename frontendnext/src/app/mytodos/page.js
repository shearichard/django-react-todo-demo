"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';

import { DataContext } from '../components/DataProvider';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModalDeleteConfirmation from "../components/ModalDeleteConfirmation";

function ToDoList_HIDE({ data, data_length }) {
  console.log("ToDoList A")
  console.log(data)
  console.log("ToDoList B")
  return (
    <div>
      <p>A</p>
      {data.map((item) => (
        <div key={item.id}>{item.title} (id={item.id})</div>
      ))}
      <p>B</p>
    </div>
  );
}

function ToDoList({ data, data_length }) {
	

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
	      <DeleteIcon />
            </td>
            <td>
              {item.title} (id={item.id})
            </td>
            <td>
		<i className="bi-alarm" style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
            </td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const DeleteIcon = (props) => {

	const {show, handleClose, handleShow} = props

  return (
    <a href={"#"} className={"text-decoration-none"}><i className={"bi bi-x-lg"}></i></a>
  )
}

const DeleteIcon_HIDE3 = () => {
  //
  return(
        <div style={{ paddingLeft: '8px', paddingRight: '8px', display: 'inline-block' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-primary" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </div>
  )
}
const EditIcon = () => {
  return (
        <div style={{ paddingLeft: '8px', paddingRight: '8px', display: 'inline-block' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square text-primary" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </div>
  )
}
const DeleteIcon_HIDE2 = () => {

      const modalRef = useRef();

      const handleIconClick = () => {
            //const modal = new window.bootstrap.Modal(modalRef.current);
            //modal.show();
            alert("X")
          };

      return (
            <>
              <div
                style={{ paddingLeft: '8px', paddingRight: '8px', display: 'inline-block', cursor: 'pointer' }}
                onClick={handleIconClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-primary" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </div>

              {/* Bootstrap Modal */}
              <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirm Delete</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to delete this item?</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Cancel
                      </button>
                      <button type="button" className="btn btn-primary">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
}
//
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

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  const handleUpdateTodo = async () => {
    if (updateId.trim() && updateTask.trim()) {
      const updatedFields = { title: updateTask };
      await updateTodo(updateId, updatedFields);
      setUpdateId('');
      setUpdateTask('');
      await fetchTodos()
    }
  };

  const handleFetchTodo = async (id) => {
    const fetchedTodo = await fetchTodo(id);
    await setTodo(fetchedTodo);
  };

  return (
        <div className="d-flex flex-column min-vh-100">
          {/* Navbar */}
          <Navbar />
          {/* Main Content */}
          <div className="container mt-5 flex-grow-1">
            <h2>Todos</h2>
            <hr />
            <ToDoList data={data} key={data.length} />
            <hr />
		<ModalDeleteConfirmation />
            <hr />
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
        </div>
        {/* Footer */}
        <Footer />
      </div>
  );
};

export default Home;

