import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "./Firebase";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext); 
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  function notify() {
    toast.success("Payment Successful", {
      position: "top-right",
    });
  }

  function getRole() {
    return role;
  }
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      let userData = { role: "user" };
      if (user) {
        // console.log(user.uid);
         db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            userData = doc.data();
            // console.log(doc.data());
            // console.log("this is new " + userData.role);
            setRole(userData.role);
            // console.log(getRole());
          });
        setCurrentUser(user);
        setLoading(false);
      } else {
        setRole("user");
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getRole,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    notify,
    paymentConfirmed,
    setPaymentConfirmed,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
