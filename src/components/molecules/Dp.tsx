import React from "react";
import { FaCamera } from "react-icons/fa";

const Dp = () => {
  return (
    <div>
      <div className="flex items-center bg-bgGray justify-center p-5">
        <div
          style={{
            backgroundImage: `url(https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg)`,
            width: `180px`,
            height: `180px`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "fill",
            borderRadius: "50%",
          }}
          className="self-center"
        >
          <button
            style={{
              width: `180px`,
              height: `180px`,
            }}
            className="text-white opacity-50 rounded-[50%] text-sm items-center bg-[#131a23] h-full p-10 w-full flex flex-col justify-center text-center hover:hidden "
          >
            <FaCamera size={20} />
            CHANGE PROFILE PHOTO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dp;
