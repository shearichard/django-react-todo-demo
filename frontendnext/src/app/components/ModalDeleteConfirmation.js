import React, { useState } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteConfirmation() {
	  const [show, setShow] = useState(false);

	  const handleClose = () => setShow(false);
	  const handleShow = () => setShow(true);

	  return (
	    <>
	      <Button variant="primary" onClick={handleShow}>
		Delete Test	
	      </Button>

	      <Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
		  <Modal.Title>OK to Delete ?</Modal.Title>
		</Modal.Header>
		<Modal.Body>Please confirm you wish to delete this Todo</Modal.Body>
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

export default ModalDeleteConfirmation;
