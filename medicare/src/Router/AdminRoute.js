import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";

export default function AdminRoute({ component: Component, ...rest }) {
  const { getRole } = useAuth();
  const newRole=getRole();

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("user is "+ newRole);
        return newRole==="admin" ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
