import React, { useState } from 'react';
//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//
export const ToggleCompletedIconAndConfirmation = ({handleToggleCompletion, logtestfunction, todoid, isCompleted }) => {

    const [show, setShow] = useState(false);

    const handleToggleAndClose = async () => {
      logtestfunction(`handleToggleAndClose for ${todoid}`)
      await handleToggleCompletion(todoid, isCompleted)
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
        {isCompleted ? ( 
          <i
            className="bi bi-check-circle text-primary "
            role="button"
            aria-label="Delete"
            onClick={handleShow}
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'primary' }}
          ></i>
        ):( 
          <i
            className="bi bi-circle text-primary "
            role="button"
            aria-label="Delete"
            onClick={handleShow}
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'primary' }}
          ></i>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {isCompleted ? ( 
              <Modal.Title>OK to Un-complete ?</Modal.Title>
            ):(
              <Modal.Title>OK to Complete ?</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {isCompleted ? ( 
              <span>Please confirm you wish to un-complete this Todo</span>
            ):(
              <span>Please confirm you wish to mark this Todo as completed</span>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleToggleAndClose}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ToggleCompletedIconAndConfirmation;
