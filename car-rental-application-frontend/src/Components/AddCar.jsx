import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../Redux/Actions/carActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinners from './Common/LoadingSpinners';

const AddCar = () => {
    const { addedCar, addedCarLoading, addedCarMessage, addedCarError } = useSelector(state => state.car);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [maker, setMaker] = useState("");
    const [model, setModel] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [rentalPrice, setRentalPrice] = useState(0);

    // Add state for error messages
    const [makerError, setMakerError] = useState("");
    const [modelError, setModelError] = useState("");
    const [availableQuantityError, setAvailableQuantityError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");
    const [rentalPriceError, setRentalPriceError] = useState("");

    const setAllDefault = () => {
        setMaker("");
        setModel("");
        setAvailableQuantity("");
        setImageUrl("");
        setRentalPrice("");
        // Clear error messages
        setMakerError("");
        setModelError("");
        setAvailableQuantityError("");
        setImageUrlError("");
        setRentalPriceError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let isValid = true;

        if (maker.trim() === "") {
            setMakerError("Maker is required");
            isValid = false;
        } else {
            setMakerError("");
        }

        if (model.trim() === "") {
            setModelError("Model is required");
            isValid = false;
        } else {
            setModelError("");
        }

        if (availableQuantity === "" || availableQuantity < 0) {
            setAvailableQuantityError("Quantity must be greater than 0");
            isValid = false;
        } else {
            setAvailableQuantityError("");
        }

        if (imageUrl.trim() === "") {
            setImageUrlError("Image URL is required");
            isValid = false;
        } else {
            setImageUrlError("");
        }

        if (rentalPrice === "" || rentalPrice <= 0) {
            setRentalPriceError("Rental Price must be greater than 0");
            isValid = false;
        } else {
            setRentalPriceError("");
        }

        if (!isValid) {
            return;
        }

        const carData = {
            maker,
            model,
            availableQuantity,
            imageUrl,
            rentalPrice
        }

        try {
            dispatch(addCar(carData));
        } catch (error) {
            toast.error("Adding car Request Failed");
        }
    }
    useEffect(() => {
        if (addedCarMessage) {
            if (addedCarMessage == "Success") {
                toast.success("Car Added successfuly");
                dispatch({ type: 'clearAddedCarMessage' });
                dispatch({ type: 'clearAddedCarError' });
                setAllDefault();
                navigate('/');
            }
            if (addedCarMessage == "Failed") {
                toast.warning("Adding car Action Failed");
            }
            dispatch({ type: 'clearAddedCarMessage' });
        }
        if (addedCarError) {
            toast.error(addedCarError);
            dispatch({ type: 'clearAddedCarError' });
        }


    }, [addedCarLoading])


    return (
        <>
            <LoadingSpinners show={addedCarLoading} />
            <section className="form box-shadow add-car-container">
                <div className="form-child add-car-container-child">
                    <Form onSubmit={handleSubmit} className='add-car-form'>
                        <Form.Group className="mb-1" controlId="formBasicMaker">
                            <Form.Label>Maker</Form.Label><span className='text-danger'>*</span>
                            <Form.Control
                                value={maker}
                                size="sm"
                                type="text"
                                placeholder="Maker of the car"
                                onChange={(e) => setMaker(e.target.value)}
                            />
                            <span className="text-danger">{makerError}</span> {/* Display error message */}
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicModel">
                            <Form.Label>Model</Form.Label><span className='text-danger'>*</span>
                            <Form.Control
                                value={model}
                                size="sm"
                                type="text"
                                placeholder="Model of the car"
                                onChange={(e) => setModel(e.target.value)}
                            />
                            <span className="text-danger">{modelError}</span> {/* Display error message */}
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicModel">
                            <Form.Label>Image URL</Form.Label><span className='text-danger'>*</span>
                            <Form.Control
                                value={imageUrl}
                                size="sm"
                                type="link"
                                placeholder="Image of the car"
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <span className="text-danger">{imageUrlError}</span> {/* Display error message */}
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label><span className='text-danger'>*</span>
                            <Form.Control
                                value={availableQuantity}
                                size="sm"
                                type="number"
                                placeholder="Quantity of the car"
                                onChange={(e) => setAvailableQuantity(e.target.value)}
                            />
                            <span className="text-danger">{availableQuantityError}</span> {/* Display error message */}
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicRent">
                            <Form.Label>Rental Price</Form.Label><span className='text-danger'>*</span>
                            <Form.Control
                                value={rentalPrice}
                                size="sm"
                                type="number"
                                placeholder="Rent per day"
                                onChange={(e) => setRentalPrice(e.target.value)}
                            />
                            <span className="text-danger">{rentalPriceError}</span> {/* Display error message */}
                        </Form.Group>
                        <Button variant="" style={{ backgroundColor: '#272829', color: 'white' }} type="submit">
                            Add
                        </Button>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default AddCar