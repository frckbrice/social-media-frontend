"use client";
// import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Pulsation from "./component/PulseLoader";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { signUp } from "@/utils/service/queries";
import { SITE_URL } from "@/utils/service/constant";
import { useAppContext } from "../Context/AppContext";

const Signupb = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // context data
  const { setCurrentUser } = useAppContext();

  const handleInputChange = async () => {
    setIsLoading(true);
    const googleUser = JSON.parse(
      localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || "{}"
    );
    const { data } = await supabase.from("user").select("email");
    let res = data?.filter((i) => i.email === googleUser?.user?.email);
    if (res?.length === 1) {
      LOCAL_STORAGE.save("email", googleUser?.user.email);
      LOCAL_STORAGE.save("userObject", googleUser?.user);

      await fetch(SITE_URL + "/users", {
        method: "POST",
        body: JSON.stringify({
          name: googleUser?.user.user_metadata.name,
          email: googleUser?.user.email,
          image: googleUser?.user.user_metadata.picture,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setCurrentUser(data);
            LOCAL_STORAGE.save("sender", data);
            console.log("userObject", data);
            setSuccess(`Welcome ${data.name}🙂`);
            router.push("/discussions");
            setIsLoading(false);
          }
        });

      return;
    }
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
      {!success ? (
        <button
          onClick={() => handleInputChange()}
          className={`border ${
            isLoading ? "cursor-not-allowed disabled:cursor-wait" : ""
          } p-4 px-5 text-base font-extrabold bg-themecolor text-white rounded`}
        >
          {isLoading ? <Pulsation /> : "Agree and Continue"}
        </button>
      ) : (
        <p className="text-2xl mt-6 font-extrabold text-themecolor">
          {success}
        </p>
      )}
    </div>
  );
};
export default Signupb;
