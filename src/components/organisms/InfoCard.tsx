import React, { useState } from "react";

const Profile = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleProfileClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[30%] bg-white">
      <div className="flex items-center justify-between p-2 bg-gray-200">
        <h1 className="ml-4 text-lg">John Doe</h1>
      </div>

      <div className="p-4">
        <div
          className="w-40 h-40 rounded-full bg-gray-300 bg-center bg-cover mx-auto cursor-pointer"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/17/f7/ba/17f7baaff77ee55d8807fcd7b2d2f47a.jpg')",
          }}
          onClick={handleProfileClick}
        ></div>
        {showInfo && (
          <div className="mt-4">
            {/* Additional profile information */}
            <p>Email: johndoe@example.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Location: New York, USA</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;