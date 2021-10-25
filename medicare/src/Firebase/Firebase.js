import "firebase/auth";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { config } from "./Config";

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const firestore = app.firestore();
export const db = firebase.firestore();
export const storage = app.storage();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export async function updateUser(userId, user) {
  try {
    console.log(userId);
    // console.log("this is new stuff");
    await db.collection("users").doc(userId).update(user);
    // console.log(`Successfully updated user ${userId}`);
  } catch (err) {
    console.error(err);
  }
}

export async function createUser(userId, user) {
  try {
    // console.log("creating user with " + userId);
    await db.collection("users").doc(userId).set(user);
  } catch (err) {
    console.error(err);
  }
}

export async function AddNewTestForUser(userId, TestInfo, userInfo) {
  try {
    // console.log("creating doc with " + userId);
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // console.log(time);
    // console.log(userId + time + TestInfo.name);
    // console.log(userInfo, TestInfo);
    await db
      .collection("users")
      .doc(userId)
      .collection("tests")
      .doc(userId + time + TestInfo.name)
      .set(userInfo, TestInfo);
    await db
      .collection("users")
      .doc(userId)
      .collection("tests")
      .doc(userId + time + TestInfo.name)
      .update({ testname: TestInfo.name });
    // console.log(response);
    // console.log("this worked in users");
  } catch (err) {
    console.error(err);
  }
}

export async function AddNewTestForAdmin(userId, TestInfo, userInfo) {
  try {
    // console.log("creating doc with " + userId);
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // console.log(time);
    // console.log(userId + time + TestInfo.name);
    // console.log(userInfo, TestInfo);
    await db
      .collection("current_tests")
      .doc(userId + time + TestInfo.name)
      .set(userInfo, TestInfo);
    // console.log(response);
    // console.log("this worked in admin");
  } catch (err) {
    console.error(err);
  }
}

export async function CreateTest(docId, data) {
  try {
    // console.log("creating data with " + docId);
    await db.collection("available_tests").doc(docId).set(data);
  } catch (err) {
    console.error(err);
  }
}

export async function UpdateTest(docId, data) {
  try {
    console.log("updating data with " + docId);
    await db.collection("available_tests").doc(docId).update(data);
  } catch (err) {
    console.error(err);
  }
}

export async function MakeAdmin(userId) {
  try {
    // console.log(userId);
    // console.log("this is new stuff");
    await db.collection("users").doc(userId).update({ role: "admin" });
    // console.log(`Successfully updated user ${userId}`);
  } catch (err) {
    console.error(err);
  }
}
