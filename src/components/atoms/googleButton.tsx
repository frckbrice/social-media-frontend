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
  apiKey: "AIzaSyA4CpOZdTqrxw62FORoREA_RtJI-b__pNU",
  authDomain: "whatsapp-clone-406006.firebaseapp.com",
  projectId: "whatsapp-clone-406006",
  storageBucket: "whatsapp-clone-406006.appspot.com",
  messagingSenderId: "743181202305",
  appId: "1:743181202305:web:8d17e1cf52fcae40fcee80",
  measurementId: "G-0FYF095SSJ",
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
