import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-[80px] w-full px-6 flex justify-between items-center shadow-md ">
      <div>
        <div>Logo</div>
      </div>
      <div className="flex gap-8">
        <Link to="/sign-in">Se Connecter</Link>
        <Link to="sign-up">S'inscrire</Link>
      </div>
    </div>
  );
}
