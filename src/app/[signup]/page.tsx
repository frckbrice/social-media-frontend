"use client";
// import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { SITE_URL } from "@/utils/service/constant";
import { useAppContext } from "../Context/AppContext";
import PulseLoader from "@/components/atoms/pulseLoader";

const Signupb = () => {
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // context data
  const { setCurrentUser } = useAppContext();

  const handleInputChange = async () => {
    setIsLoading(true);
    const googleUser = JSON.parse(
      //   localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || "{}"
      // );
      localStorage.getItem("user") || "{}"
    );

    fetch(SITE_URL + "/users", {
      method: "POST",
      body: JSON.stringify({
        name: googleUser?.displayName,
        email: googleUser?.email,
        image: googleUser?.photoURL,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setCurrentUser(data);
          LOCAL_STORAGE.save("sender", data);
          console.log(data);
          setSuccess(`Welcome ${data.name} 🙂`);
          router.push("/discussions");
          setIsLoading(false);
        }
      });
  };

  return (
    <div className=" mt-56 items-center justify-center text-center">
      <h1 className="text-3xl font-extrabold text-slate-800 font-serif">
        Welcome to <span className="text-4xl"> WAXCHAT</span> WEB
      </h1>
      <h4 className="mt-8 mb-6 font-bold text-xl text-slate-950">
        Read our <span className="text-themecolor">Privacy Policy</span>. Tap
        Agree and Continue to accept the{" "}
        <span className="text-themecolor">Terms of Service</span>
      </h4>
      <div className=" mx-auto flex justify-center items-center">
        <button
          onClick={() => handleInputChange()}
          className={`${
            isLoading ? "border-none" : "border  border-green-400"
          } p-4 px-5 text-[20px] font-extrabold text-black rounded w-fit h-auto flex justify-center items-center ${
            success ? "hidden" : ""
          }`}
        >
          {isLoading ? (
            <PulseLoader text="loading" font="text-black" />
          ) : (
            "Agree and Continue"
          )}
        </button>

        {success && (
          <div className="text-2xl mt-6 font-extrabold text-themecolor flex flex-col gap-10 justify-center items-center">
            <p>{success} </p>
            <div className=" w-full">
              <PulseLoader text=" redirection" font="text-black" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Signupb;
