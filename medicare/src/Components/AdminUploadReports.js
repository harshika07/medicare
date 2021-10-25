import React, { useState, useRef, useEffect } from "react";
import {
  db,
  storage,
} from "../Firebase/Firebase";
import { Link, useHistory } from "react-router-dom";

function AdminUploadReports(props) {
  const { currentTest } = props;
  console.log(currentTest);
  const nameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();
  const drnameRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();

  const dateRef = useRef();
  const slotRef = useRef();

  const history = useHistory();

  const [photoUrl, setPhotoUrl] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  function handleUpload(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function uploadFile() {
    if (!photo) {
      setUploadMsg("");
      setUploadError("Please select a file");
      return;
    }

    setLoading(true);
    const date = new Date().toISOString();
    const name = photo.name + "_" + date;

    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(photo.name)) {
      setUploadMsg("");
      setUploadError("Please upload a .pdf file");
      setLoading(false);
      return;
    }
    setLoading(true);
    const uploadTask = storage.ref(`images/${name}`).put(photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        setUploadError(error);
      },
      () => {
        storage
          .ref("images")
          .child(name)
          .getDownloadURL()
          .then((url) => {
            setPhotoUrl(url);
            setLoading(false);
            setUploadError("");
            setUploadMsg("Photo uploaded");
            const response = db
              .collection("current_tests")
              .doc(currentTest.id)
              .update({ pdfUrl: url });
            console.log(response);
            console.log("this shit worked");
            db
              .collection("users")
              .doc(currentTest.userId)
              .collection("tests")
              .doc(currentTest.id)
              .update({ pdfUrl: url });
            console.log(response);
            console.log("this worked in users");
            db
              .collection("current_tests")
              .doc(currentTest.id)
              .delete()
              .then(() => {
                console.log("Document successfully deleted!");
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
              });
            setLoading(false);
            history.push("/CurrentTests");
          });
      }
    );
    console.log("pdf uploaded");
  }
  const [ProfileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await db
          .collection("current_tests")
          .doc(currentTest.id)
          .get();

        console.log("response", response);

        let data = { title: "not found" };

        if (response.exists) {
          console.log("found it");
          data = response.data();
          console.log(data);
        }

        setProfileInfo(data);
        // setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div>
        <section className="contact-clean">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/CurrentTests">Current Tests</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                Upload Reports
              </li>
            </ol>
          </nav>
          <form
            className="bg-light border rounded"
   
            style={{ background: "rgb(248,248,249)" }}
          >
            {currentTest.location === "home" && (
              <h2 className="text-center">Home Visit</h2>
            )}
            {currentTest.location === "centre" && (
              <h2 className="text-center">Centre Visit</h2>
            )}
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
              
                defaultValue={ProfileInfo.name}
                ref={nameRef}
                disabled="true"
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="inputGroupSelect01">
                Gender
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                ref={genderRef}
                Value={ProfileInfo.gender}
                disabled="true"
              >
                <option>{ProfileInfo.gender}</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="number"
                name="Age"
                placeholder="Age"
                min="10"
                max="100"
                ref={ageRef}
                defaultValue={ProfileInfo.age}
                disabled="true"
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                ref={emailRef}
                defaultValue={ProfileInfo.email}
                disabled="true"
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="number"
                name="phone"
                placeholder="Phone"
                inputMode="tel"
                defaultValue={ProfileInfo.phone}
                disabled="true"
                ref={phoneRef}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="dr-name"
                placeholder="Ref Doctor's Name"
                ref={drnameRef}
                defaultValue={ProfileInfo.doctorname}
                disabled="true"
              />
            </div>

            <div className="d-inline-flex mb-3">
              <input
                className="form-control"
                type="date"
                ref={dateRef}
                style={{
                  paddingRight: "12px",
                  paddingLeft: "12px",
                  width: "200px",
                }}
                defaultValue={ProfileInfo.date}
                disabled="true"
              />
            </div>
            <div className="input-group mb-3">
              <select
                className="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                ref={slotRef}
                disabled="true"
              >
                <option>{ProfileInfo.slot}</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <input
                onChange={handleUpload}
                className="form-control"
                type="file"
                accept=".pdf"
                name="Upload Report"
              />
              {!loading && (
                <button
                  className="btn btn-primary"
                  onClick={uploadFile}
                  disabled={loading}
                >
                  Upload File
                </button>
              )}
              {loading && (
                <button className="btn btn-primary" disabled={loading}>
                  Uploading Please Wait
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminUploadReports;
