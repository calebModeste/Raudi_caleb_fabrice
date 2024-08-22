import React from "react";
import Audi from "../assets/audi.jpg";
import Models from "../components/Models";

export default function Homepage() {
  return (
    <div className="flex flex-col">
      <div className="flex relative justify-center h-[100vh] ">
        <img
          className=" absolute object-cover h-full w-full "
          src={Audi}
          alt="audi"
        />
      </div>
      <div className=" z-50 mb-0 pb-0">
        <Models />
      </div>
    </div>
  );
}
