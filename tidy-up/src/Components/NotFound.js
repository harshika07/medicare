import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <section style={{ minHeight: "60vh", height: "0px", margin: "40px" }}>
        <div className="row text-center">
          <div className="col">
            <h1
              className="display-1"
              style={{
                color: "#00c9b7",
                fontFamily: "'Bowlby One', serif",
                fontSize: "140px",
              }}
            >
              404
            </h1>
          </div>
        </div>
        <div className="row text-center">
          <div className="col" style={{ paddingTop: "10px" }}>
            <p style={{ fontFamily: " Sora, sans-serif", fontSize: "20px" }}>
              Oops! The page you requested was not found.
            </p>
          </div>
        </div>
        <div className="row text-center">
          <div className="col">
            <Link
              to="/"
              className="btn btn-primary"
              type="button"
              style={{
                borderColor: "#3552c8",
                borderRadius: "20px",
                fontFamily: "Sora, sans-serif",
                color: "#3552c8",
                background: "#ffffff",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
