import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getCarById, updateCar } from '../Redux/Actions/carActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinners from './Common/LoadingSpinners';

const EditCar = () => {
    const { car, carLoading, carError, carMessage, updatedCar, updatedCarLoading, updatedCarMessage, updatedCarError } = useSelector(state => state.car);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const Id = parseInt(params.id, 10);

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
            rentalPrice,
        }
        try {
            dispatch(updateCar(car.id, carData));
        } catch (error) {
            toast.error("Updating car Request Failed");
        }
    }

    useEffect(() => {
        if (carMessage) {
            if (carMessage !== "Success") {
                toast.error("Error in loading car data");
            }
            else {
                setMaker(car.maker);
                setModel(car.model);
                setAvailableQuantity(car.availableQuantity);
                setImageUrl(car.imageUrl);
                setRentalPrice(car.rentalPrice);
            }
        }
        dispatch({ type: 'clearCarMessage' });
        dispatch({ type: 'clearCarError' });

    }, [carLoading])


    useEffect(() => {
        dispatch(getCarById(Id));
    }, [])

    useEffect(() => {
        if (updatedCarMessage) {
            if (updatedCarMessage == "Success") {
                toast.success("Car Updated successfuly");
                dispatch({ type: 'clearUpdatedCarMessage' });
                dispatch({ type: 'clearUpdatedCarError' });
                setAllDefault();
                navigate('/');
            }
            if (updatedCarMessage == "Failed") {
                toast.warning("Updating car Action Failed");
            }
            dispatch({ type: 'clearUpdatedCarMessage' });
        }
        if (updatedCarError) {
            toast.error(updatedCarError);
            dispatch({ type: 'clearUpdatedCarError' });
        }


    }, [updatedCarLoading]);




    return (
        <>
            <LoadingSpinners show={carLoading || updatedCarLoading} />
            <section className="form box-shadow">
                <div className="form-child">
                    <Form onSubmit={handleSubmit}>
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
                                onChange={(e) => setAvailableQuantity(parseInt(e.target.value))}
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
                                onChange={(e) => setRentalPrice(parseFloat(e.target.value))}
                            />
                            <span className="text-danger">{rentalPriceError}</span> {/* Display error message */}
                        </Form.Group>
                        <Button variant="" style={{ backgroundColor: '#272829', color: 'white' }} type="submit">
                            Update
                        </Button>
                    </Form>
                </div>
            </section>
        </>
    )
}
export default EditCar