import React from "react";
import Fourofour from "../Assets/img/Fourofour.svg";

function NotFound() {
  return (
    <div className="container">
      <div className="row" style={{ margin: "30px 0px" }}>
        <div className="col" style={{ margin: "31px" }}>
          <img src={Fourofour} alt="404 vector"></img>
        </div>
        <div
          className="col"
          style={{ margin: "31px", display: "flex", alignItems: "center" }}
        >
          <p
            style={{
              fontFamily: "Roboto",
              color: "#5c5c5c",
              fontWeight: "bolder",
              fontSize: "30px",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Helvetica",
                  color: "#0b0957",
                  fontWeight: "bold",
                  fontSize: "52px",
                }}
              >
                {" "}
                Oops...
              </h2>
            </div>
            We are sorry, Page not found
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
