import React from "react";
import Navbar from "@/components/PageTop/Navbar";
import TopFiller from "@/components/PageTop/TopFiller";
import Header from "@/components/PageTop/Header";
import Link from "next/link";

export default function Home()
{
  return (
    <div>

      <Header/>
      <TopFiller/>
      <Navbar/>

      <main className="w-full min-h-[calc(100dvh-137px)] flex items-center justify-center p-6">

        <section className="w-full max-w-5xl bg-white rounded-md def-shadow p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold max-md:text-3xl">
              Calcula UAT
            </h1>

            <p className="text-lg mt-4 max-w-3xl mx-auto">
              Plataforma educativa para la práctica estructurada del cálculo mental
              y el análisis descriptivo de las interacciones de aprendizaje.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">

            <div className="p-5 border rounded-md">
              <h2 className="text-xl font-semibold mb-2">
                Contenido configurable
              </h2>

              <p>
                Permite crear y organizar problemas matemáticos por nivel académico,
                categoría, subcategoría y dificultad.
              </p>
            </div>

            <div className="p-5 border rounded-md">
              <h2 className="text-xl font-semibold mb-2">
                Learning analytics
              </h2>

              <p>
                Registra intentos y tiempo de resolución para generar indicadores
                descriptivos sobre la interacción con los ejercicios.
              </p>
            </div>

            <div className="p-5 border rounded-md">
              <h2 className="text-xl font-semibold mb-2">
                Conectividad intermitente
              </h2>

              <p>
                La aplicación móvil utiliza persistencia local de Cloud Firestore
                para apoyar el trabajo cuando la conectividad no está disponible
                de manera continua.
              </p>
            </div>

          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="/login"
              className="px-6 py-3 bg-[rgb(0,66,106)] text-white rounded-md font-medium hover:opacity-90 transition-all"
            >
              Iniciar sesión
            </Link>
          </div>

          <p className="text-sm text-center mt-6 text-gray-600">
            Calcula UAT v2.0.0 · Research software prototype
          </p>

        </section>

      </main>

    </div>
  );
}
