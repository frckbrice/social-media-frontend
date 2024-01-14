import React from "react";
// import Pulsation from "../components/atoms/Pulsation";
import PulseLoader from "@/components/atoms/pulseLoader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <center className="fixed top-[10vw] left-[50vw]">
      <PulseLoader text="charging" />
    </center>
  );
};

export default Loading;
