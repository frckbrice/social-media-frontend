"use client";
import React from "react";
import PulseLoader from "../atoms/pulseLoader";

const Signupb = () => {
  return (
    <div className=" mt-56 items-center justify-center text-center">
      <h1 className="text-3xl font-extrabold text-themecolor font-serif">
        Welcome to <span className="text-4xl"> WAXCHAT</span> WEB
      </h1>
      <h4 className="mt-8 mb-6 font-bold text-xl text-gray-950">
        Read our <span className="text-themecolor">Privacy Policy</span>. Tap
        &apos;Agree and Continue&apos; to accept the{" "}
        <span className="text-themecolor">Terms of Service</span>
      </h4>
      <button className="border p-4 px-5 text-base font-extrabold text-black rounded">
        {<PulseLoader />}
      </button>
      <p className="text-2xl mt-6 font-extrabold text-themecolor">success</p>
    </div>
  );
};

export default Signupb;
