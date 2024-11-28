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
const SHOULD_BE_COMPLETED_HAS_TIME_COMPONENT = false;
//
export const AddIconAndForm = ({addTodo}) => {
    //
    const [show, setShow] = useState(false);
    //
    const [todo, setTodo] = useState(null);
    //
    const [form, setForm] = useState(INITIAL_FORM_STATE);
    //
    const [hover, setHover] = useState(false);
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
    //TODO deal with local date/time
    //
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Prepare the date with time component
      let formattedDate = form.should_be_completed_by_date;
      //
      if (SHOULD_BE_COMPLETED_HAS_TIME_COMPONENT === true){
        if (formattedDate) {
          formattedDate += "T23:59:59.000Z";
        }
      }
      //
      try {
        await addTodo({
          ...todo,
          title: form.title,
          is_completed: form.is_completed,
          should_be_completed_by_date: formattedDate,
        });
        //
        setShow(false);
        setForm(INITIAL_FORM_STATE);
      }
      catch (error) {
        alert(error);
      }
    };
    //
    const handleClose = () => {
      setShow(false);
      logtestfunction("handleClose")
    }
    //
    const handleShow = async () => {
      setShow(true);
    };
    //
              //color: hover ? '#ff0000' : '#00ff00', // Explicit hover colors
    return (
      <>
        {/*
        <i
            className="bi bi-plus-circle"
            role="button"
            aria-label="Add"
            style={{
              cursor: 'pointer',
              fontSize: '1.5rem',
              textShadow: hover ? '0px 4px 8px rgba(0, 0, 0, 0.8)' : 'none', // Darker shadow
              color: hover ? 'warning' : 'primary', // Explicit hover colors
              transition: 'all 0.1s ease-in-out', // Smooth transitions
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
        </i>
        */}
        <i
          className="bi bi-plus-circle text-primary "
          role="button"
          aria-label="Add"
          onClick={handleShow}
          style={{ 
            cursor: 'pointer', 
            fontSize: '1.5rem', 
            textShadow: hover ? '0px 4px 6px rgba(0, 0, 0, 0.3)' : 'none',
            color: hover ? '#ff0000' : '#00ff00',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
        </i>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add</Modal.Title>
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

export default AddIconAndForm;
