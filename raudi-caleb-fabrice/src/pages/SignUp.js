import React, { useState, useEffect } from "react";
import AudiVolant from "../assets/audi-volant.jpg";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [pswdConfirm, setPswdConfirm] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const navigate = useNavigate();

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

  useEffect(() => {
    const token = localStorage.getItem("tokken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  async function signUpUser(credentials) {
    try {
      const response = await fetch("http://localhost:5000/raudiApi/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sign up failed");
      }

      localStorage.setItem("token", data.tokken);
      toast.success("Utilisateur créé avec succès");
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign up error:", error.message);
      toast.error(error.message);
    }
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
      await signUpUser({
        name,
        email,
        pswd,
      });
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
                autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="new-password"
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
                />
                {passwordErr && (
                  <span className="text-red-500">
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
