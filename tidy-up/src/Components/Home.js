import { useState, React, useEffect } from "react";
import "../css/styles.css";
import { useAuth } from "../Firebase/AuthContext";
import { db } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Accordion } from "react-bootstrap";
import lead from "../Assets/img/lead.jpg";

function Faq(props) {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey={props.eventKey}>
          <Accordion.Header>{props.AccordionHeader}</Accordion.Header>
          <Accordion.Body>{props.AccordionBody}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

function Home() {
  const { paymentConfirmed, setPaymentConfirmed, notify } = useAuth();
  const [tests, setTests] = useState([]);
  const getTestsFromFirebase = [];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Reached inside useEffect");
    const fetchData = async () => {
      try {
        const response = db
          .collection("available_tests")
          .onSnapshot((querySnapshot) => {
            console.log("Collection found");
            querySnapshot.forEach((doc) => {
              if (doc.data().location === "home") {
                console.log("home found");
                getTestsFromFirebase.push({
                  ...doc.data(),
                  id: doc.id,
                });
              }
              console.log("reached here");
            });
            setTests(getTestsFromFirebase);
            console.log(getTestsFromFirebase);
            setLoading(false);
          });

        console.log("response", response);

        if (response.exists) {
          console.log("found it");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    if (paymentConfirmed) {
      notify();
      setPaymentConfirmed(false);
    }
  }, []);
  return (
    <div>
      <section className="d-grid" style={{ marginTop: "18px" }}>
        <ToastContainer />
        <div className="row justify-content-start">
          <div className="col-sm-auto col-md-auto col-lg-7 offset-lg-0">
            <img
              className="img-fluid d-flex float-start"
              src={lead}
              width="800px"
              style={{ paddingTop: "10px", paddingLeft: "20px" }}
              alt=""
            />
          </div>
          <div
            className="col-lg-5 float-end"
            style={{ paddingRight: "10px", paddingLeft: "40px" }}
          >
            <h1
              className="display-5"
              style={{
                fontWeight: "800",
                fontFamily: "Sora, sans-serif",
                textAlign: "left",
                color: "#0c022f",
                marginRight: "20px",
                marginTop: "20px",
                lineHeight: "54.4px",
                fontSize: "42.6px",
              }}
            >
              Fresh Clothes, Fresh Life.
            </h1>
            <p
              className="lead text-start"
              style={{
                fontFamily: "Sora, sans-serif",
                margin: "20px 0px 20px",
                marginTop: "20px",
                color: "#37434d",
                marginRight: "20px",
                paddingLeft: "0px",
                paddingRight: "20px",
                marginBottom: "15px",
              }}
            >
              We've got all your laundry covered from making it squeaky clean to
              more appealing. So stop waiting and make your clothes look like
              new.
            </p>
            <Link
              to="/service"
              className="btn action-button"
              type="button"
              style={{
                color: "#ffffff",
                background: "#3552c8",
                borderLeftStyle: "solid",
                border: "2px solid",
                borderRadius: "10px",
                fontFamily: "Sora, sans-serif",
                paddingBottom: "10px",
                paddingTop: "10px",
                marginLeft: "0px",
                paddingLeft: "12px",
              }}
            >
              <strong>Know more</strong>
            </Link>
          </div>
        </div>
      </section>
      <section
        className="features-clean"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        <div className="container">
          <div className="intro" style={{ paddingTop: "70px" }}>
            <h2
              className="text-center"
              style={{ color: "#0c022f", fontWeight: "800" }}
            >
              Why choose us
            </h2>
          </div>
          <div
            className="row features"
            style={{ paddingTop: "20px", background: "#e3ebff" }}
          >
            <div className="col-sm-6 col-lg-4 item">
              <i
                className="fa fa-check-square-o icon"
                style={{ color: "#3552c8" }}
              ></i>
              <h3 className="name">Quality Assurance</h3>
              <p className="description">
                Guaranteed quality services.&nbsp; Most trusted laundry
                services.
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 item">
              <i className="far fa-clock icon" style={{ color: "#3552c8" }}></i>
              <h3 className="name">Save Time</h3>
              <p className="description">
                Save your time from going to a laundromat. We offer on-time
                services for all
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 item">
              <i
                className="far fa-credit-card icon"
                style={{ color: "#3552c8" }}
              ></i>
              <h3 className="name">Easy Payment</h3>
              <p className="description">
                Make payment easily from your mobile device or computer.
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 item">
              <i
                className="far fa-credit-card icon"
                style={{ color: "#3552c8" }}
              ></i>
              <h3 className="name">Germ-free</h3>
              <p className="description">
                Hygienic and sanitised environment and tools
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 item">
              <i
                className="fas fa-truck icon"
                style={{ color: "#3552c8 " }}
              ></i>
              <h3 className="name">Free Pickup &amp; Delivery</h3>
              <p className="description">
                No extra charges for pickup or delivery
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 item">
              <i
                className="far fa-money-bill-alt icon"
                style={{ color: " #3552c8" }}
              ></i>
              <h3 className="name">Affordable Prices</h3>
              <p className="description">
                Online services with no extra cost and picket friendly deals
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="d-grid" style={{ margin: "30px" }}>
        <div className="row justify-content-start">
          <div
            className="col-lg-5 float-end"
            style={{ paddingRight: "10px", paddingLeft: "20px" }}
          >
            <h1
              className="display-5 text-start"
              style={{
                fontWeight: " 800",
                fontFamily: "Sora, sans-serif",
                color: "#0c022f",
                marginRight: "20px",
                marginTop: "20px",
                paddingLeft: "0px",
                lineHeight: "54.4px",
                fontSize: "42.6px",
              }}
            >
              Frequently Asked Questions
            </h1>
            <p
              className="lead text-start"
              style={{
                fontFamily: "Sora, sans-serif",
                margin: "20px 0px 20px",
                marginTop: "20px",
                color: "#37434d",
                marginRight: "20px",
                paddingLeft: "0px",
                paddingRight: "20px",
                marginBottom: "15px",
              }}
            >
              Are you in a pile of doubts? Our frequently asked questions might
              help you to clear your load. If your questions are not covered
              then mail us your queries
            </p>
            <p
              className="lead text-start"
              style={{
                fontFamily: "Sora, sans-serif",
                margin: " 20px 0px 20px",
                color: "#37434d",
                paddingLeft: "px",
                paddingRight: "20px",
                marginBottom: "15px",
              }}
            >
              <i
                className="far fa-envelope icon"
                style={{ color: "#3552c8", fontSize: "24px" }}
              ></i>
              &nbsp; info@tidyup.com
            </p>
          </div>
          <div
            className="col"
            style={{ paddingTop: "30px", marginRight: "20px" }}
          >
            <Faq eventKey={1} />
            <Faq eventKey={2} />
            <Faq eventKey={3} />
            <Faq eventKey={4} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
