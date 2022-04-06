import React from "react";
import "../css/AboutUs.css";
import wash from "../Assets/img/wash.png";
import iron from "../Assets/img/iron.png";
import hanger from "../Assets/img/hanger.png";
import laundry from "../Assets/img/laundry.png";
import about from "../Assets/img/about.jpg";

const OurService = (props) => {
  return (
    <div className="col-sm-6 item">
      <div className="row">
        <div className="col-md-12 col-lg-5 text-center">
          <img
            className="img-fluid"
            src={props.ColImage}
            alt=""
            style={{ height: "150px" }}
          />
        </div>
        <div className="col">
          <h3 className="name">
            <strong>{props.ColHeader}</strong>
          </h3>
          <p className="description">{props.ColDescribe}</p>
        </div>
      </div>
    </div>
  );
};

function AboutUs() {
  return (
    <div>
      <section className="projects-horizontal">
        <div className="container" style={{ fontFamily: "Sora, sans-serif" }}>
          <div className="intro">
            <h2
              className="text-center"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <strong>About Our Services</strong>
            </h2>
          </div>
          <div className="row projects">
            <OurService
              ColImage={hanger}
              ColHeader="Dry cleaning"
              ColDescribe="Reliable dry cleaning services with a professional touch and input. We use quality solvents for the care of your clothes."
            />
            <OurService
              ColImage={wash}
              ColHeader="Wash and Fold"
              ColDescribe="Washing accompanied with good detergent and our adaptable washing machines set up in a clean environment."
            />
            <OurService
              ColImage={iron}
              ColHeader="Iron and Steam press"
              ColDescribe="Only iron or steam press depending on the clothing material will be carried out on one piece each. Ironing will be done on an adjustable voltage setting"
            />
            <OurService
              ColImage={laundry}
              ColHeader="Complete Laundry"
              ColDescribe="Complete laundry includes all the services under one hook. Wash or dry clean will be done accordingly and so will be the iron or steam press option."
            />
          </div>
        </div>
      </section>
      <section
        className="about-section"
        style={{
          fontFamily: "Sora, sans-serif",
          marginTop: "20px",
        }}
      >
        <div className="intro">
          <h2 className="text-center" style={{ marginTop: "50px" }}>
            <strong>About TidyUp</strong>
          </h2>
        </div>
        <div
          className="container"
          style={{ height: "400px", marginTop: "30px" }}
        >
          <div className="row" style={{ height: "300px" }}>
            <div
              className="col-md-5 d-flex justify-content-center"
              style={{
                background: "#acbfe6",
                height: "300px",
                paddingtop: "20px",
              }}
            >
              <img
                src={about}
                style={{ height: "auto", width: "100%", marginTop: "31px" }}
                alt=""
              />
            </div>
            <div className="col" style={{ height: "300px" }}>
              <p className="lead" style={{ height: "300px", padding: "20px" }}>
                TidyUp brings laundry services online for the convenience of
                their customers and to help them get their laundry done without
                having any obstacle. Professionals and the staff at TidyUp carry
                out the laundry process with good care and in an hygienic
                environment. We make sure that our expertise and experience
                never fails to disappoint our customer
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
