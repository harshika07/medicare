import { useState, React, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { db } from "../Firebase/Firebase";
import { Link } from "react-router-dom";

function CurrentTestsTable(props) {
  const { addCurrentTest } = props;
  const [tests, setTests] = useState([]);
  const getTestsFromFirebase = [];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Reached inside useEffect");
    const fetchData = async () => {
      try {
        const response = db
          .collection("current_tests")
          .onSnapshot((querySnapshot) => {
            console.log("Collection found");
            querySnapshot.forEach((doc) => {
              console.log("home found");
              getTestsFromFirebase.push({
                ...doc.data(), //spread operator
                id: doc.id, // `id` given to us by Firebase
              });

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
      <div id="wrapper">
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <div className="container-fluid" style={{ marginBottom: "40px" }}>
              <Sidebar />
              <br />
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-prximary m-0 fw-bold">Current Tests</p>
                </div>
                <div className="card-body">
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr align="center">
                          <th>Patient Name</th>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Slot</th>
                          <th>Location</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.map((item) => (
                          <tr key={item.id}>
                            <td class="text-center">{item.name}</td>
                            <td class="text-center">{item.email}</td>
                            <td class="text-center">{item.date}</td>
                            <td class="text-center">{item.slot}</td>
                            <td class="text-center">{item.location}</td>

                            <td className="text-center">
                              <Link
                                type="button"
                                class="btn btn-success"
                                to="/report"
                                onClick={() => {
                                  addCurrentTest(item);
                                  console.log("after addTest");
                                }}
                              >
                                <i class="far fa-edit"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}{" "}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentTestsTable;
