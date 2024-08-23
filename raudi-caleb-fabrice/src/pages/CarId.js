import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AudiVolant from "../assets/audi-volant.jpg";

export default function CarId() {
  const [car, setCar] = React.useState({});
  const navigate = useNavigate();
  const params = useParams();
  const tokken = localStorage.getItem("tokken");

  const carId = async () => {
    const response = await fetch(
      `http://localhost:5000/raudiApi/cars/${params.id}`
    );
    const data = await response.json();
    setCar(data[0]);
  };

  const handleAddToCart = () => {
    // Vérifiez si l'utilisateur est connecté
    if (!tokken) {
      navigate("/sign-in");
      return;
    }

    // Vérifiez si les données de la voiture sont disponibles
    if (!car || Object.keys(car).length === 0) {
      console.error("Car data is empty, cannot add to cart.");
      return;
    }

    // Créez une clé unique basée sur le token de l'utilisateur
    const userCartKey = `cart_${tokken}`;

    // Récupérez le panier de l'utilisateur spécifique depuis le localStorage
    const existingCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    // Vérifiez si la voiture est déjà dans le panier
    const isCarInCart = existingCart.some((item) => item.id === car.id);

    if (isCarInCart) {
      console.log("Car is already in the cart.");
      return;
    }

    // Mettez à jour le panier avec la nouvelle voiture
    const updatedCart = [...existingCart, car];

    // Sauvegardez le panier mis à jour dans le localStorage avec la clé spécifique à l'utilisateur
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));

    // Naviguez vers le tableau de bord
    navigate("/dashboard");

    console.log("Voiture ajoutée :", car);
  };

  React.useEffect(() => {
    carId();
  }, []);

  return (
    <div className="h-screen w-full flex ">
      <div className="w-full relative h-[100vh] flex-grow ">
        <div className="absolute top-0 left-0 w-full h-full flex">
          <div className="h-full relative w-3/6 bg-red-500">
            <img
              className="h-full min-w-full object-cover object-top"
              src={AudiVolant}
              alt="audi"
            />
          </div>
          <div className="h-full py-20 right-0 w-3/6 flex justify-center items-center ">
            <div className="px-10 border-[1px] text-center flex flex-col justify-center pt-20 pb-40 mx-20 border-gray-50 shadow-xl h-full w-full">
              <h1 className="mb-12 text-3xl font-bold">
                Raudi {car?.nameModel}
              </h1>
              <div className="text-left flex flex-col gap-4">
                <div>
                  <p className="text-sm">Prix conseillé constructeur</p>
                  <p className="text-xl font-bold"> {car.basePrice} € </p>
                </div>
                <div>
                  <p className="text-sm">Loyers mensuels</p>
                  <p className="text-xl font-bold"> {car.basePrice / 12} € </p>
                </div>
                <div className="text-center text-sm py-2 tracking-widest font-semibold rounded-sm">
                  Simulation du loyer bientôt disponible...
                </div>
                <div>
                  <p className="text-sm">Nombre de places</p>
                  <p className="text-xl font-bold"> {car.place} </p>
                </div>
                <div>
                  <p className="text-sm">Nombre de portes</p>
                  <p className="text-xl font-bold"> {car.doors} </p>
                </div>
                {tokken ? (
                  <button
                    onClick={handleAddToCart}
                    className="mt-10 text-center text-sm bg-sky-900 py-2 tracking-widest font-semibold text-white rounded-sm"
                  >
                    Ajouter au Panier
                  </button>
                ) : (
                  <Link
                    to="/sign-in"
                    className="mt-10 text-center text-sm bg-sky-900 py-2 tracking-widest font-semibold text-white rounded-sm"
                  >
                    Se connecter pour configurer les options disponibles
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
