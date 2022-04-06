import Header from "./Components/Header";
import Home from "./Components/Home";
import AppointmentHome from "./Components/AppointmentHome";
import AppointHomeForm from "./Components/AppointHomeForm";
import AppointmentCentre from "./Components/AppointmentCentre";
import AppointCentreForm from "./Components/AppointmentCentreForm";
import Faq from "./Components/Faq";
import AboutUs from "./Components/AboutUs";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ProfilePage from "./Components/ProfilePage";
import ProfileUpdate from "./Components/ProfileUpdate";
import ForgotPass from "./Components/ForgotPass";
import AdminPanel from "./Components/AdminPanel";
import AvailableTestsTable from "./Components/AvailableTestsTable";
import UserTable from "./Components/UserTable";
import CurrentTestsTable from "./Components/CurrentTestsTable";
import GetReport from "./Components/GetReport";
import AdminTable from "./Components/AdminTable";

import AdminEditPage from "./Components/AdminEditPage";

import AdminUploadReports from "./Components/AdminUploadReports";
import NotFound from "./Components/NotFound";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Firebase/AuthContext";
import PrivateRoute from "./Router/PrivateRoute";
import AdminRoute from "./Router/AdminRoute";
import data from "./Assets/data";
import { db } from "./Firebase/Firebase";
import "../src/css/Footer.css";

function App() {
  let Homepage = "/";
  let Book_Appointment_Home = "/AppointmentHome";
  let Appointment_Home_Form = "/AppointHomeForm";
  let Book_Appointment_Centre = "/AppointmentCentre";
  let Appointment_Centre_Form = "/AppointCentreForm";
  let About_Us = "/AboutUs";
  let Get_Report = "/GetReport";
  let FAQ = "/Faq";
  let Register_User = "/Register";
  let Login_User = "/Login";
  let Profilepage = "/ProfilePage";
  let Profile_Update = "/ProfileUpdate";
  let Forgot_Pass = "/ForgotPass";
  let admin_panel = "/Admin";
  let Admin_AvailabeTests_table = "/AvailableTests";

  let Admin_CurrentTests_table = "/CurrentTests";
  let Admin_Edit_Page = "/AdminEditPage";
  let Users_Table = "/UsersPage";
  let Admin_Table = "/AdminTable";

  let Admin_Upload_Report = "/report";

  const [role, setRole] = useState("user");
  const getRole = async (userId) => {
    try {
      const response = await db.collection("users").doc(userId).get();

      console.log("response", response);

      let data = { title: "not found" };

      if (response.exists) {
        console.log("found it");
        data = response.data("role");
        console.log("inside " + data);
      }

      setRole(data);
      console.log("changed role to" + role);
    } catch (err) {
      console.error(err);
    }
  };

  const { products } = data;
  const [availableTest, setAvailableTest] = useState([]);
  const addTest = (test) => {
    console.log("insode addTest method");
    setAvailableTest(test);
  };
  const [currentTest, setCurrentTest] = useState([]);
  const addCurrentTest = (test) => {
    console.log("insode addTest method for currentTest");
    setCurrentTest(test);
  };

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);

    if (exist) {
      console.log("yup now its right");
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      console.log("landed in wrong block");
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const removeAll = () => {
    console.log("inside remove all");
    setCartItems([]);
    console.log(cartItems);
  };

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path={Homepage}>
              <Home />
            </Route>

            <Route exact path={Book_Appointment_Home}>
              <AppointmentHome
                products={products}
                onAdd={onAdd}
                onRemove={onRemove}
                cartItems={cartItems}
                removeAll={removeAll}
              />
            </Route>
            <Route exact path={Appointment_Home_Form}>
              <AppointHomeForm
                products={products}
                onAdd={onAdd}
                onRemove={onRemove}
                cartItems={cartItems}
                removeAll={removeAll}
              />
            </Route>
            <Route exact path={Book_Appointment_Centre}>
              <AppointmentCentre
                products={products}
                onAdd={onAdd}
                onRemove={onRemove}
                cartItems={cartItems}
                removeAll={removeAll}
              />
            </Route>
            <Route exact path={Appointment_Centre_Form}>
              <AppointCentreForm
                products={products}
                onAdd={onAdd}
                onRemove={onRemove}
                cartItems={cartItems}
                removeAll={removeAll}
              />
            </Route>
            <Route exact path={About_Us}>
              <AboutUs />
            </Route>
            <Route exact path={FAQ}>
              <Faq />
            </Route>
            <Route exact path={Register_User}>
              <Register />
            </Route>
            <Route exact path={Login_User}>
              <Login role={role} setRole={getRole} />
            </Route>

            <PrivateRoute
              exact
              path={Profilepage}
              component={ProfilePage}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path={Profile_Update}
              component={ProfileUpdate}
            ></PrivateRoute>
            <Route exact path={Forgot_Pass} component={ForgotPass}></Route>
            <PrivateRoute
              exact
              path={Get_Report}
              component={GetReport}
            ></PrivateRoute>
            <AdminRoute
              exact
              path={admin_panel}
              component={AdminPanel}
            ></AdminRoute>
            <PrivateRoute exact path={Admin_AvailabeTests_table}>
              <AvailableTestsTable
                availableTest={availableTest}
                addTest={addTest}
              />
            </PrivateRoute>
            <PrivateRoute exact path={Admin_CurrentTests_table}>
              <CurrentTestsTable
                currentTest={currentTest}
                addCurrentTest={addCurrentTest}
              />
            </PrivateRoute>
            <PrivateRoute exact path={Admin_Edit_Page}>
              <AdminEditPage availableTest={availableTest} addTest={addTest} />
            </PrivateRoute>
            <PrivateRoute exact path={Admin_Upload_Report}>
              <AdminUploadReports
                currentTest={currentTest}
                addCurrentTest={addCurrentTest}
              />
            </PrivateRoute>
            <PrivateRoute exact path={Users_Table}>
              <UserTable />
            </PrivateRoute>
            <PrivateRoute exact path={Admin_Table}>
              <AdminTable />
            </PrivateRoute>
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
