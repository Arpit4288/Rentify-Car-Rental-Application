import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import { ProgressBar } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

const SingleAgreementSkeleton = () => {
    return (
        <>
            <div className="container mt-4">
                <Card style={{ backgroundColor: "rgb(238, 232, 214)" }} className="box-shadow">
                    <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <h3>
                                <Placeholder as="span" animation="glow">
                                    Agreement Details
                                </Placeholder>
                            </h3>
                        </div>
                        <div style={{ width: "auto" }} className="d-flex align-items-center">

                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>

                        </div>
                    </Card.Header>

                    <Card.Body>
                        <div className="row">
                            <div className="col-md-4">
                            <Card.Img variant="top" src="data:image/jpeg;base64,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" />
                            </div>
                            <div className="col-md-8">
                                <h4>
                                    <Placeholder as="span" animation="glow">
                                        Car Maker Model
                                    </Placeholder>
                                </h4>
                                <p>
                                    Rental Price:{" "}
                                    <strong className="text-success">
                                        <Placeholder as="span" animation="glow">
                                            0.00 INR / Day
                                        </Placeholder>
                                    </strong>
                                </p>
                                <p>
                                    Start Date:{" "}
                                    <Placeholder as="span" animation="glow">
                                        MM/DD/YYYY
                                    </Placeholder>
                                </p>
                                <p>
                                    End Date:{" "}
                                    <Placeholder as="span" animation="glow">
                                        MM/DD/YYYY
                                    </Placeholder>
                                </p>
                                <p>
                                    Total Cost:{" "}
                                    <strong>
                                        <Placeholder as="span" animation="glow">
                                            0.00 INR
                                        </Placeholder>
                                    </strong>
                                </p>
                                <div className="stepper">
                                    <div className="container">
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                        <Placeholder xs={10} />

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

export default SingleAgreementSkeleton;



















/*

import React from "react";
import { Card, Button, ProgressBar, Placeholder } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

function AgreementCardSkeleton() {
  return (
    <div className="container mt-4">
      <Card style={{ backgroundColor: "rgb(238, 232, 214)" }} className="box-shadow">
        <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>
              <Placeholder as="span" animation="glow">
                Agreement Details
              </Placeholder>
            </h3>
          </div>
          <div style={{ width: "auto" }} className="d-flex align-items-center">
            <mark className="text-danger">
              <Placeholder as="span" animation="glow">
                Admin View
              </Placeholder>
            </mark>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button style={{ marginRight: "0.3rem" }} variant="success">
              <Placeholder as="span" animation="glow">
                Approve
              </Placeholder>
            </Button>
            <Button style={{ marginLeft: "0.3rem" }} variant="danger">
              <BsTrash /> <Placeholder as="span" animation="glow">
                Delete
              </Placeholder>
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="row">
            <div className="col-md-4">
              <Placeholder as="img" animation="glow" />
            </div>
            <div className="col-md-8">
              <h4>
                <Placeholder as="span" animation="glow">
                  Car Maker Model
                </Placeholder>
              </h4>
              <p>
                Rental Price:{" "}
                <strong className="text-success">
                  <Placeholder as="span" animation="glow">
                    0.00 INR / Day
                  </Placeholder>
                </strong>
              </p>
              <p>
                Start Date:{" "}
                <Placeholder as="span" animation="glow">
                  MM/DD/YYYY
                </Placeholder>
              </p>
              <p>
                End Date:{" "}
                <Placeholder as="span" animation="glow">
                  MM/DD/YYYY
                </Placeholder>
              </p>
              <p>
                Total Cost:{" "}
                <strong>
                  <Placeholder as="span" animation="glow">
                    0.00 INR
                  </Placeholder>
                </strong>
              </p>
              <div className="stepper">
                <div className="container">
                  <ProgressBar>
                    <ProgressBar striped variant="success" now={50} key={1} />
                  </ProgressBar>
                  <div style={{ padding: "20px" }}>
                    <Placeholder as="span" animation="glow">
                      Step 1
                    </Placeholder>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
 */