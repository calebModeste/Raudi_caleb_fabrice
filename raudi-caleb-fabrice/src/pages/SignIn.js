import React from "react";
import AudiVolant from "../assets/audi-volant.jpg";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <div className="h-screen w-full flex ">
      <div className="w-full relative h-[100vh] flex-grow ">
        <div className="absolute top-0 left-0 w-full h-full flex">
          <div className="h-full relative  w-3/5 bg-red-500">
            <img
              className="h-full min-w-full object-cover object-top"
              src={AudiVolant}
              alt="audi"
            />
          </div>
          <div className="h-full w-2/5 ">
            <div className=" px-10">
              <h1 className="mt-44 mb-10 font-semibold">
                my <span className="text-red-500">Raudi</span>
              </h1>

              <div className="flex flex-col gap-8">
                <input
                  className=" px-1 py-2 border-b-[1px] outline-none border-black"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  className=" px-1 py-2 border-b-[1px] outline-none border-black"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                />
                <button className="mt-5 bg-gray-950 transition hover:bg-gray-800 text-white py-4">
                  Se Connecter à my Raudi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
