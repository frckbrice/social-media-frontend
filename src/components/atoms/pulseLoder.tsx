import React from "react";

type Props = {};

const PulseLoader = (props: Props) => {
  return (
    <div className="loader m-auto border-t-2 rounded-full border-themecolor bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
  );
};

export default PulseLoader;
