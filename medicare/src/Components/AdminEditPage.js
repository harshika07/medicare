import React, { useRef, useState, useEffect } from "react";
import "../css/Booking.css";
import { Link, useHistory } from "react-router-dom";
import { db, UpdateTest, CreateTest } from "../Firebase/Firebase";

function AdminEditPage(props) {
  const { availableTest } = props;
  console.log(availableTest.id);
  const TestName = useRef();
  const Price = useRef();
  const Location = useRef();
  const Description = useRef();
  const history = useHistory();

  function handleUpload(e) {
    e.preventDefault();
    if (availableTest) {
      UpdateTest(availableTest.id, {
        name: TestName.current.value,
        price: Price.current.value,
        location: Location.current.value,
        description: Description.current.value,
      });
      history.push("/AvailableTests");
    } else {
      CreateTest(Location.current.value + TestName.current.value, {
        name: TestName.current.value,
        price: Price.current.value,
        location: Location.current.value,
        description: Description.current.value,
      });
      history.push("/AvailableTests");
    }
  }

  const [testInfo, setTestInfo] = useState({});
  useEffect(() => {
    if (availableTest) {
      const fetchData = async () => {
        try {
          const response = await db
            .collection("available_tests")
            .doc(availableTest.id)
            .get();

          console.log("response", response);

          let data = { title: "not found" };

          if (response.exists) {
            console.log("found it");
            data = response.data();
            console.log(data);
          }

          setTestInfo(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    } else {
      console.log("adding new doc");
    }
  }, []);
  return (
    <div>
      <div>
        <section className="contact-clean">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/AvailableTests">Available tests</Link>
              </li>

              <li class="breadcrumb-item active" aria-current="page">
                Admin Edit Page
              </li>
            </ol>
          </nav>
          <form
            className="bg-light border rounded"
            style={{ background: "rgb(248,248,249)" }}
            onSubmit={handleUpload}
          >
            {availableTest && <h2 className="text-center">Edit tests</h2>}
            {!availableTest && <h2 className="text-center">Add New Test</h2>}

            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="test name"
                placeholder="Test Name"
                ref={TestName}
                defaultValue={testInfo.name}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="number"
                name="Price"
                placeholder="Price"
                ref={Price}
                defaultValue={testInfo.price}
                required
              />
            </div>
            {testInfo && (
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">
                  Location
                </label>
                <select
                  class="form-select"
                  ref={Location}
                  defaultValue={availableTest.location}
                  id="inputGroupSelect01"
                  required
                >
                  <option value="home">Home</option>
                  <option value="centre">Centre</option>
                </select>
              </div>
            )}
            <div className="form-group mb-3">
              <textarea
                className="form-control"
                name="Description"
                placeholder="Description"
                rows="14"
                ref={Description}
                defaultValue={testInfo.description}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminEditPage;
