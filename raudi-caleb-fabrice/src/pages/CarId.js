import React from "react";
import AudiVolant from "../assets/audi-volant.jpg";
import { Link, useParams } from "react-router-dom";

export default function CarId() {
  const [car, setCar] = React.useState({});
  const params = useParams();

  const carId = async () => {
    const response = await fetch(
      `http://localhost:5000/raudiApi/cars/${params.id}`
    );
    const data = await response.json();
    console.log(data);
    setCar(data[0]);
  };

  React.useEffect(() => {
    carId();
  }, []);

  return (
    <div className="h-screen w-full flex ">
      <div className="w-full relative h-[100vh] flex-grow ">
        <div className="absolute top-0 left-0 w-full h-full flex">
          <div className="h-full relative  w-3/6 bg-red-500">
            <img
              className="h-full min-w-full object-cover object-top"
              src={AudiVolant}
              alt="audi"
            />
          </div>
          <div className="h-full py-20  right-0 w-3/6 flex justify-center items-center ">
            <div className=" px-10 border-[1px] text-center flex flex-col justify-center pt-20 pb-40 mx-20 border-gray-50 shadow-xl h-full w-full">
              <h1 className="mb-12 text-3xl font-bold">
                {" "}
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
                <div className="text-center text-sm  py-2 tracking-widest font-semibold  rounded-sm">
                  Simulation du loyer bientot disponible...
                </div>
                <div>
                  <p className="text-sm">Nombre de places</p>
                  <p className="text-xl font-bold"> {car.place} </p>
                </div>
                <div>
                  <p className="text-sm">Nombre de portes</p>
                  <p className="text-xl font-bold"> {car.doors} </p>
                </div>
                <Link className=" mt-10 text-center text-sm bg-sky-900 py-2 tracking-widest font-semibold text-white rounded-sm">
                  Se connecter pour configurer les options disponibles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
