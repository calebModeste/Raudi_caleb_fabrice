import React from "react";
import DisplaysCards from "./DisplaysCards";
import Container from "./Container";

export default function Models() {
  return (
    <div className="text-white w-full p-6  bg-stone-800">
      <p className="mb-10">Modèles</p>
      <div className="  w-full ">
        {/* Affichage des modèles */}
        <Container>
          <DisplaysCards />
        </Container>
      </div>

      <h2 className="text-center mt-20 text-7xl">
        Profitez de 2 mois de loyers offerts*
      </h2>
    </div>
  );
}
