import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC73FnITqt7fn2of5u4B-42g6XzdXE7_xw",
  authDomain: "wclone-612c3.firebaseapp.com",
  projectId: "wclone-612c3",
  storageBucket: "wclone-612c3.appspot.com",
  messagingSenderId: "871948916366",
  appId: "1:871948916366:web:eedd04dc95d8f9be6ddbdf",
  measurementId: "G-CY7XT9KQLR",
};

const app = initializeApp(firebaseConfig);
let analytics = () => {
  if (typeof window === "undefined") return;
  return getAnalytics(app);
};

const auth = getAuth(app);

export { auth, analytics };
