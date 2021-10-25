import React from "react";
import "../css/Faq.css";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import FaqsVector from "../Assets/img/FaqsVector.svg";
function Faq() {
  return (
    <div>
      <Container fluid style={{ marginBottom: "130px" }}>
        <Row>
          <Col>
            <div className="text-center">
              <img
                src={FaqsVector}
                className="img-fluid"
                alt="faqs"
                style={{
                  width: "800px",
                  height: "300px",
                }}
              />
            </div>
            <Accordion defaultActiveKey="0" style={{ margin: "30px" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-header">
                  Is the prescription/doctor's referral letter required?
                </Accordion.Header>
                <Accordion.Body>
                  Yes. The prescription/doctor's referral letter has to be shown
                  to the health professional available. Without the
                  prescription/doctor's referral letter no tests will be carried
                  out.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  What is the process to get the reports?
                </Accordion.Header>
                <Accordion.Body>
                  Reports will be available within 24hrs to 48hrs depending on
                  the tests done. Reports can be collected from the center or
                  can be downloaded from our website.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  How to cancel the appointment once booked?
                </Accordion.Header>
                <Accordion.Body>
                  Any appointment once booked won't be cancelled until the
                  patient informs the lab via phone call. Refund will be
                  available once the appointment is cancelled.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Does the patient have to be empty stomach for all the tests?
                </Accordion.Header>
                <Accordion.Body>
                  Please call up at the lab and confirm before booking the
                  appointment since only specific tests require the patient to
                  be empty stomach.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Faq;
