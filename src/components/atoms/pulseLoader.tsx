import React from "react";

type Props = {
  text: string;
  font?: string;
};

const PulseLoader = ({ text, font }: Props) => {
  return (
    <div className="pulsating-circle w-fit mx-auto">
      <span className={`${font} " transform -translate-x-5 w-full "`}>
        {" "}
        {text}...
      </span>
    </div>
  );
};

export default PulseLoader;
