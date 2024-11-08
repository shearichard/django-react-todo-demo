import React, { useState } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//
export const DeleteIconAndConfirmation = ({handleDeleteTodo, logtestfunction, todoid}) => {
    const [show, setShow] = useState(false);

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
    const handleShow = () => {
      setShow(true);
      logtestfunction("handleShow")
    }
    //
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
            Please confirm you wish to delete this Todo ({todoid})
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
