import React from "react";
import type { HeroSectionProps } from "../interface/HeroSectionProps";

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
                className="h-8 w-auto"
              />
              <span className="text-white font-semibold">Reconocedor</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative isolate px-6 pt-32 lg:px-8 flex-1 flex items-center">
        {/* Gradiente superior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem]
                       -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr
                       from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)]
                       sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Reconoce números manuscritos en segundos
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Carga una imagen de un dígito y deja que nuestra red neuronal
            prediga cuál es. 
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onStart}
              className="rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm
                         hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition"
            >
              Analizar imagen
            </button>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white hover:text-indigo-300 transition"
            ></a>
          </div>
        </div>

        {/* Gradiente inferior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl
                     sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
                       sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
