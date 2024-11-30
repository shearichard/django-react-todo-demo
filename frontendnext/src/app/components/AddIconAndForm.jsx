import React, { useState, useEffect, useRef } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    const [validated, setValidated] = useState(false);
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
      //
      if (errors[name]) {
        // Clear error as the user modifies the field
        setErrors({ ...errors, [name]: "" });
      }
    };
    const validateForm = () => {
      const newErrors = {};
      //
      if (formData.title === null || formData.title === undefined || formData.title === "") {
        newErrors.title = "Title is required.";
      }
      //
      return newErrors;
    };
    //
    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() == false) {
        event.preventDefault();
        event.stopPropogation();
      }
      setValidated(true);
    }

    const handleSubmit_HIDE = async (event) => {
      event.preventDefault();
      ////////////////////////////////////////////////////////////
      // Prepare the date with time component -  START
      ////////////////////////////////////////////////////////////
      let formattedDate = form.should_be_completed_by_date;
      //
      if (SHOULD_BE_COMPLETED_HAS_TIME_COMPONENT === true){
        if (formattedDate) {
          formattedDate += "T23:59:59.000Z";
        }
      }
      ////////////////////////////////////////////////////////////
      // Prepare the date with time component -  STOP
      ////////////////////////////////////////////////////////////
      const newErrors = validateForm();
      //
      if (Object.keys(newErrors).length > 0) {
        //Display errors and stop don't do the update
        setErrors(newErrors);
      } 
      else 
      {
        //Do the update
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
      console.log("handleClose")
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
            <Modal.Title>Add Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="title">
                      <Form.Control
                        required
                        type="text"
                        name="title"
                        placeholder="Title"
                        ref={titleInputRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a title.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formIsCompleted" className="mt-3">
                      <Form.Check
                        type="checkbox"
                        label="Completed"
                        name="is_completed"
                        checked={form.is_completed}
                        onChange={handleChange}
                      />
                    </Form.Group>

                  </Row>
                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="formDate" className="mt-3">
                    <Form.Label>Completion Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="should_be_completed_by_date"
                      value={form.should_be_completed_by_date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  </Row>
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
