import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Firebase/AuthContext";
import "firebase/auth";
import "../css/Login_Register.css";

function Login(props) {
  const { role, getRole } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      alert(
        "Email is " +
          emailRef.current.value +
          "password is" +
          passwordRef.current.value
      );
      await login(emailRef.current.value, passwordRef.current.value);

      history.push("/");
      getRole(currentUser.uid);
      console.log("afterLogin" + role);
    } catch (error) {
      setLoading(true);
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <div>
      <section className="login-clean">
        {error && <Alert variant="danger">{error}</Alert>}
        {/* {JSON.stringify(currentUser)} */}
        <form onSubmit={handleSubmit}>
          <h2 className="visually-hidden">Login Form</h2>
          <div className="illustration">
            <i class="far fa-user-circle"></i>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email"
              required={true}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Password"
              required={true}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              type="submit"
              disabled={loading}
            >
              Log In
            </button>
          </div>
          <Link className="forgot" to="/ForgotPass">
            <u>Forgot your email or password?</u>
          </Link>
          <Link className="forgot" to="/Register">
            <u>Create a new Account here....</u>
          </Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
