import React from "react";
import AudiVolant from "../assets/audi-volant.jpg";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [pswd, setPswd] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [pswdErr, setPswdErr] = React.useState(false);
  const navigate = useNavigate(); // Correction ici

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

  const isLoggedIn = () => {
    return !!localStorage.getItem("tokken");
  };

  async function loginUser(credentials) {
    try {
      const response = await fetch("http://localhost:5000/raudiApi/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("tokken", data.tokken);
      return data;
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
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

    if (!validPassword.test(pswd)) {
      setPswdErr(true);
      isValid = false;
    } else {
      setPswdErr(false);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validate()) {
      const response = await loginUser({ email, pswd });

      if (response && response.tokken) {
        toast.success("Connexion réussie !");
        navigate("/dashboard");
      }
    }
  };

  React.useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

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

              <div className="flex flex-col gap-8">
                <input
                  className={`px-1 py-2 border-b-[1px] outline-none ${
                    emailErr ? "border-red-500" : "border-black"
                  }`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {emailErr && (
                  <p className="text-red-500 text-sm">
                    Format d'email invalide
                  </p>
                )}

                <input
                  className={`px-1 py-2 border-b-[1px] outline-none ${
                    pswdErr ? "border-red-500" : "border-black"
                  }`}
                  type="password"
                  value={pswd}
                  onChange={(e) => setPswd(e.target.value)}
                  placeholder="Mot de passe"
                  autoComplete="new-password"
                />
                {pswdErr && (
                  <p className="text-red-500 text-sm">
                    Le mot de passe doit comporter au moins 6 caractères et
                    contenir à la fois des lettres et des chiffres
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  className="mt-5 bg-gray-950 transition hover:bg-gray-800 text-white py-4"
                >
                  Se Connecter à my Raudi
                </button>

                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
