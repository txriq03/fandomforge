import React from "react";

const NotFound = () => {
  return (
    <div className="text-center h-screen overflow-hidden grid place-items-center ">
      <div className="pb-40">
        <p className="text-8xl sm:text-9xl text-pink-500 font-bold ">404</p>
        <p className="text-3xl sm:text-3xl text-primary/25">
          Page not found :(
        </p>
      </div>
    </div>
  );
};

export default NotFound;
