"use client";
// import Pulsation from "@/app/[signup]/component/PulseLoader";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { SITE_URL } from "@/utils/service/constant";
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import RoundedLoader from "./RoundedLoader";
import { registerUserToDB } from "@/utils/service/queries";
import PulseLoader from "./pulseLoader";
import { LOCAL_STORAGE } from "@/utils/service/storage";

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

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    try {
      signInWithPopup(auth, new GoogleAuthProvider());
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userData = {
            name: user?.displayName as string,
            email: user?.email as string,
            image: user?.photoURL as string,
          };
          const registerUser = await registerUserToDB(userData);
          if (registerUser) {
            LOCAL_STORAGE.save("sender", registerUser);
            console.log("user registered: ", registerUser);
            setSuccess(`Welcome ${registerUser.name} 🙂`);
            setIsLoading(false);
            setTimeout(() => router.push("/discussions"), 1000);
          }
        } else {
          // User is signed out
          // ...
          console.log("User is no more connected: ");
          signOut(auth);
        }
      });
    } catch (error) {
      console.log("error signing with redirect");
    }
  };

  return (
    <div>
      <button
        onClick={() => handleGoogleSignin()}
        data-u
        className={
          isLoading
            ? "hover:cursor-not-allowed flex border border-none text-xl items-center rounded p-4 gap-3 px-8   font-bold m-auto"
            : "flex border border-themecolor text-xl items-center rounded p-4 gap-3 px-8   font-bold m-auto"
        }
      >
        {isLoading ? (
          <RoundedLoader />
        ) : (
          <>
            <Image
              height={40}
              width={40}
              alt="google logo"
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            />
            <p>Sign In with Google</p>
          </>
        )}
      </button>
      {success && (
        <div className="text-2xl mt-6 font-extrabold text-themecolor flex flex-col gap-10 justify-center items-center">
          <p>
            {success}&nbsp;&nbsp;&nbsp; <RoundedLoader />{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleButton;
