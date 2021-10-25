import { useState, React, useEffect } from "react";
import "../css/Appointment.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import { db } from "../Firebase/Firebase";

function AppointmentHome(props) {
  const { onAdd, onRemove, cartItems, removeAll } = props;
  const { currentUser } = useAuth();

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
                  ...doc.data(), //spread operator
                  id: doc.id, // `id` given to us by Firebase
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
  }, []);

  return (
    <div>
      <div>
        <section className="highlight-clean">
          <div className="container">
            <div className="intro">
              <h2 className="text-center">Book a Home Apointment</h2>
              <p className="text-center">
                Select a location to check available tests.{" "}
              </p>
            </div>
            <div className="buttons">
              <Link className="btn btn-primary" type="button">
                Home
              </Link>
              <Link
                className="btn btn-light"
                type="button"
                to="/AppointmentCentre"
                onClick={removeAll}
              >
                Centre
              </Link>
            </div>
          </div>
        </section>
        <section className="features-boxed">
          <div className="container">
            <div className="intro"></div>
            <h2 className="text-center">Tests available for Home Visit</h2>
            {currentUser && (
              <Link to="/AppointHomeForm">
                <button className="btn btn-primary">
                  Added {cartItems.length} to cart
                  {console.log("cartLength " + cartItems.length)}
                </button>
              </Link>
            )}
            {!currentUser && (
              <Link to="/Login">
                <button className="btn btn-danger">
                  Added {cartItems.length} to cart. Login To Continue!
                  {console.log("cartLength " + cartItems.length)}
                </button>
              </Link>
            )}

            <div className="row justify-content-center features">
              {tests.map((test) => (
                <div
                  className="col-sm-6 col-md-5 col-lg-4 item"
                  key={test.id}
                  product={test}
                >
                  <div className="box">
                    <h3 className="name">{test.name}</h3>
                    <p className="description">{test.description}</p>

                    <p>&#x20b9;{test.price}</p>

                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      {!cartItems.find((x) => x.id === test.id) && (
                        <button
                          className="btn btn-primary add"
                          type="button"
                          onClick={() => {
                            onAdd(test);
                            console.log(cartItems.length);
                          }}
                        >
                          Add
                        </button>
                      )}
                      {cartItems.find((x) => x.id === test.id) && (
                        <button
                          className="btn btn-danger add"
                          type="button"
                          onClick={() => onRemove(test)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AppointmentHome;
