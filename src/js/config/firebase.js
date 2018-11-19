import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const recipesRef = databaseRef.child("recipes");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
