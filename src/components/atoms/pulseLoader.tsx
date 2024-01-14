import React from "react";

type Props = {
  text: string;
  font?: string;
};

const PulseLoader = ({ text, font }: Props) => {
  return (
    <div className="pulsating-circle w-full mx-auto">
      <span className={`${font} " transform -translate-x-50 text-white"`}>
        {" "}
        {text}...
      </span>
    </div>
  );
};

export default PulseLoader;
