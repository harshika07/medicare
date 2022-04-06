import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Firebase/AuthContext";

import "firebase/auth";
import "../css/Login_Register.css";

export function ForgotPass() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      alert("Email is " + emailRef.current.value);
      await resetPassword(emailRef.current.value);
      setMessage("check your inbox for instructions");
    } catch {
      setLoading(true);
      setError("Failed to Reset Password");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className="container">
        <div className="intro"></div>
      </div>

      <section className="login-clean">
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        {/* {JSON.stringify(currentUser)} */}
        <form onSubmit={handleSubmit}>
          <h2 className="visually-hidden">Reset Password</h2>
          <div className="illustration">
            <h3>Reset Password</h3>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              type="submit"
              disabled={loading}
            >
              Reset Password
            </button>
          </div>
          <Link to="/Login" style={{ textDecoration: "none" }}>
            Back
          </Link>
        </form>
      </section>
    </div>
  );
}

export default ForgotPass;
