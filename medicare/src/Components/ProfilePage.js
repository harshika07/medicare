import React from "react";
import { useAuth } from "../Firebase/AuthContext";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { auth, db } from "../Firebase/Firebase";

function ProfilePage() {
  // const { getProfile, profileData } = props;
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  // let docRef = db.collection("users").doc(auth.currentUser.uid);

  async function handleLogout() {
    setError("");

    try {
      logout();
      // auth.signOut();
      history.push("/Login");
    } catch {
      setError("Failed to log out");
    }
  }

  const [loading, setLoading] = useState(true);
  const [ProfileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .get();

        console.log("response", response);

        let data = { title: "not found" };

        if (response.exists) {
          console.log("found it");
          data = response.data();
          console.log(data);
        }
        setError("");
        setProfileInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-center mb-4 mt-4">Personal Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div>
        <form action="" style={{ marginBottom: "60px" }}>
          <div className="container">
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          {error && <Alert variant="danger">{error}</Alert>}
                          <h6 className="mb-2 text-primary">
                            Personal Details
                          </h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          {console.log(ProfileInfo.displayName)}
                          <div className="form-group">
                            <label Htmlfor="fullName">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                              placeholder="Enter full name"
                              value={ProfileInfo.displayName}
                              disabled="true"
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label Htmlfor="eMail">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="eMail"
                              placeholder="Enter email ID"
                              value={ProfileInfo.email}
                              disabled="true"
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label Htmlfor="phone">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="Enter phone number"
                              value={ProfileInfo.phone}
                              disabled="true"
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label Htmlfor="gender">Gender</label>
                            <input
                              type="text"
                              className="form-control"
                              id="gender"
                              placeholder="Gender"
                              value={ProfileInfo.gender}
                              disabled="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 className="mt-3 mb-2 text-primary">Address</h6>
                        </div>
                        <div className="form-group mb-3">
                          <textarea
                            className="form-control"
                            name="Address"
                            placeholder="Address"
                            rows="3"
                            value={ProfileInfo.address}
                            disabled="true"
                          ></textarea>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label Htmlfor="zIp">Zip Code</label>
                            <input
                              type="text"
                              className="form-control mb-3"
                              id="zIp"
                              value={ProfileInfo.zipcode}
                              disabled="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="text-right">
                            <button
                              type="button"
                              id="submit"
                              name="submit"
                              className="btn btn-secondary me-2"
                              onClick={handleLogout}
                            >
                              Log Out
                            </button>
                            <Link
                              to="/ProfileUpdate"
                              className="btn btn-primary"
                            >
                              Update
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
