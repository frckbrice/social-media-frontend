import React from "react";
// import Pulsation from "../components/atoms/Pulsation";
import PulseLoader from "@/components/atoms/pulseLoader";

type Props = {};

const Loading = () => {
  return (
    <center className="fixed top-[4vw] left-[60vw] w-full">
      <PulseLoader text="waiting for data" font="text-black text-[16px]" />
    </center>
  );
};

export default Loading;
