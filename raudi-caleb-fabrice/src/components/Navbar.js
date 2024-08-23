import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    const tokken = localStorage.getItem("tokken");

    if (!tokken) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/raudiApi/profile", {
        headers: {
          Authorization: `Bearer ${tokken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user:", err.message);
      localStorage.removeItem("tokken");
      navigate("/sign-in");
    } finally {
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-[80px] z-50 w-full px-6 flex justify-between items-center shadow-lg">
      <div>
        <div>Logo</div>
      </div>
      <div className="flex gap-8">
        {user ? (
          <>
            <span>Bonjour, {user.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem("tokken");
                navigate("/sign-in");
              }}
            >
              Se Déconnecter
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in">Se Connecter</Link>
            <Link to="/sign-up">S'inscrire</Link>
          </>
        )}
      </div>
    </div>
  );
}
