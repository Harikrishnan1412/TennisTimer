import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmationProps {
  onDelete: (id: number | string, name:string) => void;
  id : number | string;
  name:string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onDelete ,id ,name}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    onDelete(id,name);
    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
      <i className="bi bi-trash"></i> Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete "{name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
