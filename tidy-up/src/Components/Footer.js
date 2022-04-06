import React from "react";

function Footer() {
  return (
    <footer className="footer-dark mt-auto">
      <div className="container">
        <div className="row">
          <div className="col">
            <p>
              <b>Reach Us</b>
            </p>
            <div className="row">
              <div className="col">
                <p>
                  <svg
                    className="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  &nbsp; &nbsp;Sri Apt, Liberty Rd, Malad.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="bi bi-telephone svg"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                  </svg>
                  &nbsp; &nbsp;022288866
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <p>
              <b>Timings</b>
            </p>
            <div className="row">
              <div className="col">
                <p>9am to 7pm&nbsp;</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Open All Days</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 item text">
            <h3>TidyUp</h3>
            <p style={{ color: "#35cb92" }}>
              <b>Disclaimer</b>
            </p>
            <p>Prices are subject to change without prior notice.</p>
          </div>
        </div>
        <p className="copyright">TidyUp &copy; 2022</p>
      </div>
    </footer>
  );
}

export default Footer;
