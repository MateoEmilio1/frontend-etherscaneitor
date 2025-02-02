"use client";

import { useState } from "react";
import { Link } from "next"; // Asegúrate de importar el enlace correcto para tu enrutador
import axios from "axios";
import { Card } from "@/components/ui/card"; // Importa el componente Card de Shadcn
import { Button } from "@/components/ui/button"; // Importa el componente Button de Shadcn

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  const changeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    document.querySelector("#inputField").value = "";

    // Redirigir directamente a la ruta /address/[addressHash]
    window.location.href = `/address/${searchInput}`;
  };

  const handleSimulatorClick = () => {
    // Redirigir a la ruta /simulator
    window.location.href = "/simulator";
  };

  return (

    <section className="w-full bg-[rgba(0,255,247,0.378)] bg-[url('https://etherscan.io/images/svg/waves-light.svg')] mb-12 h-60 py-12 px-4 sm:px-6 md:px-8 lg:px-[11.5rem]">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Sección de búsqueda */}
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg sm:text-xl tracking-wide pb-4 text-center sm:text-left">
            The Ethereum Blockchain (Mini) Explorer
          </h3>

          <section className="flex items-center w-full h-12 border border-[#191919] rounded bg-[#111111]">
            <input
              className="w-full h-8 pl-4 sm:pl-8 text-white bg-[#111111] border-none placeholder:text-[#bbbbbb] placeholder:text-sm sm:placeholder:text-base focus:outline-none"
              type="text"
              id="inputField"
              name="inputField"
              maxLength="120"
              placeholder="Search by Address"
              required
              onChange={changeHandler}
            />
            <button
              className="flex justify-center items-center mr-2 w-8 h-8 bg-[#3a82be] rounded border-none outline-none cursor-pointer"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </section>
        </div>

        {/* Tarjeta del simulador de gas */}
        <Card
          className="flex-1 max-w-md bg-[#111111] border-[#191919] cursor-pointer hover:bg-[#1a1a1a] transition-colors relative p-6"
          onClick={handleSimulatorClick}
        >
          {/* Botón "Nuevo" en la esquina superior derecha */}
          <Button
            size="sm"
            className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs"
          >
            Nuevo
          </Button>

          {/* Contenido de la tarjeta */}
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-white text-lg font-semibold mb-2">
              Simulador de gas
            </p>
            <p className="text-sm text-[#bbbbbb]">
              Calcula cuánto gas vas a pagar por una transacción
            </p>
          </div>
        </Card>
      </div>
    </section>

  );
}