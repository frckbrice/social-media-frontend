import React from "react";
import PulseLoader from "@/components/atoms/pulseLoader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div>
      <center>
        <PulseLoader></PulseLoader>
      </center>
    </div>
  );
};

export default Loading;
