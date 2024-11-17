import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { MdDelete } from "react-icons/md";
function DeleteConfirmationModal({ onDelete }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        onDelete(); // Call the onDelete function passed as a prop to perform the actual delete action.
        handleClose(); // Close the modal after deletion.
    };

    return (
        <>
            <MdDelete className='text-danger' style={{ fontSize: '3rem', cursor: 'pointer' }} onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteConfirmationModal;
