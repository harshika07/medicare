import { auth } from "../Firebase/Firebase";
import { useState, React, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { Link } from "react-router-dom";

import Fuse from "fuse.js";

function GetReport() {
  const [tests, setTests] = useState([]);
  const getTestsFromFirebase = [];
  const [loading, setLoading] = useState(true);
  const [testsCount, setTestsCount] = useState();

  const fetchData = async () => {
    try {
      const response = db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("tests")
        .onSnapshot((querySnapshot) => {
          getTestsFromFirebase.length = 0;
          setTestsCount(querySnapshot.size);
          querySnapshot.forEach((doc) => {
            getTestsFromFirebase.push({
              ...doc.data(),
              id: doc.id,
            });

            console.log("reached here");
          });
          setTests(getTestsFromFirebase);
          setSearchData(getTestsFromFirebase);
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

  const [searchData, setSearchData] = useState(tests);
  const searchItem = (query) => {
    if (!query) {
      setSearchData(tests);
      return;
    }
    const fuse = new Fuse(tests, {
      keys: ["testname", "date"],
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      console.log(finalResult);
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    console.log("Reached inside useEffect");
    fetchData();
  }, []);
  return (
    <div>
      <div id="wrapper">
        <div
          className="d-flex flex-column"
          id="content-wrapper"
          style={{ marginBottom: "60px" }}
        >
          <div id="content">
            <div className="container-fluid">
              <br />
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-prximary m-0 fw-bold">My Reports</p>
                </div>
                {!testsCount > 0 && (
                  <div className="card-body">
                    <div className="row ">
                      <Link to="/AppointmentHome">
                        <button className="btn btn-danger">
                          Book a Test to see Reports
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {testsCount > 0 && (
                  <div className="card-body">
                    <div className="row justify-content-end">
                      <div className="col-md-6">
                        <div
                          className="text-md-end dataTables_filter"
                          id="dataTable_filter"
                        >
                          <label className="form-label">
                            <input
                              type="search"
                              className="form-control form-control-sm"
                              aria-controls="dataTable"
                              placeholder="Search"
                              onChange={(e) => searchItem(e.target.value)}
                            />
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
                          <tr>
                            <th>Test Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchData.map((item) => (
                            <tr key={item.id}>
                              <td>{item.testname}</td>
                              <td>{item.date}</td>

                              <td className="text-center">
                                {item.pdfUrl && (
                                  <a
                                    href={item.pdfUrl}
                                    download={item.testname + "Report"}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                    >
                                      <i class="fas fa-file-download"></i>
                                    </button>
                                  </a>
                                )}
                                {!item.pdfUrl && (
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                  >
                                    Pending
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetReport;
