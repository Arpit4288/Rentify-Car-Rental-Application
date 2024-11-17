import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
function AboutUs() {
  return (
    <div className="container mt-4 about-us">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mb-4 text-shadow">About Us</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-light border-0 mb-4" style={{minHeight: '10rem'}}>
            <div className="card-body box-shadow" style={{backgroundColor: '#fff4d6'}}>
              <h5 className="card-title text-dark text-shadow">Our Mission</h5>
              <p className="card-text">
              At Car Rental Application, our mission is to provide hassle-free car rentals, 
              combining affordability with quality service. Our goal is to be your trusted partner on the road, 
              offering a wide selection of well-maintained vehicles and exceptional customer care.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-light border-0 mb-4" style={{minHeight: '10rem'}}>
            <div className="card-body box-shadow" style={{backgroundColor: '#fff4d6'}}>
              <h5 className="card-title text-dark text-shadow">Meet the Team</h5>
              <p className="card-text ">
                Arpit Dhuriya - Creater & Designer: .Net Trainee At Nagarro Softwares Pvt. Ltd.
                Created This is Application where anyone can Rent car based on his/her needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p className="lead text-center">
            We are dedicated to providing valuable insights and information to
            our readers. Join us in our journey to learn and grow together.
          </p>
          <div className="text-center">
            <Link to="/" className="btn btn-secondary btn-lg">
              Get Your Car
              <BsArrowRight style={{margin: '0 0 2px 10px', fontSize: '30px'}}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
