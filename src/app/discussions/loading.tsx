import React from "react";
// import Pulsation from "../components/atoms/Pulsation";
import PulseLoader from "@/components/atoms/pulseLoader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className=" w-full flex items-center justify-center text-sm text-black m-16">
      <PulseLoader />
    </div>
  );
};

export default Loading;
