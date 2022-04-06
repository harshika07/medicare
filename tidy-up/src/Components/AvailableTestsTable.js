import { useState, React, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { db } from "../Firebase/Firebase";
import { Link } from "react-router-dom";

function AvailableTestsTable(props) {
  const { addTest } = props;
  const [tests, setTests] = useState([]);
  const getTestsFromFirebase = [];
  const [loading, setLoading] = useState(true);

  function deleteTest(test) {
    console.log(test.id);
    db
      .collection("available_tests")
      .doc(test.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    fetchData();
    // window.location.reload(false);
  }
  const fetchData = async () => {
    try {
      const response = db
        .collection("available_tests")
        .onSnapshot((querySnapshot) => {
          getTestsFromFirebase.length = 0;
          querySnapshot.forEach((doc) => {
            getTestsFromFirebase.push({
              ...doc.data(), //spread operator
              id: doc.id, // `id` given to us by Firebase
            });
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
  useEffect(() => {
    console.log("Reached inside useEffect");
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
                  <p className="text-prximary m-0 fw-bold">Available Tests</p>
                </div>
                <div className="card-body">
                  <div className="row justify-content-end">
                    <div className="col-md-6 ">
                      <div
                        className="text-md-end dataTables_filter"
                        id="dataTable_filter"
                      >
                        <label className="form-label">
                          <Link to="/AdminEditPage">
                            <button
                              type="button"
                              onClick={() => {
                                addTest("");
                                console.log("after addTest");
                              }}
                              class="btn btn-success align-middle"
                            >
                              <i class="fas fa-plus-circle fa-2x"></i>
                            </button>
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr align="center">
                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Slot</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.map((item) => (
                          <tr key={item.id}>
                            <td class="text-center">{item.name}</td>
                            <td class="text-center">{item.description}</td>
                            <td class="text-center">&#x20b9;{item.price}</td>
                            <td class="text-center">{item.location}</td>

                            <td className="text-center">
                              <button
                                type="button"
                                class="btn btn-danger"
                                onClick={() => {
                                  deleteTest(item);
                                }}
                              >
                                <i class="far fa-trash-alt"></i>
                              </button>
                              <Link
                                to="/AdminEditPage"
                                onClick={() => {
                                  addTest(item);
                                  console.log("after addTest");
                                }}
                              >
                                <button type="button" class="btn btn-success">
                                  <i class="far fa-edit"></i>
                                </button>
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

export default AvailableTestsTable;
