import React, { useState, useEffect, useRef } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//
const INITIAL_FORM_STATE = {
         "id": -1,
         "title": "",
         "description": "",
         "is_completed": false,
         "should_be_completed_by_date": ""
     };
//
export const UpdateIconAndForm = ({updateTodo, logtestfunction, todoid, fetchTodo}) => {
    //
    const [show, setShow] = useState(false);
    //
    const [todo, setTodo] = useState(null);
    //
    const [form, setForm] = useState(INITIAL_FORM_STATE);
    //
    const titleInputRef = useRef(null);
    //
    useEffect(() => {
      // Focus the input when the modal is shown
      if (show && titleInputRef.current) {
        titleInputRef.current.focus(); 
      }
    }, [show]); 
    //
    const handleChange = (event) => {
          const { name, value, type, checked } = event.target;
          setForm({
                  ...form,
                  [name]: type === "checkbox" ? checked : value,
                });
        };

    //
    const HIDE_handleSubmit = async (event) => {
      event.preventDefault();
      let local_todo = todo;
      local_todo.title = form.title
      local_todo.is_completed = form.is_completed
      await updateTodo(todo.id, local_todo);
      setShow(false);
      setForm(INITIAL_FORM_STATE);
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Prepare the date with time component
      let formattedDate = form.should_be_completed_by_date;
      if (formattedDate) {
        formattedDate += "T23:59:59.000Z";
      }
      //
      await updateTodo(todo.id, {
        ...todo,
        title: form.title,
        is_completed: form.is_completed,
        should_be_completed_by_date: formattedDate,
      });
      //
      setShow(false);
      setForm(INITIAL_FORM_STATE);
    };
    //
    const handleClose = () => {
      setShow(false);
      logtestfunction("handleClose")
    }
    //
    const HIDE_handleShow = async () => {
      const fetchedTodo = await fetchTodo(todoid);
      await setTodo(fetchedTodo);
      await setForm(fetchedTodo);
      setShow(true);
      logtestfunction("handleShow")
    }
    const handleShow = async () => {
      const fetchedTodo = await fetchTodo(todoid);
      setTodo(fetchedTodo);
      setForm({
        ...fetchedTodo,
        should_be_completed_by_date: fetchedTodo.should_be_completed_by_date
          ? fetchedTodo.should_be_completed_by_date.split("T")[0]
          : "",
      });
      setShow(true);
    };
    //
    return (
      <>
        <i className="bi bi-pen text-primary "
            role="button"
            aria-label="Update"
            onClick={handleShow}
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'primary' }}
        >
        </i>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="title">Title:</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  name="title"
                  value={ form ? form.title : ""}
                  onChange={handleChange}
                  ref={titleInputRef}
                />
              </Form.Group>

              <Form.Group controlId="formIsCompleted" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Completed"
                  name="is_completed"
                  checked={form.is_completed}
                  onChange={handleChange}
                />
              </Form.Group>

            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Completion Date</Form.Label>
              <Form.Control
                type="date"
                name="should_be_completed_by_date"
                value={form.should_be_completed_by_date}
                onChange={handleChange}
              />
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UpdateIconAndForm;
