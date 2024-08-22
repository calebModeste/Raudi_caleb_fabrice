import React, { useState } from "react";
import AudiVolant from "../assets/audi-volant.jpg";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [pswdConfirm, setPswdConfirm] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

  async function signUpUser(credentials) {
    return await fetch("http://localhost:3000/raudi/api/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const validate = () => {
    let isValid = true;

    if (!validEmail.test(email)) {
      setEmailErr(true);
      isValid = false;
    } else {
      setEmailErr(false);
    }

    if (!validPassword.test(pswd) || pswd !== pswdConfirm) {
      setPasswordErr(true);
      isValid = false;
    } else {
      setPasswordErr(false);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      let res = await signUpUser({
        name,
        email,
        pswd,
      });
      console.log(res);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-full relative h-[100vh] flex-grow">
        <div className="absolute top-0 left-0 w-full h-full flex">
          <div className="h-full relative w-3/5 bg-red-500">
            <img
              className="h-full min-w-full object-cover object-top"
              src={AudiVolant}
              alt="audi"
            />
          </div>
          <div className="h-full w-2/5">
            <div className="px-10">
              <h1 className="mt-44 mb-10 font-semibold">
                my <span className="text-red-500">Raudi</span>
              </h1>

              <form
                onSubmit={handleSubmit}
                autocomplete="false"
                className="flex flex-col gap-8"
              >
                <input
                  className={`px-1 py-2 border-b-[1px] outline-none ${
                    emailErr ? "border-red-500" : "border-black"
                  }`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom et Prénom"
                  required
                  autocomplete="false"
                />
                <input
                  className={`px-1 py-2 border-b-[1px] outline-none ${
                    emailErr ? "border-red-500" : "border-black"
                  }`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autocomplete="false"
                />
                {emailErr && (
                  <span className="text-red-500">Email non valide</span>
                )}
                <input
                  className={`px-1 py-2 border-b-[1px] outline-none ${
                    passwordErr ? "border-red-500" : "border-black"
                  }`}
                  type="password"
                  value={pswd}
                  onChange={(e) => setPswd(e.target.value)}
                  placeholder="Mot de passe"
                  required
                  autocomplete="new-password"
                  auto
                />
                <input
                  className={`px-1 py-2 border-b-[1px] outline-none ${
                    passwordErr ? "border-red-500" : "border-black"
                  }`}
                  type="password"
                  value={pswdConfirm}
                  onChange={(e) => setPswdConfirm(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  required
                  autocomplete="new-password"
                />
                {passwordErr && (
                  <span className="text-red-500 semi-bold">
                    Le mot de passe doit contenir au moins 6 caractères et
                    contenir à la fois des lettres et des chiffres, et les mots
                    de passe doivent correspondre.
                  </span>
                )}
                <button
                  type="submit"
                  className="mt-5 bg-gray-950 transition hover:bg-gray-800 text-white py-4"
                >
                  S'inscrire à my Raudi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
