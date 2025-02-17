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
      const [errors, setErrors] = useState({});
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
        //
        setForm({
          ...form,
          [name]: type === "checkbox" ? checked : value,
        });
        ///////////////////////////////////////////////////////////
        //Don't do validation on change for the moment
        ///////////////////////////////////////////////////////////
        if (false) {
          if (errors[name]) {
            // Clear error as the user modifies the field
            setErrors({ ...errors, [name]: "" });
          }
        }
      };
      //
      const validateForm = () => {
        const newErrors = {};
        //
        if (form.title === null || form.title === undefined || form.title === "") {
          newErrors.title = "Title is required.";
        }
        //
        return newErrors;
      };
      //
      const handleSubmit = async (event) => {
        event.preventDefault();
        ////////////////////////////////////////////////////////////
        // Prepare the date with time component -  START
        ////////////////////////////////////////////////////////////
        let formattedDate = form.should_be_completed_by_date;
        if (SHOULD_BE_COMPLETED_HAS_TIME_COMPONENT === true){
          if (formattedDate) {
            formattedDate += "T23:59:59.000Z";
          }
        }
        ////////////////////////////////////////////////////////////
        // Prepare the date with time component -  STOP
        ////////////////////////////////////////////////////////////
        //
        const newErrors = validateForm();
        //
        if (Object.keys(newErrors).length > 0) {
          //Display errors and stop don't do the update
          setErrors(newErrors);
        } 
        else 
        {
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
        }
      };
      //
      const handleClose = () => {
        setShow(false);
        setErrors({})
      }
      //
      const handleShow = async () => {
        setShow(true);
      };
      //
      return (
              <>
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
                          aria-describedby="passwordHelpBlock"
                        />
                        {(errors.title && errors.title.trim()) && (
                          <Form.Text id="passwordHelpBlock" muted>
                            A todo title is required
                          </Form.Text>
                        )}
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

