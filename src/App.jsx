import React from "react";
import Todo from "./todo/Todo";
import Video from "./assets/background.mp4";
import P from "./todo/P";
const App = () => {
  return (
    <div>
      {/* <header className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className=" z-30 p-5  ">
          
        </div>
        <video
          autoPlay
          loop
          muted
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none opacity-50"
        >
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </header> */}
      <Todo />
      <P />
    </div>
  );
};

export default App;
