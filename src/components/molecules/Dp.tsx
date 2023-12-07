import React from "react";
import { FaCamera } from "react-icons/fa";

type Props = {
  image: string;
  content: string;
  onClick: () => void;
};

const Dp = ({ image, onClick, content }: Props) => {
  return (
    <div>
      <div className="flex items-center bg-bgGray justify-center p-5">
        <div
          style={{
            backgroundImage: `url(${
              image ||
              "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
            })`,
            width: `200px`,
            height: `200px`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "fill",
            borderRadius: "50%",
          }}
          className="self-center"
        >
          <button
            onClick={onClick}
            style={{
              width: `200px`,
              height: `200px`,
            }}
            className=" opacity-50 rounded-[50%] text-sm items-center hover:bg-[#131a23] h-full p-10 w-full flex flex-col justify-center text-center hover:text-white text-tranparent text-hidden"
          >
            <FaCamera size={20} />
            {content}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dp;
