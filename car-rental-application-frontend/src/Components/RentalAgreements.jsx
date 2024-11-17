import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import { BiEdit } from "react-icons/bi";
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { getAllAgreements, getAllAgreementsByUserId } from '../Redux/Actions/agreementActions';
import { toast } from 'react-toastify';
import LoadingSpinners from './Common/LoadingSpinners';



const RentalAgreements = () => {

  const dispatch = useDispatch();

  const { isAuthenticated, user, userError, userMessage, userLoading } = useSelector(state => state.user);

  const { agreements, agreementsLoading, agreementsMessage, agreementsError } = useSelector(state => state.agreement)

  const navigate = useNavigate();


  const handleEdit = () => {

  }

  const handleDelete = () => {

  }


  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
    else{
      if(user.role === "Admin"){
        dispatch(getAllAgreements());
      }
      if(user.role === "Regular"){
        dispatch(getAllAgreementsByUserId(user.id));
      }
    }
  }, [])

  useEffect(() => {
    if (agreementsMessage) {
      if (agreementsMessage == "Failed") {
        toast.error("Error is Fetching Agreements");
      }
      dispatch({ type: 'clearAgreementsMessage' });
    }
    if (agreementsError) {
      toast.error(agreementsError);
      dispatch({ type: 'clearAgreementsError' });
    }
  }, [agreementsLoading]);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])

  return (
    <>
      <LoadingSpinners show={agreementsLoading} />
      <section className="rental-agreements-section">
        <div className="text-center mt-4 text-shadow"><h1>List of Agreements</h1></div>
        <Table striped bordered hover variant="warning" className="rental-agreement-table text-shadow box-shadow">
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th className='text-center'>Maker</th>
              <th className='text-center'>Model</th>
              <th className='text-center'>Start Date</th>
              <th className='text-center'>End Date</th>
              <th className='text-center'>Cost</th>
              <th className='text-center'>Total Cost</th>
              <th className='text-center'>Status</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {agreements?.map((item, index) => (
              <tr key={index}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{item.car.maker}</td>
                <td className='text-center'>{item.car.model}</td>
                <td className='text-center'>{item.rentalAgreement.startDate.split('T')[0]}</td>
                <td className='text-center'>{item.rentalAgreement.endtDate.split('T')[0]}</td>
                <td className='text-center'>{item.car.rentalPrice} / Day</td>
                <td className='text-center'>{item.rentalAgreement.totalCost}</td>
                <td className='text-center'>{item.rentalAgreement.agreementStatus}</td>
                {/* // Panding --> Accepted --> Approved --> RequestForReturn --> Approve Return */}
                <td style={{display: 'flex', justifyContent: 'center'}}>
                  <Link to={`/agreement/${item.rentalAgreement.id}`}>
                    <Button style={{ backgroundColor: '#61677A' }} variant='secondary'>View</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  )
}

export default RentalAgreements