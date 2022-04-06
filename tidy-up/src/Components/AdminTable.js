import { useState, React, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { db } from "../Firebase/Firebase";

function AdminTable() {
  const [users, setUsers] = useState([]);
  const getUsersFromFirebase = [];
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = db.collection("users").onSnapshot((querySnapshot) => {
        getUsersFromFirebase.length = 0;

        querySnapshot.forEach((doc) => {
          let response = doc.data();
          let role = response.role;
          if (role === "admin") {
            getUsersFromFirebase.push({
              ...doc.data(), //spread operator
              id: doc.id, // `id` given to us by Firebase
            });
          }
        });
        setUsers(getUsersFromFirebase);
        console.log(getUsersFromFirebase);
        setLoading(false);
      });

      console.log("response", response);

      if (response.exists) {
        console.log("found it");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div>
      <div id="wrapper">
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <div className="container-fluid" style={{ marginBottom: "40px" }}>
              <Sidebar />
              <br />
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-prximary m-0 fw-bold">Admins</p>
                </div>
                <div className="card-body">
                  <div
                    className="table-responsive table mt-2"
                    id="dataTable"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
                    <table className="table my-0" id="dataTable">
                      <thead>
                        <tr align="center">
                          <th>Full Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="text-center">{user.displayName}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTable;
