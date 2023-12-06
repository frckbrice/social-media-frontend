import React from "react";
import Image from "next/image";

type Props = {
  image: string;
  usernames?: string;
  phoneNumber?: string;
};

const Card = (props: Props) => {
  return (
    <div
      className={`card w-full flex flex-col gap-2   justify-center items-center py-8 mx-auto border-b border-b-gray-200 bg-white`}
    >
      <Image
        src={props.image}
        alt="Avatar image"
        width={300}
        height={200}
        className="bg-cover bg-center object-cover w-44 h-44 rounded-full "
      />
      <div className=" flex flex-col gap-2">
        <span className=" text-[27px] text-[#111b11] text-center">{props.usernames}</span>
        <span className=" text-[17px] text-[#808f97] font-sans text-center">
          {" "}
          {props.phoneNumber}
        </span>
      </div>
    </div>
  );
};

export default Card;
