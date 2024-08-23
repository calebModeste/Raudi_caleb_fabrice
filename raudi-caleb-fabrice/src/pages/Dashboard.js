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

        // Chargez le panier spécifique à l'utilisateur
        const userCartKey = `cart_${tokken}`;
        const userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
        setCart(userCart);
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

  const handleSelectCar = (car) => {
    const tokken = localStorage.getItem("tokken"); // Assurez-vous que tokken est récupéré ici
    if (!tokken) {
      navigate("/sign-in");
      return;
    }

    const userCartKey = `cart_${tokken}`; // Clé unique pour chaque utilisateur
    const existingCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    const updatedCart = [...existingCart, car]; // Ajoutez la voiture au panier
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCart(updatedCart); // Mettez à jour l'état local
    setSelectedCar(car);
  };

  const removeFromCart = (carId) => {
    const tokken = localStorage.getItem("tokken"); // Récupérez le tokken ici aussi
    const userCartKey = `cart_${tokken}`;
    const updatedCart = cart.filter((item) => item.id !== carId); // Filtrez le panier pour supprimer la voiture
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart)); // Mettez à jour le localStorage
    setCart(updatedCart); // Mettez à jour l'état local
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
        return (
          <div>
            <div className="bg-sky-200 w-full flex flex-row  font-semibold uppercase shadow-md py-2 gap-x-20 justify-center">
              <p className=" ">Espace Administrateur</p>
              <Link to="/new-car" className="">
                Creer un nouveau modèle de voiture
              </Link>
            </div>
          </div>
        );
      default:
        navigate("/sign-in");
    }
  };

  return (
    <div>
      {renderRoleBasedContent()}
      <div className="mt-10 p-6">
        <h2 className="text-2xl font-bold mb-5">
          {cart.length === 0
            ? "Vous avez aucune Raudi selectionnée"
            : "Raudi selectionnée :"}
        </h2>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="pl-5 flex flex-col items-center">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col px-10 py-10 shadow-xl rounded-md w-1/3 items-center border-b"
              >
                <div className="flex px-5 font-bold py-10 flex-col  rounded-md  items-center">
                  <div className="relative mb-5 bg-red-600 h-72 w-72 ">
                    <img
                      className="absolute h-full w-full  object-cover"
                      src={item.picture}
                      alt={item.nameModel}
                    />
                  </div>
                  <div className="flex w-full  flex-col justify-start text-left">
                    <p className="text-sm mb-5 font-semibold">
                      Modèle de voiture : {item.nameModel}
                    </p>
                    <p className="text-sm">Prix TTC : {item.basePrice} €</p>
                    <p className="text-sm">Nombre de portes : {item.doors} </p>
                  </div>
                  <p className="italic mt-10 text-gray-500 text-xs">
                    Une fois votre commande envoyée, un conseiller vous
                    contactera dans les 24 heures pour prendre en charge votre
                    mode paiement ainsi que les choix particuliers.
                  </p>
                </div>
                <div className="flex mt-5 justify-between gap-8">
                  <button className="bg-sky-800 shadow-md text-white py-2 px-5 rounded-md">
                    Faire une commande
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white shadow-md py-2 px-5 rounded-md"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
