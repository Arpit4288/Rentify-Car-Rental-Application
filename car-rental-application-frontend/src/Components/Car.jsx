import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import PageNotFound from './Common/PageNotFound'
import { BsCurrencyRupee } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmationModal from './Common/DeleteConfirmationModal';
import RentalAgreementInput from './RentalAgreementInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCar, getCarById } from '../Redux/Actions/carActions';
import SingleCarSkeleton from './Common/Skeletons/SingleCarSkeleton';
import LoadingSpinners from './Common/LoadingSpinners';
import { toast } from 'react-toastify';
import { createAgreement } from '../Redux/Actions/agreementActions';

const Car = () => {
  const { isAuthenticated, user, userError, userMessage, userLoading, } = useSelector(state => state.user);
  const { car, carLoading, carError, carMessage, deletedCar, deletedCarLoading, deletedCarMessage, deletedCarError } = useSelector(state => state.car);
  const { createdAgreement, createdAgreementLoading, createdAgreementMessage, createdAgreementError } = useSelector(state => state.agreement);
  const navigate = useNavigate();

  const params = useParams();
  const Id = parseInt(params.id, 10);

  const dispatch = useDispatch();


  // ......... Loading Car..................................
  useEffect(() => {
    dispatch(getCarById(Id));
    dispatch({ type: 'clearCarMessage' });
    dispatch({ type: 'clearCarError' });
  }, [])

  useEffect(() => {
    if (carMessage) {
      if (carMessage == "Success") {
        dispatch({ type: 'clearCarMessage' });
        dispatch({ type: 'clearCarError' });
      }
      if (carMessage == "Failed") {
        toast.error("Error in loading Car Data");
        navigate('/');
      }
      dispatch({ type: 'clearCarMessage' });
    }
    if (carError) {
      toast.error(carError);
      dispatch({ type: 'clearCarError' });
      navigate('/');
    }


  }, [carLoading]);

  // ..........................................


  // ..............Agreement Creation............................

  const rentFunction = (agreementData) => {
    dispatch(createAgreement(agreementData));
  }

  useEffect(() => {
    if (createdAgreementMessage) {
      if (createdAgreementMessage == "Success") {
        toast.success("Woof woof Your Agreement Created");
        dispatch({ type: 'clearCreateAgreementMessage' });
        dispatch({ type: 'clearCreateAgreementError' });
        navigate('/agreements');
      }
      if (createdAgreementMessage == "Failed") {
        toast.error("Car Deletion Failed");
      }
      dispatch({ type: 'clearCreateAgreementMessage' });
    }
    if (createdAgreementError) {
      toast.error(createdAgreementError);
      dispatch({ type: 'clearCreateAgreementError' });
    }


  }, [createdAgreementLoading]);

  // ...............................................




  //.................Car Deletion...........................

  const handleDeleteClick = () => {
    try {
      dispatch(deleteCar(car.id));
    } catch (error) {
    }
  };

  useEffect(() => {
    if (deletedCarMessage) {
      if (deletedCarMessage == "Success") {
        toast.success("Car Deleted successfuly");
        dispatch({ type: 'clearDeletedCarMessage' });
        dispatch({ type: 'clearDeletedCarError' });
        navigate('/');
      }
      if (deletedCarMessage == "Failed") {
        toast.error("Car Deletion Failed");
      }
      dispatch({ type: 'clearDeletedCarMessage' });
    }
    if (deletedCarError) {
      toast.error(deletedCarError);
      dispatch({ type: 'clearDeletedCarError' });
    }
  }, [deletedCarLoading])

  // .......................................................



  if (carLoading) {
    return (
      <>
        <SingleCarSkeleton />
      </>
    )
  }


  if (!carLoading && !car) {
    return (<PageNotFound />)
  }



  return (
    <>
      <LoadingSpinners show={carLoading || deletedCarLoading || createdAgreementLoading} />
      <Card style={{ width: '25rem', marginTop: '-1rem', backgroundColor: 'rgb(238, 232, 214)' }} className='box-shadow hover-shadow cursor-default'>
        <div className='car-page-img-container'></div>
        <Card.Img className='car-page-image' variant="top" src={car.imageUrl} />
        <Card.Body>
          <Card.Title>{car.maker} {car.model}</Card.Title>
          <Card.Text>
            Rental Price: <strong className='text-success'>{car.rentalPrice} INR / Day</strong>
          </Card.Text>
          {car.availableQuantity < 1 ?
            <span className='text-danger d-flex justify-content-start align-items-center mb-2' style={{ fontSize: '1.5rem', fontWeight: '500', textDecoration: '' }}><strong>Not Available</strong></span>
            :
            <span className='text-success d-flex justify-content-start align-items-center mb-2' style={{ fontSize: '1.5rem', fontWeight: '500', textDecoration: '' }}>Available</span>

          }

          <div style={{ display: 'flex', justifyContent: 'center', border: '' }}>
            {isAuthenticated ?
              <>
                <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {user.role === "Regular" && car.availableQuantity > 0 ? <RentalAgreementInput carId={car.id} userId={user.id} rentFunction={rentFunction} /> : <span></span>}
                </div>
                {user.role === "Admin" &&
                  <div style={{ width: '60%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '-3rem' }}>
                    <Link to={`/edit-car/${car.id}`}>
                      <BiEdit className='text-warning' style={{ fontSize: '3rem', cursor: 'pointer' }} />
                    </Link>
                    <DeleteConfirmationModal onDelete={handleDeleteClick} />
                  </div>
                }

              </>
              :
              <span className='text-warning d-flex justify-content-center align-items-center' style={{ fontSize: '1.6rem' }}>Login to see options</span>
            }
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Car