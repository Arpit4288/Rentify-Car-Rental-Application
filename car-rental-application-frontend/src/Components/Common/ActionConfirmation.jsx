import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const ActionConfirmation = ({ action, btnText, btnType, confirmationTitle }) => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAction = () => {
        action(); // Call the onDelete function passed as a prop to perform the actual delete action.
        handleClose(); // Close the modal after deletion.
    };



    return (
        <>
            <Button style={{marginRight: '0.8rem'}} variant={btnType} onClick={handleShow}>{btnText}</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Action Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to {confirmationTitle}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleAction}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ActionConfirmation