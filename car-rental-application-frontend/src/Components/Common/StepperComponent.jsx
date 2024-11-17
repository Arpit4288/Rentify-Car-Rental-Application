import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Stepper from 'react-stepper-horizontal';



const rentalAgreement = {
    "id": 3,
    "carId": 11,
    "userId": 2,
    "startDate": "2023-09-16T13:22:18.452",
    "endtDate": "2023-09-16T13:22:18.453",
    "rentalDurationinDays": 1,
    "totalCost": 1900.00,
    "agreementStatus": "Pending",
    "car": {
        "id": 11,
        "maker": "Hundai",
        "model": "Sonata",
        "availableQuantity": 1,
        "imageUrl": "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/BMW-2-Series-Gran-Coupe-271220221147.jpg",
        "rentalPrice": 1900.00
    }
}


function CustomStepper(props) {


    return (
        <Stepper
            {...props}
            activeColor="#ffbd13"
            defaultColor="red"
            completeColor="green"
            activeTitleColor="#ffbd13"
            completeTitleColor="black"
            defaultTitleColor="#bbb"
            circleFontColor="#000"
            completeBarColor="#ffbd13" />
    );
}

function Pending() {
    return <h2>Your Action required</h2>;
}

function Accepted() {
    return <h2>T&C Accepted</h2>;
}

function Approved() {
    return <h2>Booking Approved</h2>;
}
function RequestForReturn() {
    return <h2>Return request Submitted</h2>;
}
function Confirmation() {
    return <h2>Inspection Approved</h2>;
}


const StepperComponent = () => {
    const {isAuthenticated, user, userError, userMessage, userLoading} = useSelector(state => state.user);

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: 'Pending' },
        { title: 'T&C Accepted' },
        { title: 'Booking Approved' },
        { title: 'Requested for Return' },
        { title: 'Returned' },
    ];

    function getSectionComponent() {
        switch (activeStep) {
            case 0: return <Pending />;
            case 1: return <Accepted />;
            case 2: return <Approved />;
            case 3: return <RequestForReturn />;
            case 4: return <Confirmation />;
            default: return null;
        }
    }

    let adminButton = "";
    let regularUserButton = "";
    if (rentalAgreement.agreementStatus === "Pending") {
        adminButton = "Accept T&C";
        regularUserButton = "Accept T&C";
    } else if (rentalAgreement.agreementStatus === "Accepted") {
        adminButton = "Approve";
        regularUserButton = "Wait For Approval";
    } else if (rentalAgreement.agreementStatus === "Approved") {
        adminButton = "Request For Return";
        regularUserButton = "Request For Return";
    } else if (rentalAgreement.agreementStatus === "ReturnRequest") {
        adminButton = "Inspect";
        regularUserButton = "Wait for Inspection";
    } else if (rentalAgreement.agreementStatus === "Returned") {
        adminButton = "";
        regularUserButton = "";
    }

    return (
        <>
            {user.role === "Admin" ?
                <div className="container">
                    <CustomStepper
                        steps={steps}
                        activeStep={activeStep} />
                    <div style={{ padding: '20px' }}>
                        {getSectionComponent()}

                        {activeStep !== steps.length - 1
                            && <button onClick={() => setActiveStep(activeStep + 1)}>{adminButton}</button>
                        }
                    </div>
                </div>
                :
                <div className="container">
                    <CustomStepper
                        steps={steps}
                        activeStep={activeStep} />
                    <div style={{ padding: '20px' }}>
                        {getSectionComponent()}

                        {activeStep !== steps.length - 1
                            && <button onClick={() => setActiveStep(activeStep + 1)}>{regularUserButton}</button>
                        }
                    </div>
                </div>
            }

        </>
    );
}

export default StepperComponent