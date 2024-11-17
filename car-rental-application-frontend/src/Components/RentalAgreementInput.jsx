import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import React from 'react'
import { useSelector } from 'react-redux';

const RentalAgreementInput = ({ totalDays = 0, carId, userId, rentFunction }) => {
    const { addDays } = require('date-fns');
    const { isAuthenticated, user, userError, userMessage, userLoading } = useSelector(state => state.user);

    const [show, setShow] = useState(false);

    const [numberOfDaysError, setNumberOfDaysError] = useState("");

    const handleClose = () => {
        if (totalDays != 0) setNumberOfDays(totalDays);
        else setNumberOfDays(0);
        setNumberOfDaysError("");
        setShow(false);
    };
    const handleShow = () => setShow(true);



    const [numberOfDays, setNumberOfDays] = useState(totalDays);
    const currentDate = new Date().toISOString().split('T')[0];
    const handleConfirm = () => {

        if (numberOfDays < 1) {
            setNumberOfDaysError("Numbar of Days must be greater than 0");
            return;
        }

        const startDate = new Date();
        const endDate = addDays(startDate, numberOfDays);
        const updatedAgreementData = {
            carId,
            userId,
            startDate,
            endDate,
        }
        rentFunction(updatedAgreementData);
        setShow(false);
    }


    useEffect(() => {
        if (totalDays > 0) setNumberOfDays(totalDays);
    }, [])


    return (
        <>
            {isAuthenticated && user.role === "Admin" ?
                <span></span> : <h1></h1>}
            <Button variant="" onClick={handleShow} style={{ background: '#272829', width: '7rem', height: '2.5rem', alignSelf: 'center' }} className='text-white' size="sm">{totalDays ? "Edit" : "Rent"}</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Rental Agreement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.Date">
                            <Form.Label>From</Form.Label>
                            <Form.Control value={currentDate} type="date" placeholder="Todays date" disabled required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.numberOfDays">
                            <Form.Label>Number of Days<span className='text-danger'>*</span></Form.Label>
                            <Form.Control value={numberOfDays} type="number" placeholder="Total Days" required onChange={(e) => setNumberOfDays(e.target.value)} />
                            <span className="text-danger">{numberOfDaysError}</span> {/* Display error message */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* {numberOfDays > 0 ? */}
                        <Button variant="primary" onClick={handleConfirm}>
                            Confirm
                        </Button> 
                         {/* : */}
                        {/* <Button variant="primary" disabled onClick={handleConfirm}>
                            Confirm
                        </Button> */}
                    {/* } */}

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RentalAgreementInput