import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState("");
  const [cart, setCart] = React.useState([]);
  const [selectedCar, setSelectedCar] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getUser = async () => {
      const tokken = localStorage.getItem("tokken");

      if (!tokken) {
        navigate("/sign-in");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/raudiApi/profile`, {
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
        if (err.message === "Failed to fetch user information") {
          navigate("/sign-in");
        }
      }
    };

    getUser();
  }, [navigate]);

  React.useEffect(() => {
    const loadCart = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(cartItems);
    };

    loadCart();
  }, []);

  React.useEffect(() => {
    const loadSelectedCar = () => {
      const car = JSON.parse(localStorage.getItem("selectedCar")) || null;
      setSelectedCar(car);
    };

    loadSelectedCar();
  }, []);

  const removeFromCart = (carId) => {
    const updatedCart = cart.filter((item) => item.id !== carId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Chargement...</div>;
  }
  const renderRoleBasedContent = () => {
    switch (user?.role) {
      case 1:
        return <div className="">Espace utilisateur</div>;
      case 2:
        return (
          <div>
            <div className="bg-yellow-200 w-full flex flex-row  font-semibold uppercase shadow-md py-2 gap-x-20 justify-center">
              <p className=" ">Espace Comptabilité</p>
              <Link to="/payments" className="">
                Voir l'historique des Paiements
              </Link>
            </div>
          </div>
        );
      case 3:
        return <div>Espace Administrateur</div>;
      default:
        navigate("/sign-in");
    }
  };
  return (
    <div>
      {renderRoleBasedContent()}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Panier</h2>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul className="list-disc pl-5">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <p className="font-semibold">{item.nameModel}</p>
                  <p className="text-sm">{item.basePrice} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCar && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Voiture Sélectionnée</h2>
          <div className="border p-4">
            <p className="text-xl font-semibold">{selectedCar.nameModel}</p>
            <p>Prix: {selectedCar.basePrice} €</p>
            <p>Nombre de places: {selectedCar.place}</p>
            <p>Nombre de portes: {selectedCar.doors}</p>
          </div>
        </div>
      )}
    </div>
  );
}
