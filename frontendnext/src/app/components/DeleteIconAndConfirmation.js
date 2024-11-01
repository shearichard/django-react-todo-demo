import React, { useState } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteIconAndConfirmation({logtestfunction, todoid}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      logtestfunction("handlClose")
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
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteIconAndConfirmation;
