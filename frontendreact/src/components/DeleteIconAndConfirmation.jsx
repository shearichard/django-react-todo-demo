import React, { useState } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//
export const DeleteIconAndConfirmation = ({handleDeleteTodo, logtestfunction, todoid, fetchTodo}) => {
    const [show, setShow] = useState(false);

    const [todo, setTodo] = useState(null);

    const handleDeleteAndClose = async () => {
      logtestfunction(`handleDeleteAndClose for ${todoid}`)
      await handleDeleteTodo(todoid)
      handleClose() 
    }
    //
    const handleClose = () => {
      setShow(false);
      logtestfunction("handleClose")
    }
    //
    const OLD_handleShow = () => {
      setShow(true);
      logtestfunction("handleShow")
    }
    const handleShow = async () => {
      const fetchedTodo = await fetchTodo(todoid);
      setTodo(fetchedTodo);
      setShow(true);
    };
    //
    //style={{ margin-bottom: 0.5em }}
      //<div style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }} >
      //<div style={{ marginBottom: '2.5rem' }} >
    //
    return (
      <>
        <i
          className="bi bi-x-lg text-primary "
          role="button"
          aria-label="Delete"
          onClick={handleShow}
          style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'primary' }}
        ></i>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>OK to Delete ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please confirm you wish to delete this Todo: 
            <div 
              style={{ 
                margin: '1.5rem auto',
                textAlign: 'center'
              }} >
                <em>{todo ? todo.title : ""}</em>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteAndClose}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteIconAndConfirmation;
