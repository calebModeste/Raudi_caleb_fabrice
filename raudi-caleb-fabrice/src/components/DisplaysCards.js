import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DisplaysCards() {
  const [cars, setCars] = React.useState([]);

  const getCars = async () => {
    console.log("fonction");

    const response = await fetch("http://localhost:5000/raudiApi/cars");
    const data = await response.json();
    console.log(data);

    setCars(data.slice(0, 4));
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className=" flex items-center justify-center h-56 bg-neutral-500">
      {cars.map((car) => (
        <div
          key={car.id}
          className="w-2/3 h-full flex flex-col items-center justify-center"
        >
          <Link to={`/cars/${car.id}`} key={car.id}>
            <div className="w-full h-2/3 flex flex-col items-center justify-center ">
              <img
                className="w-full h-full object-cover"
                src={car.picture}
                alt={car.nameModel}
              />
            </div>
            <div className="w-full h-1/3 flex flex-col items-center justify-center">
              <h2 className="text-white text-2xl font-bold">{car.nameModel}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
