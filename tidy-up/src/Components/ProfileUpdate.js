import React, { useRef } from "react";
import { useAuth } from "../Firebase/AuthContext";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { db, auth } from "../Firebase/Firebase";
import { updateUser } from "../Firebase/Firebase";

function ProfileUpdate() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();
  const zipcodeRef = useRef();
  const passwordRef = useRef();
  const conPasswordRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== conPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    updateUser(auth.currentUser.uid, {
      displayName: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      gender: genderRef.current.value,
      address: addressRef.current.value,
      zipcode: zipcodeRef.current.value,
    });

    if (auth.currentUser.displayName !== nameRef.current.value) {
      await auth.currentUser.updateProfile({
        displayName: nameRef.current.value,
      });
    }
    if (auth.currentUser.email !== emailRef.current.value) {
      await auth.currentUser.updateEmail({
        email: emailRef.current.value,
      });
    }

    Promise.all(promises)
      .then(() => {
        history.push("/ProfilePage");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

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

        setProfileInfo(data);
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
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div>
        <form onSubmit={handleSubmit} style={{ marginBottom: "60px" }}>
          <div className="container">
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 className="mb-2 text-primary">
                            Personal Details
                          </h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="fullName">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                              placeholder="Enter full name"
                              defaultValue={ProfileInfo.displayName}
                              ref={nameRef}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="eMail">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter email ID"
                              defaultValue={ProfileInfo.email}
                              ref={emailRef}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="phone">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="Enter phone number"
                              defaultValue={ProfileInfo.phone}
                              ref={phoneRef}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="website">Gender</label>
                            {ProfileInfo.gender && (
                              <div class="input-group mb-3">
                                <select
                                  class="form-select"
                                  id="inputGroupSelect01"
                                  required
                                  ref={genderRef}
                                  defaultValue={ProfileInfo.gender}
                                >
                                  <option value="Choose...">Choose...</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Others">Others</option>
                                </select>
                              </div>
                            )}
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
                            defaultValue={ProfileInfo.address}
                            ref={addressRef}
                          ></textarea>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="zIp">Zip Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="zIp"
                              placeholder="Zip Code"
                              defaultValue={ProfileInfo.zipcode}
                              ref={zipcodeRef}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 className="mt-3 mb-2 text-primary">
                            Change Password
                          </h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="Street">New Password</label>
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              placeholder="Leave Blank to keep the same"
                              ref={passwordRef}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="ciTy">Confirm New Password</label>
                            <input
                              className="form-control"
                              type="password"
                              name="password-repeat"
                              placeholder="Leave Blank to keep the same"
                              ref={conPasswordRef}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="text-right">
                            <Link
                              to="/ProfilePage"
                              className="btn btn-danger"
                              style={{ marginTop: "10px" }}
                            >
                              Cancel
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ marginTop: "10px", marginLeft: "10px" }}
                            >
                              Confirm Update
                            </button>
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

export default ProfileUpdate;
