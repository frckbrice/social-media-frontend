import React from 'react';

const BackgroundImage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-center bg-no-repeat w-full h-full" style={{ backgroundImage: "url('/whatsappdashbord.png')" }}>
      </div>
    </div>
  );
};

export default BackgroundImage;