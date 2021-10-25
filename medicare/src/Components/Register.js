import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { auth } from "../Firebase/Firebase";
import { useAuth } from "../Firebase/AuthContext.js";
import "firebase/auth";
import "../css/Login_Register.css";
import { createUser } from "../Firebase/Firebase";

function Register() {
  const displayName1 = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const conPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (passwordRef.current.value !== conPasswordRef.current.value) {
      alert(
        "Email is " +
          emailRef.current.value +
          "password is" +
          passwordRef.current.value +
          "Con PAss is " +
          conPasswordRef.current.value
      );
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      alert(
        "name is " +
          displayName1.current.value +
          "Email is " +
          emailRef.current.value +
          "password is" +
          passwordRef.current.value +
          "Con Pass is " +
          conPasswordRef.current.value
      );
      await signup(emailRef.current.value, passwordRef.current.value);

      await auth.currentUser.updateProfile({
        displayName: displayName1.current.value,
      });

      await createUser(auth.currentUser.uid, {
        displayName: displayName1.current.value,
        email: emailRef.current.value,
        phone: " ",
        gender: " ",
        address: " ",
        zipcode: " ",
        role: "user",
      });

      history.push("/ProfilePage");
    } catch (error) {
      setLoading(true);
      setError(error.message);
    }
    setLoading(false);
  }

  // async function GoogleLogin(e) {
  //   e.preventDefault();
  //   await signInWithGoogle();
  //   await createUser({
  //     displayName: displayName1.current.value,
  //     email: emailRef.current.value,
  //   });
  // }
  return (
    <div>
      <section className="register-photo">
        {error && <Alert variant="danger">{error}</Alert>}
        {/* {JSON.stringify(currentUser)} */}
        <div className="form-container">
          <div className="image-holder"></div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">
              <strong>Create</strong> an account.
            </h2>
            <div className="mb-3">
              <input
                className="form-control"
                type="name"
                name="name"
                placeholder="Full Name"
                ref={displayName1}
                required={true}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                ref={emailRef}
                required={true}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                required={true}
                ref={passwordRef}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password-repeat"
                placeholder="Password (repeat)"
                required={true}
                ref={conPasswordRef}
              />
            </div>

            <div className="mb-3">
              <button
                className="btn btn-primary d-block w-100"
                type="submit"
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
            <Link className="already" to="/Login">
              You already have an account? Login here.
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
