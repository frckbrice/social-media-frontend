import React from "react";
import PulseLoader from "@/components/atoms/pulseLoader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <center>
      <PulseLoader text="loading" />
    </center>
  );
};

export default Loading;