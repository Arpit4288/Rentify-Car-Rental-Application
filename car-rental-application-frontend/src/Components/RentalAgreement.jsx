import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsPencil, BsTrash, BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import { useState } from 'react';
import RentalAgreementInput from './RentalAgreementInput';
import PageNotFound from './Common/PageNotFound';
import LoadingSpinners from './Common/LoadingSpinners';
import SingleAgreementSkeleton from './Common/Skeletons/SingleAgreementSkeleton';
import DeleteConfirmationModal from './Common/DeleteConfirmationModal';
import { acceptAgreement, approveAgreement, approveReturn, deleteAgreement, getAgreementsById, requestReturn, updateAgreement } from '../Redux/Actions/agreementActions';
import { toast } from 'react-toastify';
import ActionConfirmation from './Common/ActionConfirmation';

function CustomStepper(props) {

    return (
        <Stepper
            {...props}
            activeColor="#ffbd13"
            defaultColor="gray"
            completeColor="green"
            activeTitleColor="#ffbd13"
            completeTitleColor="black"
            defaultTitleColor="#bbb"
            circleFontColor="#000"
            completeBarColor="#ffbd13" />
    );
}
// createdAgreement, createdAgreementLoading, createdAgreementMessage, createdAgreementError,

const RentalAgreement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const agreementId = parseInt(params.id, 10);
    const { isAuthenticated, user, userError, userMessage, userLoading } = useSelector(state => state.user);



    const {
        // Single Agreement
        agreement, agreementLoading, agreementMessage, agreementError,

        // Updated Agreement
        updatedAgreement, updatedAgreementLoading, updatedAgreementMessage, updatedAgreementError,

        // Deleted Agreement
        deletedAgreementLoading, deletedAgreementMessage, deletedAgreementError,

        // Accepted Agreement
        acceptAgreementLoading, acceptAgreementMessage, acceptAgreementError,

        // Approved Agreement
        approveAgreementLoading, approveAgreementMessage, approveAgreementError,

        // RequestForReturn Agreement
        requestReturnLoading, requestReturnMessage, requestReturnError,

        // ArppvedReturn Agreement
        approveReturnLoading, approveReturnMessage, approveReturnError,
    } = useSelector(state => state.agreement)




    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: 'Pending' },
        { title: 'T&C Accepted' },
        { title: 'Booking Approved' },
        { title: 'Requested for Return' },
        { title: 'Returned' },
    ];


    useEffect(() => {
        let agreementStatus;
        if (agreement) {
            agreementStatus = agreement.rentalAgreement.agreementStatus;
            switch (agreementStatus) {
                case 'Pending':
                    setActiveStep(0);
                    break;
                case 'Accepted':
                    setActiveStep(1);
                    break;
                case 'Approved':
                    setActiveStep(2);
                    break;
                case 'ReturnRequest':
                    setActiveStep(3);
                    break;
                case 'Returned':
                    setActiveStep(4);
                    break;
                default:
                    setActiveStep(0); // Default to the first step if status is unknown
                    break;
            };

        }
    }, [agreementLoading, updatedAgreementLoading, deletedAgreementLoading, acceptAgreementLoading, approveAgreementLoading, requestReturnLoading, approveReturnLoading])




    



    // ..............Agreement Loading................................................

    useEffect(() => {
        dispatch(getAgreementsById(agreementId));
    }, [updatedAgreementLoading, acceptAgreementLoading, approveAgreementLoading, requestReturnLoading, approveReturnLoading])

    useEffect(() => {
        if (agreementMessage) {
            if (agreementMessage == "Success") {
                dispatch({ type: 'clearAgreementMessage' });
                dispatch({ type: 'clearAgreementError' });
            }
            if (agreementMessage == "Failed") {
                toast.error("Error in loading Agreement");
                navigate('/agreements');
            }
            dispatch({ type: 'clearAgreementMessage' });
        }
        if (agreementError) {
            toast.error(agreementError);
            dispatch({ type: 'clearAgreementError' });
            navigate('/agreements');
        }

    }, [agreementLoading]);
    // ............................................................................................




    // ...............Agreement Updating ..................

    const editAgreementFunction = (updatedAgreementData) => {
        dispatch(updateAgreement(agreementId, updatedAgreementData));
    }

    useEffect(() => {
        if (updatedAgreementMessage) {
            if (updatedAgreementMessage == "Success") {
                dispatch({ type: 'clearUpdateAgreementMessage' });
                dispatch({ type: 'clearUpdateAgreementError' });
                toast.success("Agreement updated successfuly");
            }
            if (updatedAgreementMessage == "Failed") {
                toast.error("Error in updating Agreement");
            }
            dispatch({ type: 'clearUpdateAgreementMessage' });
        }
        if (updatedAgreementError) {
            toast.error(updatedAgreementError);
            dispatch({ type: 'clearUpdateAgreementError' });
        }

    }, [updatedAgreementLoading]);

    // ..........................................



    //.................User Acions  (Accepting and Request for Return)..............................................................


    const userAction = () => {
        if (agreement.rentalAgreement.agreementStatus === "Pending") {
            dispatch(acceptAgreement(agreementId));
        }
        if (agreement.rentalAgreement.agreementStatus === "Approved") {
            dispatch(requestReturn(agreementId));
        }
    }

    //>>>>>>>>>>> checking Accepting Done or not

    useEffect(() => {
        if (acceptAgreementMessage) {
            if (acceptAgreementMessage == "Success") {
                toast.success("Congratulations !!! You Accepted the Agreement!!!");
                dispatch({ type: 'clearAcceptAgreementMessage' });
                dispatch({ type: 'clearAcceptAgreementError' });
                navigate(`/agreement/${agreementId}`);
            }
            if (acceptAgreementMessage == "Failed") {
                toast.error("Action Not Done Try Again !!");
            }
            dispatch({ type: 'clearAcceptAgreementMessage' });
        }
        if (acceptAgreementError) {
            toast.error(acceptAgreementError);
            dispatch({ type: 'clearAcceptAgreementError' });
        }
    }, [acceptAgreementLoading])


    //>>>>>>>>>>> checking Request For Return Done or not

    useEffect(() => {
        if (requestReturnMessage) {
            if (requestReturnMessage == "Success") {
                toast.success("Your Return request Submitted !!!");
                dispatch({ type: 'clearRequestReturnMessage' });
                dispatch({ type: 'clearRequestReturnError' });
                navigate(`/agreement/${agreementId}`);
            }
            if (requestReturnMessage == "Failed") {
                toast.error("Action Not Done Try Again !!");
            }
            dispatch({ type: 'clearRequestReturnMessage' });
        }
        if (requestReturnError) {
            toast.error(requestReturnError);
            dispatch({ type: 'clearRequestReturnError' });
        }
    }, [requestReturnLoading])

    //...............................................................................................





    //.................Admin Acions  (Approval and Mark as Return)..............................................................

    const adminAction = () => {
        if (agreement.rentalAgreement.agreementStatus === "Accepted") {
            dispatch(approveAgreement(agreementId));
        }
        if (agreement.rentalAgreement.agreementStatus === "ReturnRequest") {
            dispatch(approveReturn(agreementId));
        }
    }

    //>>>>>>>>>>> checking Approval Done or not

    useEffect(() => {
        if (approveAgreementMessage) {
            if (approveAgreementMessage == "Success") {
                toast.success("Agreement Approved !!!");
                dispatch({ type: 'clearApproveAgreementMessage' });
                dispatch({ type: 'clearApproveAgreementError' });
                navigate(`/agreement/${agreementId}`);
            }
            if (approveAgreementMessage == "Failed") {
                toast.error("Action Not Done Try Again !!");
            }
            dispatch({ type: 'clearApproveAgreementMessage' });
        }
        if (approveAgreementError) {
            toast.error(approveAgreementError);
            dispatch({ type: 'clearApproveAgreementError' });
        }
    }, [approveAgreementLoading])


    //>>>>>>>>>>> checking Returned approved or not

    useEffect(() => {
        if (approveReturnMessage) {
            if (approveReturnMessage == "Success") {
                toast.success("The car has retured !!");
                dispatch({ type: 'clearApproveReturnMessage' });
                dispatch({ type: 'clearApproveReturnError' });
            }
            if (approveReturnMessage == "Failed") {
                toast.error("Action Not Done Try Again !!");
            }
            dispatch({ type: 'clearApproveReturnMessage' });
        }
        if (approveReturnError) {
            toast.error(approveReturnError);
            dispatch({ type: 'clearApproveReturnError' });
        }
    }, [approveReturnLoading])


    //...............................................................................................................


    //  ................. Agreement Deletion ........................................................
    const handleDelete = () => {
        console.log("Deletion...............");
        dispatch(deleteAgreement(agreementId));
    }

    useEffect(() => {
        if (deletedAgreementMessage) {
            if (deletedAgreementMessage == "Success") {
                toast.success("Agreement Deleted");
                dispatch({ type: 'clearDeleteAgreementMessage' });
                dispatch({ type: 'clearDeleteAgreementError' });
                navigate('/agreements');
            }
            if (deletedAgreementMessage == "Failed") {
                toast.error("Agreement Deletion Failed");
            }
            dispatch({ type: 'clearDeleteAgreementMessage' });
        }
        if (deletedAgreementError) {
            toast.error(deletedAgreementError);
            dispatch({ type: 'clearDeleteAgreementError' });
        }
    }, [deletedAgreementLoading]);

    // .........................................................................................




    if (!isAuthenticated) {
        return (
            <>
                <PageNotFound />
            </>
        )
    }



    if (agreementLoading) {
        return (
            <>
                <SingleAgreementSkeleton />
            </>
        )
    }

    if (!agreement) {
        return (<PageNotFound />)
    }


    return (
        <>
            <LoadingSpinners show={updatedAgreementLoading | deletedAgreementLoading | acceptAgreementLoading | approveAgreementLoading | requestReturnLoading | approveReturnLoading} />
            <div className="container mt-0">
                <Card style={{ backgroundColor: 'rgb(238, 232, 214)' }} className='box-shadow'>
                    {user.role === "Admin" ?
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{}}>
                                <h3>Agreement Details</h3>
                            </div>
                            <div style={{ width: 'auto' }} className='d-flex align-items-center'>
                                <mark className='text-danger'>Admin View</mark>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {agreement.rentalAgreement.agreementStatus === "Accepted" || agreement.rentalAgreement.agreementStatus === "ReturnRequest" ?
                                    <ActionConfirmation action={adminAction} btnText={agreement.rentalAgreement.agreementStatus === "Accepted" ? "Approve" : agreement.rentalAgreement.agreementStatus === "ReturnRequest" ? "Inspect" : ""} btnType={"success"} confirmationTitle={agreement.rentalAgreement.agreementStatus === "Accepted" ? "Approve the Booking" : "Mark the car as Returned"} />
                                    :
                                    <span></span>}
                                {agreement.rentalAgreement.agreementStatus !== "Returned" && <RentalAgreementInput totalDays={agreement.rentalAgreement.rentalDurationinDays} rentFunction={editAgreementFunction} carId={agreement.rentalAgreement.carId} userId={agreement.rentalAgreement.userId} />}
                                <DeleteConfirmationModal onDelete={handleDelete} />
                            </div>
                        </Card.Header>
                        :
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{}}>
                                <h3>Agreement Details</h3>
                            </div>
                            {agreement.rentalAgreement.agreementStatus === "Pending" || agreement.rentalAgreement.agreementStatus === "Approved" ?
                                <div style={{ width: 'auto' }} className='d-flex align-items-center'>
                                    <ActionConfirmation action={userAction} btnText={agreement.rentalAgreement.agreementStatus === "Pending" ? "Accept Booking?" : "Return Car?"} btnType={"info"} confirmationTitle={agreement.rentalAgreement.agreementStatus === "Pending" ? "Accept the Booking" : "Returned the car now"} />
                                </div>
                                :
                                <div style={{ width: 'auto' }} className='d-flex align-items-center'>
                                    <mark>{agreement.rentalAgreement.agreementStatus === "Returned" ? "Your car has returned" : agreement.rentalAgreement.agreementStatus === "Accepted"? "Waiting for Approval": "Waiting for Inspection"}</mark>
                                </div>
                            }

                            {agreement.rentalAgreement.agreementStatus === "Pending" &&
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <RentalAgreementInput totalDays={agreement.rentalAgreement.rentalDurationinDays} rentFunction={editAgreementFunction} carId={agreement.rentalAgreement.carId} userId={agreement.rentalAgreement.userId} />
                                        <DeleteConfirmationModal onDelete={handleDelete} />
                                    </div>
                                </>
                            }
                        </Card.Header>
                    }

                    <Card.Body>
                        <div className="row">
                            <div className="col-md-4 agreement-page-img-container">
                                <img src={agreement.car.imageUrl} alt={`${agreement.car.maker} ${agreement.car.model}`} className="agreement-page-img" />
                            </div>
                            <div className="col-md-8">
                                <h4>{`${agreement.car.maker} ${agreement.car.model}`}</h4>
                                <p>Rental Price: <strong className="text-success">{agreement.car.rentalPrice.toFixed(2)} INR / Day</strong></p>
                                <p>Start Date: {new Date(agreement.rentalAgreement.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(agreement.rentalAgreement.endtDate).toLocaleDateString()}</p>
                                <p>Duration: {agreement.rentalAgreement.rentalDurationinDays}</p>
                                <p>Total Cost: <strong>{agreement.rentalAgreement.totalCost.toFixed(2)} INR</strong></p>
                                <div className="stepper">
                                    <div className="container">
                                        <CustomStepper steps={steps} activeStep={activeStep} />
                                        <div style={{ padding: '20px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default RentalAgreement