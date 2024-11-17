import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCars } from '../Redux/Actions/carActions';
import CarsSkeleton from './Common/Skeletons/CarsSkeleton';
import FilterSearchComponent from './Common/FilterSearchComponent';
import { useCarSerch } from '../Context/userCarContext';
import { useState } from 'react';


const Home = () => {

  const { searchKeyword, availableOnly, selectedFilter, priceRange } = useCarSerch();
  const { cars, carsLoading, carsError, carsMessage } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  const filterCars = () => {
    return cars
      ?.filter((car) => {
        const isMatch =
          (selectedFilter === 'Maker' &&
            car.maker.toLowerCase().includes(searchKeyword?.toLowerCase())) ||
          (selectedFilter === 'Model' &&
            car.model.toLowerCase().includes(searchKeyword?.toLowerCase()));

        const isAvailable = !availableOnly || (availableOnly && car.availableQuantity > 0);

        const isInRange =
          priceRange[0] <= car.rentalPrice && car.rentalPrice <= priceRange[1];

        return isMatch && isAvailable && isInRange;
      })
  };

  const [filteredCars, setFilteredCars] = useState(filterCars());

  useEffect(() => {
    setFilteredCars(filterCars());
  }, [searchKeyword, availableOnly, selectedFilter, priceRange, carsLoading, cars]);


  useEffect(() => {
    if (carsMessage) {
      if (carsMessage === "Failed") {
        toast.error("Error is Fetching the Cars");
      }
      dispatch({ type: 'clearCarsMessage' });
    }
    if (carsError) {
      toast.error(carsError);
      dispatch({ type: 'clearCarsError' });
    }
  }, [carsLoading]);




  if (carsLoading) {
    return (
      <>
        <CarsSkeleton />
      </>
    )
  }



  return (
    <>
      <Row className=''>
        <FilterSearchComponent />
        {!filteredCars || filteredCars.length === 0 ?
          <div className="cars-empty text-center">
            <div className="no-cars-container">
              <h1 className="no-cars-heading">No Cars Found</h1>
              <p className="no-cars-text">There are currently no cars available!!</p>
            </div>
          </div>
          :
          <div className='home-all-cars'>
            {filteredCars?.map((car) => (
              <div key={car.id} className='home-car-outer'>
                <Link to={`/car/${car.id}`} className="text-decoration-none">
                  <Card className='home-car box-shadow hover-shadow'>
                    <div className='card-image-container'>
                      <Card.Img className='home-car-img' variant="top" src={car.imageUrl} alt={`${car.maker} ${car.model}`} />
                    </div>

                    <Card.Body>
                      <Card.Title>{`${car.maker} ${car.model}`}</Card.Title>
                      <Card.Text>
                        Rental Price: <strong className='text-success'>{car.rentalPrice.toFixed(2)} INR / Day</strong>
                      </Card.Text>
                      {car.availableQuantity >= 1 ?
                        <Card.Text className='text-success' style={{ fontSize: '20px' }}>
                          Available
                        </Card.Text>
                        : <Card.Text className='text-danger' style={{ textDecoration: 'line-through', fontSize: '20px' }}>
                          Available
                        </Card.Text>
                      }
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        }
      </Row>
    </>
  )
}

export default Home