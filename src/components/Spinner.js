import React from "react";

const Spinner = () => {
  return (
    <div className="text-center">
      <img
        src="https://i.gifer.com/VAyR.gif" // Online GIF link
        alt="Loading..."
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Spinner;
