import { useState, React, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { db, MakeAdmin } from "../Firebase/Firebase";
import Fuse from "fuse.js";

function UserTable() {
  // const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const getUsersFromFirebase = [];
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(users);

  function MakeUsersAdmin(userId) {
    MakeAdmin(userId);
    fetchData();
  }
  const fetchData = async () => {
    try {
      const response = db.collection("users").onSnapshot((querySnapshot) => {
        getUsersFromFirebase.length = 0;
        querySnapshot.forEach((doc) => {
          let response = doc.data();
          let role = response.role;
          if (role === "user") {
            getUsersFromFirebase.push({
              ...doc.data(), //spread operator
              id: doc.id, // `id` given to us by Firebase
            });
          }
        });
        setUsers(getUsersFromFirebase);
        setSearchData(getUsersFromFirebase);
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

  const searchItem = (query) => {
    if (!query) {
      setSearchData(users);
      return;
    }
    const fuse = new Fuse(users, {
      keys: ["displayName"],
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      console.log(finalResult);
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    console.log("Reached inside useEffect");
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
                  <p className="text-prximary m-0 fw-bold">All Users</p>
                </div>
                <div className="card-body">
                  <div className="row justify-content-end">
                    <div className="col-md-6">
                      <div
                        className="text-md-end dataTables_filter"
                        id="dataTable_filter"
                      >
                        <label className="form-label">
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            aria-controls="dataTable"
                            placeholder="Search"
                            onChange={(e) => searchItem(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
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
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchData.map((user) => (
                          <tr key={user.id}>
                            <td class="text-center">{user.displayName}</td>
                            <td class="text-center">{user.email}</td>

                            <td className="text-center">
                              <button
                                type="button"
                                class="btn btn-success"
                                onClick={() => {
                                  MakeUsersAdmin(user.id);
                                }}
                              >
                                <i class="fas fa-user-shield"></i>
                              </button>
                            </td>
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

export default UserTable;
