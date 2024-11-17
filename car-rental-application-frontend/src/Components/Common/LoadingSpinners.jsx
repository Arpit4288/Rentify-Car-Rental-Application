import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinners = ({show}) => {

    if(!show){
        return null;
    }

    return (
        <div className="spinner-container">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingSpinners

/*

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingSpinner
*/