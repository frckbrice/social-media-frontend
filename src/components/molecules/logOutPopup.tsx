import React from "react";
import Button from "../atoms/button";
import { useRouter } from "next/navigation";

type Props = {
  visible?: any;
  onClose: () => void;
};
const LogOutPopUp = ({ visible, onClose }: Props) => {
  const handleOnclose = (e: any) => {
    if (e.target.id === "container" && onClose) onClose();
  };
  const router = useRouter();

  if (!visible) return null;

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.removeItem("email");
    router.push("/");
  };

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="relative w-[500px] h-[35vh] bg-white p-5 rounded">
        <h1 className="text-[22px] text-gray-500">Disconnect ?</h1>
        <div>
          <p className="text-[16px]">You really want to logout ?</p>
          <p className="text-[16px]">
            Otherwise, you can activate{" "}
            <span className="text-blue-400">Log screen.</span>
          </p>
        </div>

        <div className="absolute bottom-8 right-6 flex gap-4">
          <Button
            label="Cancel"
            onClick={() => onClose()}
            textColor="text-teal-500"
            bgcolor="bg-slate-50"
          />
          <Button
            label="Disconnect"
            onClick={() => handleLogout()}
            textColor="text-slate-50"
            bgcolor="bg-teal-600"
          />
        </div>
      </div>
    </div>
  );
};

export default LogOutPopUp;
