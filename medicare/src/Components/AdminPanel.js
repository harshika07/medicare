import React, { useState, useEffect } from "react";

import { db } from "../Firebase/Firebase";
import Sidebar from "./Sidebar";

function AdminPanel() {
  const [CurrentTestsCount, setCurrentTestsCount] = useState();
  const [AvailableTestsCount, setAvailableTestsCount] = useState();
  const [UsersCount, setUsersCount] = useState();
  const [AdminCount, setAdminCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        db
          .collection("current_tests")
          .onSnapshot((querySnapshot) => {
            setCurrentTestsCount(querySnapshot.size);
          });
        db
          .collection("available_tests")
          .onSnapshot((querySnapshot) => {
            setAvailableTestsCount(querySnapshot.size);
          });

        db.collection("users").onSnapshot((querySnapshot) => {
          let Counter = "";
          querySnapshot.forEach((doc) => {
            let response = doc.data();
            let role = response.role;
            if (role === "admin") {
              Counter++;
            }
            setAdminCount(Counter);
          });
        });
        db.collection("users").onSnapshot((querySnapshot) => {
          let Counter = "";
          querySnapshot.forEach((doc) => {
            let response = doc.data();
            let role = response.role;
            if (role === "user") {
              Counter++;
            }
            setUsersCount(Counter);
          });
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="pb-5 mb-5 ">
      <div className="pb-5 mb-5 ">
        <div id="wrapper">
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <div className="container-fluid">
                <div className="d-sm-flex justify-content-between align-items-center mb-4 ">
                  <h3 className="text-dark mb-0">
                    <Sidebar />
                    Dashboard
                  </h3>
                </div>
                <div className="row">
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-primary py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                              <span>Current Tests Count</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>{CurrentTestsCount}</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-notes-medical fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-success py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-success fw-bold text-xs mb-1">
                              <span>Available Tests Count</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>{AvailableTestsCount}</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-file-medical fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-info py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-info fw-bold text-xs mb-1">
                              <span>Users Count</span>
                            </div>
                            <div className="row g-0 align-items-center">
                              <div className="col-auto">
                                <div className="text-dark fw-bold h5 mb-0 me-3">
                                  <span>{UsersCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-users fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-warning py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-warning fw-bold text-xs mb-1">
                              <span>Admin Count</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>{AdminCount}</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-user-shield fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AdminPanel;
