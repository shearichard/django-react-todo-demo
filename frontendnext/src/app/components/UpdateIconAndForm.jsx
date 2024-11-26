import React, { useState, useEffect } from 'react';
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
    //console.log("Component rendered with props:", { updateTodo, logtestfunction, todoid, fetchTodo });
    //
    const [show, setShow] = useState(false);
    //
    const [todo, setTodo] = useState(null);
    //
    const [form, setForm] = useState(INITIAL_FORM_STATE);
    //
    /*
    useEffect(() => {
        let ignore = false;
        setTodo(null);

        fetchBio(person).then(result => {
        if (!ignore) {
          setBio(result);
                                  
        });
        return () => {
          ignore = true;
        };
    }, [todoid]);
    */
    /*
    useEffect(() => {
      console.log(`Z ${todoid}`)
    }, [todoid]);
    useEffect(() => {
      console.log("Y")
    }, []);
    */

    /*
    fetchTodoInitially(todoid).then(result => {
        if (!ignore) {
          setTodo(result);
				          }
		          });
	      return () => {
		            ignore = true;
		          };
	    }, [todoid]);
      */

    const handleChange_HIDE = (event) => {
      setForm({
        ...form,
        [event.target.id]: event.target.value,
      });
    };
    //
    const handleChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };
    //
    const handleSubmit = async (event) => {
      console.log("G")
      event.preventDefault();
      let local_todo = todo;
      local_todo.title = form.title
      console.log(local_todo)
      console.log("H")
      await updateTodo(todo.id, local_todo);
      setShow(false);
      setForm(INITIAL_FORM_STATE);
    };
    //
    const handleClose = () => {
      setShow(false);
      logtestfunction("handleClose")
    }
    //
    const handleShow = async () => {
      console.log("A")
      const fetchedTodo = await fetchTodo(todoid);
      console.log(fetchedTodo)
      console.log("B")
      await setTodo(fetchedTodo);
      console.log("C")
      await setForm(fetchedTodo);
      console.log("E")
      console.log(form);
      console.log("D")
      //debugger;
      setShow(true);
      logtestfunction("handleShow")
    }
    //
    return (
      <>
        <i
          className="bi bi-pen text-primary "
          role="button"
          aria-label="Update"
          onClick={handleShow}
          style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'primary' }}
        ></i>
        {/*
==================================================================================================
      TODO:
       OPTION ONE
        - Use data provider to fetch the current value of the todo related to todoid
        - Populate a local structure with that todo object
        - Populate a form from that todo object

==================================================================================================
        */}
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
        {/*
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please confirm you wish to delete this Todo ({todoid})
            [{todo ? todo.title : ""}]
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateAndClose}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        */}
      </>
    );
}

export default UpdateIconAndForm;
