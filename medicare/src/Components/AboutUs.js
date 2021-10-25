import React from "react";
import "../css/AboutUs.css";
import team from "../Assets/img/team.jpg";

function AboutUs() {
  return (
    <div>
      <div>
        <div className="container">
          <div className="row" style={{ margin: "30px 0px" }}>
            <div className="col" style={{ margin: "31px" }}>
              <p style={{ color: "#0B0957" }}>
                <strong>Stay Home, Stay Safe with Us</strong>
              </p>
              <p className="about-us">
                Medicare has a team of skillful senior pathologists and over
                3000 technicians delivering diagnostic solutions in the areas of
                routine, semi specialty and super specialty domains. <br />
                We are best known for the proficiency and accuracy of our
                reports
                <br />
                We offer a comprehensive range of 4000+ clinical laboratory
                tests and profiles, which are used for prediction, early
                detection, diagnostic screening, confirmation and/or monitoring
                of the disease.
                <br />
              </p>
            </div>
            <div className="col" style={{ textAlign: "center" }}>
              <i
                className="fas fa-microscope"
                style={{
                  fontSize: "49px",
                  textAlign: "center",
                  margin: "21px",
                  marginTop: "66px",
                  color: "#0B0957",
                }}
              ></i>
              <i
                className="fa fa-building"
                style={{
                  fontSize: "49px",
                  margin: "21px",
                  marginTop: "66px",
                  textAlign: "center",
                  color: "#0B0957",
                }}
              ></i>
              <p style={{ color: "#5E5B5B" }}>200+ Advanced Labs</p>
              <p style={{ color: "#5E5B5B" }}>
                Trusted By Leading Doctors and Hospitals
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className="col" style={{ margin: "31px" }}>
            <p style={{ color: "#0B0957" }}>
              <strong>About our Services</strong>
            </p>
            <p className="about-us">
              We have a variety of specialised, advanced tests and technologies
              to offer you the correct diagnosis.
              <br />
              Our new home visit service has boosted the process more faster and
              has helped over 670+ patients.
              <br />
              Accuracy has always been a top priority for MediCare.
              <br />
              Covid-19 protocols and other health protocols are followed
              strictly by us.
              <br />
            </p>

            <section>
              <div className="text-center">
                <img
                  className="img-fluid"
                  loading="lazy"
                  src={team}
                  alt="about-team"
                  style={{
                    width: "700px",
                    height: "360px",
                  }}
                />
              </div>
            </section>
            <h1 className="outro">
              “WE CARE FOR YOUR CONVIENENCE”
              <br />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
