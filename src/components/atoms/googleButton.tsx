"use client";
// import Pulsation from "@/app/[signup]/component/PulseLoader";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { SITE_URL } from "@/utils/service/constant";
import {
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
import { auth } from "@/utils/firebase/firebase";

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());

      if (res) {
        const userData = {
          name: res.user?.displayName as string,
          email: res.user?.email as string,
          image: res.user?.photoURL as string,
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
