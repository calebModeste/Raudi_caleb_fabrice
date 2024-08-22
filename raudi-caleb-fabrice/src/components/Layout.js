import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <div className="">
        <Navbar className=" z-50" />
      </div>
      <div className="z-10">{children}</div>
    </div>
  );
}
