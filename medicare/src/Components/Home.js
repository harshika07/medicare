import { useState, React, useEffect } from "react";
import "../css/Appointment.css";
import { useAuth } from "../Firebase/AuthContext";
import { db } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homebg from "../Assets/img/Homebg.jpg";
import "../css/Home.css";

function Home() {
  const { paymentConfirmed, setPaymentConfirmed, notify } =
    useAuth();
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
      <section
        className="highlight-blue"
        style={{
          backgroundImage: `url(${Homebg})`,
          backgroundSize: "cover",
          paddingTop: "10rem",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ToastContainer />

        <div className="intro">
          <h2 className="text-center">Book a Home Visit Appointment Now</h2>
          <p className="text-center">
            Healthcare Now At Your Doorsteps with MediCare{" "}
          </p>
        </div>
        <div className="buttons">
          <Link
            to="./AppointmentHome"
            className="btn btn-primary"
            type="button"
            href
          >
            BOOK NOW
          </Link>
        </div>
      </section>
      <section className="features-boxed">
        <div className="container">
          <div className="row justify-content-center features">
            {tests.slice(-3).map((test) => (
              <div
                className="col-sm-6 col-md-5 col-lg-4 item"
                key={test.id}
                product={test}
              >
                <div className="box">
                  <h3 className="name">{test.name}</h3>
                  <p className="description">{test.description}</p>

                  <p>&#x20b9;{test.price}</p>

                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <Link
                      className="btn btn-primary add"
                      type="button"
                      to="/AppointmentHome"
                      style={{
                        borderRadius: "6px",
                      }}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div class="container">
        <div class="row" style={{ margin: "30px 0px" }}>
          <div class="col" style={{ margin: "31px" }}>
            <p style={{ color: "#0b0957" }}>
              <strong>Why Choose Us?</strong>
            </p>
            <p
              style={{
                color: "#5e5b5b",
                fontFamily: "Roboto",
                fontSize: "18px",
              }}
            >
              Medicare has a team of skillful senior pathologists and over 3000
              technicians delivering diagnostic solutions in the areas of
              routine, semi specialty and super specialty domains. <br />
              We are best known for the proficiency and accuracy of our reports
              <br />
              <br />
              We offer a comprehensive range of 4000+ clinical laboratory tests
              and profiles, which are used for prediction, early detection,
              diagnostic screening, confirmation and/or monitoring of the
              disease.
              <br />
            </p>

            <Link
              class="btn btn-primary"
              type="button"
              to="/AboutUs"
              style={{ background: "#0b0957", borderRadius: "6px" }}
              href
            >
              Know More
            </Link>
          </div>
          <div class="col" style={{ textAlign: "center" }}>
            <i
              class="fas fa-microscope"
              style={{
                fontSize: "49px",
                textAlign: "center",
                margin: "21px",
                marginTop: "66px",
                color: "#0b0957",
              }}
            ></i>
            <i
              class="fa fa-building"
              style={{
                fontSize: "49px",
                margin: "21px",
                marginTop: "66px",
                textAlign: "center",
                color: "#0b0957",
              }}
            ></i>
            <p style={{ color: "#5e5b5b" }}>200+ Advanced Labs</p>
            <p style={{ color: "#5e5b5b" }}>
              Trusted By Leading Doctors and Hospitals
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
