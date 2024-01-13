import React from "react";
// import Pulsation from "../components/atoms/Pulsation";
import PulseLoader from "@/components/atoms/pulseLoader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <center className="fixed top-[4vw] left-[60vw]">
      <PulseLoader />
    </center>
  );
};

export default Loading;
