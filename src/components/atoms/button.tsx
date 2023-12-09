import React from "react";

type Props = {
  label: String;
  onClick?: () => void;
  className?: String;
  bgcolor?: string
  textColor?: string
}

const Button = ({ label, onClick, bgcolor, textColor }: Props) => {
  return (
    <div>
      <button
        className={`rounded-full px-8 py-2 text-[15px] ${textColor} ${bgcolor} font-semibold cursor-pointer`}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
